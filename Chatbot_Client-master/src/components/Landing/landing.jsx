import Img1 from "../../assets/2106.i201.007.F.m004.c9.call center technical support isometric.jpg";
import { Link, useNavigate } from "react-router-dom";
import Typewriter from "../../utils/typewriter";
const Landing = () => {
  const navigate = useNavigate();

  const handleSigninClick = () => {
    navigate('/signin')
    // console.log("clicked");
  }
  const handleAdminSigninClick = () => {
    navigate('/adminsignin')
    // console.log("clicked");
  }
  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:items-start mx-6 md:mx-12 mt-16 md:mt-20">
        <div className="md:w-1/2 flex flex-col items-center md:items-start md:pl-16 min-w-1/2">
          <div className="text-3xl font-semibold mt-10 text-center md:text-left leading-snug text-gray-700 mb-6 md:text-4xl md:leading-normal">
            Your{" "}
            <span className="text-[#2930ff] text-4xl font-bold">
              Chatbot
            </span>
            <br /> is Ready
          </div>
          <div className="h-24 text-center md:text-left text-gray-400 md:pr-28">
            <Typewriter
              strings={[
                "Meet your personal OAM assistant here to answer all your OAM queries instantly!",
              ]}
              colors={["black"]}
              typeSpeed={50}
              startDelay={10}
              backSpeed={30}
              backDelay={1000}
              color={"#374151"}
            />
          </div>
          <div className="hidden md:flex flex-col mt-12 space-y-4">
            <button className="text-xl text-gray-700 font-semibold rounded-2xl border-2 px-5 py-2 border-gray-400 hover:border-gray-800 flex items-center" onClick={handleSigninClick}>
              <img
                src="https://img.icons8.com/material-outlined/24/null/import.png"
                alt="Sign In"
                className="mr-2"
              />
              Sign In Now
            </button>
            <button className="text-xl text-gray-700 font-semibold rounded-2xl border-2 px-5 py-2 border-gray-400 hover:border-gray-800 flex items-center" onClick={handleAdminSigninClick}>
              <img
                src="https://img.icons8.com/material-outlined/24/null/import.png"
                alt="Sign In as Admin"
                className="mr-2"
              />
              Sign In As Admin
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-10 md:mt-0">
          <img
            src={Img1}
            alt="Health Vault"
            className="w-full max-w-sm md:max-w-md"
          />
          <div className="flex flex-col mt-12 space-y-4 md:hidden">
              <button className="text-xl text-gray-700 font-semibold rounded-2xl border-2 px-7 py-2 border-gray-400 hover:border-gray-800 flex items-center gap-2" onClick={handleSigninClick}>
                <img
                  src="https://img.icons8.com/material-outlined/24/null/import.png"
                  alt="Sign In"
                />
                Sign In Now
              </button>
            <Link to="/adminsignin">
              <button className="text-xl text-gray-700 font-semibold rounded-2xl border-2 px-7 py-2 border-gray-400 hover:border-gray-800 flex items-center gap-2">
                <img
                  src="https://img.icons8.com/material-outlined/24/null/import.png"
                  alt="Sign In as Admin"
                />
                Sign In As Admin
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
