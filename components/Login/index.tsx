import React, { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { useOnClickOutside } from "@/hooks/index";
import { AnimatePresence } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import { gql } from "@apollo/client";
import { useLoginMutation } from "@/graphql/generated/graphql";
import { useSession, getSession } from "next-auth/react"

type Props = {
  setLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Login: FC<Props> = ({ setLoginPopup }) => {
  const cardRef = React.useRef(null);
  const [login, setLogin] = React.useState(true);
  const [register, setRegister] = React.useState(false);
  const [atlastrip, setAtlastrip] = React.useState(false);
  const [loginToggle, setLoginToggle] = React.useState(false);
  const [email, setEmail] = React.useState("walidmoultamis@gmail.com");
  const [password, setPassword] = React.useState("123");

  const [loginMutation, { data, loading, error }] = useLoginMutation();

  const handleLoginGraph = () => {
    loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };


  useEffect(() => {
    if (data?.login) {
      setLoginPopup(false);
      console.log(data.login);
      localStorage.setItem("user", JSON.stringify(data.login));
      localStorage.setItem("token", data.login.token);
    }
  }, [data]);

  useOnClickOutside(cardRef, () => {
    setLoginPopup(false);
  });

  return (
    <div className="fixed z-[10000] top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-25">
      <motion.div
        initial={{ opacity: 0, y: -400 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: -400 }}
        className="w-full relative max-w-sm bg-white rounded-lg shadow-lg overflow-hidden"
        ref={cardRef}
      >
        <AnimatePresence>
          {atlastrip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute flex justify-center items-center top-0 left-0 rounded-md w-full h-full bg-green-900 bg-opacity-80 z-10"
            >
              <CircularProgress
                sx={{
                  color: "white",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="rounded-xl bg-white shadow-xl ">
          <div className="p-6 sm:p-16">
            {!loginToggle ? (
              <div className="space-y-4">
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                  Sign in to unlock the best of : <br />
                  <span className="font-extrabold"> Atlastrip Ads Maker.</span>
                </h2>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <h2 className="mb-8 text-2xl text-center text-cyan-900 font-bold">Login</h2>
              </div>
            )}
            <div className="mt-16 grid space-y-4">
              {!loginToggle && (
                <>
                  <button
                    onClick={() => {
                      setAtlastrip(true);
                    }}
                    className="group h-12 px-6 border-2 border-solid border-gray-300 rounded-full transition duration-300 
                                     hover:border-green-400 focus:bg-blue-50 active:bg-blue-100"
                  >
                    <div className="relative flex items-center space-x-4 justify-center">
                      <img
                        src="https://atlastripv2.vercel.app/_next/image?url=%2Fog.png&w=48&q=75"
                        className="rounded-full absolute left-0 w-5"
                        alt="Facebook logo"
                      />
                      <span className="block w-max pl-3 font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-green-600 sm:text-base">
                        Continue with Atlastrip
                      </span>
                    </div>
                  </button>
                  <button
                    className="group h-12 px-6 border-2 border-solid border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                  >
                    <div className="relative flex items-center space-x-4 justify-center">
                      <img
                        src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                        className="absolute left-0 w-5"
                        alt="google logo"
                      />
                      <span className="block w-max pl-3 font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Continue with Google
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setLoginToggle(true);
                    }}
                    className="group h-12 px-6 border-2 border-solid border-gray-300 rounded-full transition duration-300 
                hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                  >
                    <div className="relative flex items-center space-x-4 justify-center">
                      <span className="absolute font-black left-0 w-5">AD</span>
                      <span className="block w-max pl-3 font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Continue with AdsMaker
                      </span>
                    </div>
                  </button>
                </>
              )}
              {loginToggle && (
                <>
                  <div className="flex items-center border-2 border-solid border-gray-300  py-2 px-3 rounded-2xl mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none"
                      type="text"
                      name=""
                      id=""
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex items-center border-2 border-solid border-gray-300 py-2 px-3 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none"
                      type="text"
                      name=""
                      id=""
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleLoginGraph}
                    className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                  >
                    Login
                  </button>
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                    Forgot Password ?
                  </span>
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                    Create Account
                  </span>
                </>
              )}
            </div>

            <div className=" space-y-4 text-gray-600 text-center sm:-mb-8">
              <p className="text-xs">
                By proceeding, you agree to our{" "}
                <a href="#" className="underline">
                  Terms of Use
                </a>{" "}
                and confirm you have read our{" "}
                <a href="#" className="underline">
                  Privacy and Cookie Statement
                </a>
                .
              </p>
              <p className="text-xs">
                This site is protected by reCAPTCHA and the{" "}
                <a href="#" className="underline">
                  Google Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
