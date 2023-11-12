import React, { useState, useEffect } from "react";

function Form() {
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <section className="relative w-screen h-screen bg-black overflow-x-hidden">
      <div className="flex flex-col justify-center items-center h-full text-center">
        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col items-center gap-y-6"
        >
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="sm:col-span-4 flex-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 dark:text-slate-100 text-zinc-900"
              ></label>
              <div className="mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 dark:text-slate-100 text-zinc-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Search Anything..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-3 items-center justify-center md:justify-start w-full">
            <button
              disabled={isLoading}
              className={`rounded-md ${
                isLoading
                  ? "bg-cyan-900 cursor-not-allowed hover:bg-cyan-900 dark:hover:bg-cyan-900"
                  : "dark:bg-cyan-500 bg-cyan-600"
              } px-6 py-2.5 text-sm font-semibold text-slate-200 shadow-sm hover:bg-cyan-700 dark:hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 dark:focus-visible:outline-cyan-300`}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Form;
