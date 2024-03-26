"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from '../axios'


export default function ViewAll() {
  const router = useRouter();

  const [questions, setQuestions] = useState({});
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
  
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(
            "questions",
          );
          setQuestions(response.data ?? {});
          setIsloading(false);
        } catch (error) {
          setIsloading(false);
        }
      };

      fetchData();
  }, []);

  const handleEdit = (questionId) => {
    localStorage.setItem(questionId, JSON.stringify(questions[questionId]));
    router.push(`/dashboard/edit/${questionId}`)
  }

  return (
    <>
      <header className="bg-white  text-gray-700 body-font border-b border-gray-200">
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
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">Question Time</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>
          <button
            onClick={() => {
              router.push("/dashboard/create");
            }}
            className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
          >
            Create question
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
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Questions
            </h1>

            {isLoading ? (
              <p>Loading...</p>
            ) : Object.keys(questions).length === 0 ? (
              <p>No questions available</p>
            ) : (
              <div>
                {Object.entries(questions).map(([questionId, questionData]) => (
                  <div key={questionId} className="mb-8">
                    <h2 className="text-xl font-semibold">
                      {questionData.question}
                    </h2>
                    <ul className="mt-2">
                      {questionData.options.map((option, index) => (
                        <li
                          key={index}
                          className="m-4 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-around">
                      <button
                        type="button"
                        className="w-full sm:w-auto py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white dark:disabled:text-indigo-400 text-sm font-semibold rounded-md shadow focus:outline-none cursor-pointer"
                        tabindex="-1"
                        onClick={() => handleEdit(questionId)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="w-full sm:w-auto py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white dark:disabled:text-indigo-400 text-sm font-semibold rounded-md shadow focus:outline-none cursor-progress"
                        tabindex="-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
