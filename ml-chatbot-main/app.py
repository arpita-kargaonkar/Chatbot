import os
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import List
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"]
)

class QueryRequest(BaseModel):
    file_name: str
    question: str
    conversation_history: str

def get_pdf_text(pdf_docs: List[UploadFile]):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf.file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=800)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks, pdf_name):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local(f"faiss_index_{pdf_name}")

def get_conversational_chain():
    prompt_template = """
    You are a chatbot and you have to answer the question as detailed as possible from the provided context and session chat history, make sure to provide all the details. If the answer is not in the provided context, try to give the closest answer. \n\n
    Chat History: \n {chat-history} \n
    Context:\n {context}\n
    Question: \n{question}\n
    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question","chat-history"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain
@app.post("/upload_pdf/")
async def upload_pdf(pdf_file: UploadFile = File(...)):
    index_path = f"faiss_index_{pdf_file.filename}"
    if not os.path.exists(index_path):
        raw_text = get_pdf_text([pdf_file])
        text_chunks = get_text_chunks(raw_text)
        get_vector_store(text_chunks, pdf_file.filename)
    return {"message": "PDF file processed and embeddings stored."}

@app.post("/query_pdf/")
async def query_pdf(query_request: QueryRequest):
    print(query_request)
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local(f"faiss_index_{query_request.file_name}", embeddings,allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(query_request.question, k=10)
    chain = get_conversational_chain()
    response = chain(
        {"input_documents": docs, "question": query_request.question, "chat-history" : query_request.conversation_history},
        return_only_outputs=True
    )
    print(response["output_text"])
    return {"answer": response["output_text"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)






