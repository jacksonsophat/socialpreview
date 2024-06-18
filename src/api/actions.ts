"use server";

import * as ogScraper from "open-graph-scraper";

export async function getURLInfomation(url: string) {
  try {
    const options = { url }; // Destructuring assignment for cleaner syntax

    const data = await ogScraper(options); // Use await for asynchronous operation

    // Check for errors if present
    if (data.error) {
      error("Error fetching data:", data.error);
      return { success: false, error: data.error }; // Return an object indicating error
    }

    const { html, result, response } = data; // Destructuring for concise access
    console.log("result", result);

    // Process or return the desired data from 'result'
    return result; // Assuming 'result' contains the desired information
  } catch (err) {
    error("Unexpected error:", err);
    return { success: false, error: err.message }; // Handle unexpected errors
  }
}
