"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../../../axios";

export default function CreateQuestion({ params }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedQuestion = localStorage.getItem(params?.id);

    if (storedQuestion) {
      try {
        const { question, options } = JSON.parse(storedQuestion);

        setQuestion(question);
        setOptions(options);
      } catch (error) {
        console.error("Error parsing stored question:", error);
        // Handle parsing error (optional)
      }
    } else {
      router.push("/dashboard");
    }
  }, []);
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

    const validOptions = options.filter((option) => option.trim() !== "");
    if (validOptions.length < 3) {
      alert("Please enter at least three options.");
      return;
    }
    setIsloading(true);
    try {
      await axiosInstance.put(`questions/${params?.id}`, {
        question,
        options: validOptions,
      });
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
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Edit Question
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
                  onChange={(e) => handleOptionChange(index, e.target.value)}
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 mr-4"
          >
            Add Option
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
          >
            {isLoading ? "loading..." : " Update Question"}
          </button>
        </div>
      </div>
    </>
  );
}
