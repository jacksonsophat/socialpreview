"use server";
// import type { OpenGraphScraperResult } from "@types/open-graph-scraper";
import * as ogScraper from "open-graph-scraper";
import { any } from "zod";

export async function getURLInfomation(url: string) {
  try {
    const options = { url }; // Destructuring assignment for cleaner syntax

    //@ts-ignore
    const data = await ogScraper(options); // Use await for asynchronous operation

    // Check for errors if present
    if (data.error) {
      //@ts-ignore
      error("Error fetching data:", data.error);
      return { success: false, error: data.error }; // Return an object indicating error
    }

    const { html, result, response } = data; // Destructuring for concise access
    // console.log("result", result);

    // Process or return the desired data from 'result'
    return result; // Assuming 'result' contains the desired information
  } catch (err) {
    //@ts-ignore
    error("Unexpected error:", err);
    //@ts-ignore
    return { success: false, error: err.message }; // Handle unexpected errors
  }
}
