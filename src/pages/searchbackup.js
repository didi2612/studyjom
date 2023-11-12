import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import db from "./firebase";
import ShootingStars from "../stars/shooting";
import LOGO from "./images/azp.png";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchTerm(query);
      setCurrentPage(1);
      fetchSearchResults(query, 1);
    }
  }, [location]);

  const fetchSearchResults = async (searchTerm, page) => {
    const itemsPerPage = 5;
    const db = getFirestore();
    const q = query(
      collection(db, "jom"),
      where("author", ">=", searchTerm.toLowerCase()),
      where("author", "<=", searchTerm.toLowerCase() + "\uf8ff")
    );

    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(q);

      const totalResults = querySnapshot.docs.length;
      const totalPages = Math.ceil(totalResults / itemsPerPage);
      setTotalPages(totalPages);

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const results = querySnapshot.docs
        .slice(startIndex, endIndex)
        .map((doc) => doc.data());

      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching data from Firestore: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchSearchResults(searchTerm, newPage);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative">
      <div className="-z-30">
        <ShootingStars />
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-3xl relative z-10">
        <form onSubmit={handleSearch} className="mb-4">
          <label className="block text-sm font-medium text-gray-500">
            <Helmet>
              <title>Search Results - Study Jom</title>
              <meta
                name="description"
                content={`Search results for: ${searchTerm}`}
              />
              {/* Add other metadata here */}
              <link rel="icon" type="image/ico" href={LOGO} />
            </Helmet>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </label>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md z-10"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleBackToHome}
            className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded-md z-10"
          >
            Back to Home
          </button>
        </form>
        <h2 className="text-2xl font-bold mb-4">
          Search results for: {searchTerm}
        </h2>
        {isLoading && <p>Loading...</p>}
        {!isLoading && searchResults.length > 0 && (
          <ul>
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="border-b border-gray-700 py-4 flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div>
                  {result.url ? (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {result.title.toUpperCase()}
                    </a>
                  ) : (
                    <span className="text-white">
                      {result.title.toUpperCase()}
                    </span>
                  )}
                  <div className="text-zinc-100">
                    {result.text.toUpperCase()}
                  </div>
                </div>

                <div className="flex items-start md:items-center md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
                  <span className="text-gray-500"> | </span>
                  <div className="text-white text-xs">
                    {result.author.toUpperCase()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!isLoading && searchResults.length === 0 && (
          <p className="text-lg text-gray-500 mt-4">
            No results found. Please try a different search term.
          </p>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-l-md disabled:opacity-50"
            >
              <FaArrowAltCircleLeft className="mr-2" />
              Prev
            </button>
            <span className="mx-4 text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md disabled:opacity-50"
            >
              Next
              <FaArrowAltCircleRight className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
