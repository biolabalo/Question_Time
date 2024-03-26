"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenExists = localStorage.getItem("questionTime");
      if (!tokenExists) {
        router.push("/");
      }
    }
  }, []);

  return (
    <>
      <header className="bg-white  text-gray-700 body-font border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="/dashboard"
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
              if (pathname === "/dashboard") {
                return router.push("/dashboard/create");
              } else {
                return router.push("/dashboard");
              }
            }}
            className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
          >
            {pathname === "/dashboard"
              ? "Create"
              :"View"}{" "}
            question
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
        <div className="container mx-auto flex p-16 md:flex-row flex-col items-center">
          {children}
        </div>
      </section>
    </>
  );
}
