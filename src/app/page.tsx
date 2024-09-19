// src/app/page.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import Loading from "./components/Loading/Loading";

const HomePage = () => {
  const [articleResponse, setArticleResponse] = useState("");
  const [postResponse, setPostResponse] = useState("");
  const [pdfResponse, setPdfResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleArticleScraper = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/scrape-article");
      setArticleResponse(response.data);
    } catch (error) {
      console.error("Error scraping article:", error);
      setArticleResponse("Error scraping article");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostGenerator = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/generate-post", {
        content: "Some content",
      });
      setPostResponse(response.data);
    } catch (error) {
      console.error("Error generating post:", error);
      setPostResponse("Error generating post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePdf = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/generate-pdf");
      setPdfResponse(response.data);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfResponse("Error generating PDF");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoading = () => {
    setIsLoading((prevIsLoading) => !prevIsLoading);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">LinkedIn Content Generator</h1>

      {/* Article Scraper */}
      <div className="flex items-center mb-4">
        <button
          onClick={handleArticleScraper}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Scrape Article
        </button>
        {isLoading && <Loading />}
      </div>
      <p>{articleResponse}</p>

      {/* Post Generator */}
      <div className="flex items-center mb-4">
        <button
          onClick={handlePostGenerator}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Generate Post
        </button>
        {isLoading && <Loading />}
      </div>
      <p>{postResponse}</p>

      {/* PDF Generator */}
      <div className="flex items-center mb-4">
        <button
          onClick={handleGeneratePdf}
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          Generate PDF
        </button>
        {isLoading && <Loading />}
      </div>
      <p>{pdfResponse}</p>
      {/* PDF Generator */}
      <div className="flex items-center mb-4">
        <button
          onClick={handleLoading}
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          Set Loading State
        </button>
        {isLoading && <Loading />}
      </div>
      <p>{pdfResponse}</p>
    </div>
  );
};

export default HomePage;
