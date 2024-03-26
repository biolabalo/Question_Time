"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../axios";

export default function ViewAll() {
  const router = useRouter();

  const [questions, setQuestions] = useState({});
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("questions");
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
    router.push(`/dashboard/edit/${questionId}`);
  };

  return (
    <>
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
                    tabIndex="-1"
                    onClick={() => handleEdit(questionId)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="w-full sm:w-auto py-2 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 text-white dark:disabled:text-indigo-400 text-sm font-semibold rounded-md shadow focus:outline-none cursor-progress"
                    tabIndex="-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
