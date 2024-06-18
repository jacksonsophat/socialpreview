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

// export async function getURLInfomation(url: string) {
//   const ogs = require("open-graph-scraper");
//   const options = { url: url };

//   ogs(options).then((data) => {
//     const { error, html, result, response } = data;
//     // console.log("error:", error); // This returns true or false. True if there was an error. The error itself is inside the result object.
//     // // console.log("html:", html); // This contains the HTML of page
//     // console.log("result:", result); // This contains all of the Open Graph results
//     // console.log("response:", response); // This contains response from the Fetch API
//   });
//   console.log("options", options);
//   //   return;
//   console.log("data", data);
//   return { success: true };
// }
