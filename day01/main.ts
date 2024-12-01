// Import the necessary module from Deno's standard library
import { parse } from "https://deno.land/std@0.115.1/encoding/csv.ts";

async function readCsvFile(filePath: string) {
  // Read the CSV file as a text string
  const csvContent = await Deno.readTextFile(filePath);

  // Parse the CSV content
  const records = await parse(csvContent, {
    skipFirstRow: false, // Skip the header row if your CSV has headers
  });

  return records;
}

// Call the function with your CSV file path
let input = readCsvFile("sample.csv");

input.then((data) => {
  console.log(data);
});



