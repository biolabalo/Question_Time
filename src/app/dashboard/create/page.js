"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from '../../axios'


export default function CreateQuestion() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 3) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async () => {

    if (!question) {
      alert("Please enter a question.");
      return;
    }
  
    const validOptions = options.filter(option => option.trim() !== "");
    if (validOptions.length < 3) {
      alert("Please enter at least three options.");
      return;
    }
    setIsloading(true);
    try {
       await axiosInstance.post(
        "questions",
        {
          question,
          options: validOptions,
        },
      );
      setIsloading(false);
      // Redirect to the questions page after successfully creating the question
      router.push("/dashboard");
    } catch (error) {
      setIsloading(false);
      console.error("Error creating question:", error);
      // Handle error as needed
    }
  };

  return (
    <>
      <header className="bg-white text-gray-700 body-font border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="https://tailblocks.cc"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10' 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">Question Time</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>
          <button
            onClick={() => {
              router.push("/dashboard");
            }}
            className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
          >
            View Questions
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </header>
      <section className="text-gray-700 body-font bg-white h-full">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Create Question
            </h1>

            <div className="text-gray-700 body-font bg-white h-full">
              <label className="block mb-2">
                Question:
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-1 w-full mt-1"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </label>
              <div className="mb-4">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 my-4">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md px-3 py-1 w-full"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
              >
                Add Option
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                 {isLoading ? 'loading...' : ' Create Question'}
               
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
