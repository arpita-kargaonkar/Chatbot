import axios from "axios";
export const aiResponse = async (question, contextArr) => {
  let newContext = "";
  contextArr.map(async (context, ind) => {
    const response = await axios.post(`${process.env.ML_SERVER_URL}qna/`, {
      question: question,
      context: context,
    });
    newContext += response.data.output;
  });
  console.log("newContext => " + newContext);
  const answer = await axios.post(`${process.env.ML_SERVER_URL}qna/`, {
    question: question,
    context: newContext,
  });
  return answer;
};
