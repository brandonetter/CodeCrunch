import fs from "fs";
import { glob } from "glob";
import config from "./tailwind.config.js";
function updateProgress(current, total, text = "files") {
  const progressBarLength = 40; // Length of the progress bar in characters
  const progress = (current / total) * progressBarLength;

  if (progress === 0) return;
  try {
    const progressBar = `[${"=".repeat(Math.floor(progress))}${" ".repeat(
      progressBarLength - progress
    )}]`;
    process.stdout.clearLine(0); // Clear current text
    process.stdout.cursorTo(0); // Move cursor to start of line
    process.stdout.write(
      `Processing: ${progressBar} ${current}/${total} ${text} \r`
    );
    if (current === total) {
      process.stdout.write("\n"); // New line at the end
    }
  } catch (e) {
    console.log(Math.floor(progress), current, total, e);
  }
}
// Function to generate all subsets of a set of classes
function generateSubsets(classesArray) {
  let subsets = [];
  for (let i = 0; i < 1 << classesArray.length; i++) {
    let subset = [];
    for (let j = 0; j < classesArray.length; j++) {
      if (i & (1 << j)) {
        subset.push(classesArray[j]);
      }
    }
    if (subset.length > 1) {
      subsets.push(subset.sort().join(" "));
    }
  }
  return subsets;
}

// Extract, normalize, and generate subsets of class names
function extractNormalizeAndGenerateSubsets(content) {
  const regex = /\bclass(Name)?=["']([^'"]+)["']/g;
  let match;
  const classCombinations = new Map();

  while ((match = regex.exec(content)) !== null) {
    const classesArray = match[2].split(/\s+/).sort();
    const subsets = generateSubsets(classesArray);

    subsets.forEach((subset) => {
      if (classCombinations.has(subset)) {
        classCombinations.set(subset, classCombinations.get(subset) + 1);
      } else {
        classCombinations.set(subset, 1);
      }
    });
  }

  return classCombinations;
}

// Function to filter out subsets if a more comprehensive combination with the same frequency exists
function filterSubsets(globalClassCombinations) {
  const filteredCombinations = new Map();

  // Convert map to array for easier manipulation
  const combinationsArray = Array.from(globalClassCombinations.entries());

  // Sort combinations by their size (number of classes in the combination) descending
  combinationsArray.sort(
    (a, b) => b[0].split(" ").length - a[0].split(" ").length
  );
  let cominbationsCount = combinationsArray.length;

  combinationsArray.forEach(([combination, count]) => {
    let isSupersetPresent = combinationsArray.some(
      ([superCombination, superCount]) => {
        return (
          superCombination.includes(combination) &&
          superCombination !== combination &&
          superCount === count
        );
      }
    );
    if (!isSupersetPresent) {
      filteredCombinations.set(combination, count);
    }
    cominbationsCount++;
    updateProgress(
      cominbationsCount,
      combinationsArray.length * 2,
      "Subsets filtered"
    );
  });

  return filteredCombinations;
}

// Compile class usage across files, considering partial class combinations and filtering subsets
async function compileClassUsage() {
  const paths = config.content;
  const globalClassCombinations = new Map();
  let processedFiles = 0;

  let filesToProcess = [];
  paths.forEach((pattern) => {
    filesToProcess = filesToProcess.concat(glob.sync(pattern));
  });
  const totalFiles = filesToProcess.length;
  console.log(`Processing ${totalFiles} files`);

  paths.forEach((pattern) => {
    glob.sync(pattern).forEach((file) => {
      const content = fs.readFileSync(file, "utf8");
      const fileClassCombinations = extractNormalizeAndGenerateSubsets(content);

      fileClassCombinations.forEach((count, combination) => {
        if (globalClassCombinations.has(combination)) {
          globalClassCombinations.set(
            combination,
            globalClassCombinations.get(combination) + count
          );
        } else {
          globalClassCombinations.set(combination, count);
        }
      });
      processedFiles++;
      updateProgress(processedFiles, totalFiles);
    });
  });

  // Filter out subsets where a more comprehensive combination with the same frequency exists
  const filteredCombinations = filterSubsets(globalClassCombinations);

  console.log(
    [...filteredCombinations.entries()].filter(
      ([a, b]) => b > 2 || (a.length > 90 && b > 1)
    )
  );
  // Further logic for identifying candidates for utility classes and replacing in source files would follow
}

compileClassUsage();
