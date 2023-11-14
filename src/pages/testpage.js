// Home.js
import React, { useState } from "react";
import LOGO from "./images/azp.png";
import { AiOutlineSearch } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import ShootingStars from "../stars/shooting";
import db from "./firebase";

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Navigate to the search results page with the search term as a query parameter
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <section className="relative w-screen h-screen bg-black overflow-x-hidden">
      <Helmet>
        <title>Study Jom Enhanced</title>
        <meta
          name="description"
          content={`Search results for: ${searchTerm}`}
        />
        {/* Add other metadata here */}
        <link rel="icon" type="image/ico" href={LOGO} />
      </Helmet>
      <div className="z-0 absolute top-0 left-0">
        <ShootingStars />
      </div>
      {/* Content */}
      <div className="z-10 relative flex items-center justify-center h-full">
        <div className="text-center">
          <img
            width={100}
            height={100}
            className="object-contain mx-auto"
            src={LOGO}
            alt="Study Jom"
          />
          <h1 className="mt-10 text-3xl font-bold tracking-tight text-zinc-800 dark:text-slate-200 sm:text-4xl">
            STUDY JOM ENHANCED
          </h1>
          <p className="mt-3 text-sm leading-8 text-zinc-900 dark:text-slate-200">
            The purpose of this project is to give lectures and students a forum
            to share study materials
            <br /> amongst themselves across sections.
          </p>
          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col items-center gap-y-6 relative z-10 mx-auto max-w-md"
          >
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <div className="sm:col-span-4 flex-1">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium leading-6 dark:text-slate-100 text-zinc-900"
                ></label>
                <div className="mt-0 flex items-center justify-center">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-full w-1/2">
                    <span className="flex items-center px-3">
                      <AiOutlineSearch color="#fff" />
                    </span>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="block flex-1 border-0 bg-transparent py-2 pl-5 pr-20 dark:text-slate-100 text-zinc-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Jom study ?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 items-center justify-center md:justify-start w-full"></div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Home;
