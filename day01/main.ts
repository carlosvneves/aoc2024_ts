// Import the necessary module from Deno's standard library
import { parse } from "https://deno.land/std@0.115.1/encoding/csv.ts";

async function readCsvFile(filePath: string) {
  // Read the CSV file as a text string
  const csvContent = await Deno.readTextFile(filePath);

  // Parse the CSV content
  const records = await parse(csvContent, {
    skipFirstRow: false, // Skip the header row if your CSV has headers
  });

  const arr: Array<number[]> = [];
  
  records.forEach((record) => {
    
    let line: number[] = [];

    record[0] = record[0].replace(/\s+/g, ",").split(",");
    
    line = record[0].map((num:string) => Number(num));
        
    arr.push(line);
    
  });

  let arr_left: number[] = [];
  for(let i = 0; i < arr.length; i++){
    arr_left.push(arr[i][0]);
  }

  let arr_right: number[] = [];
  for(let i = 0; i < arr.length; i++){
    arr_right.push(arr[i][1]);
  }

  arr_left = arr_left.sort()
  arr_right = arr_right.sort()
    
  return [arr_left, arr_right];
}

function calculateDistance(arr_left: number[], arr_right: number[]): Array<number> {
  
  let distances: Array<number> = [];
  
  for(let i = 0; i < arr_left.length; i++){
    distances.push(Math.abs(arr_left[i] - arr_right[i]));
  }

  return distances;
}

function calculateTotalDistance(distances: Array<number>): number {
  let totalDistance = 0;
  
  distances.forEach((distance) => {
    totalDistance += distance;
  });
  
  return totalDistance;
}

console.log("=== AOC 2024 - Day 01 ===");
// read csv
const input = await readCsvFile("data.csv");

// calculate total distance
console.log("=== Total Distance ===");
console.log(calculateTotalDistance(calculateDistance(input[0], input[1])));