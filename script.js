// List of SVG files
const svgFiles = [
  "assets/0.svg", // Always shown
  "assets/1.svg",
  "assets/2.svg",
  "assets/3.svg",
  "assets/4.svg",
  "assets/5.svg",
  "assets/6.svg",
  "assets/7.svg"
];

// Select the container
const svgContainer = d3.select("#svg-container");

// Helper to clear the container
function clearContainer() {
  svgContainer.selectAll("*").remove();
}

// Function to load and display the chosen SVG files
function loadSVGs(firstNumber) {
  // Clear the container
  clearContainer();

  let remainder = firstNumber % 7;

  // If remainder is 0, use the first number directly
  if (remainder === 0) {
    console.log("Remainder is 0, using the first number directly.");
    remainder = firstNumber;
  }

  console.log(`First number of the first result: ${firstNumber}`);
  console.log(`Calculated remainder (or fallback): ${remainder}`);

  // Always load 0.svg
  d3.xml(svgFiles[0])
    .then((data) => {
      const importedNode = document.importNode(data.documentElement, true);
      const svgWrapper = document.createElement("div");
      svgWrapper.classList.add("svg-layer");
      svgWrapper.appendChild(importedNode);
      svgContainer.node().appendChild(svgWrapper);
      console.log(`SVG loaded: ${svgFiles[0]}`);
    })
    .catch((error) => console.error(`Error loading ${svgFiles[0]}:`, error));

  // Load the SVG corresponding to the remainder
  d3.xml(svgFiles[remainder])
    .then((data) => {
      const importedNode = document.importNode(data.documentElement, true);
      const svgWrapper = document.createElement("div");
      svgWrapper.classList.add("svg-layer");
      svgWrapper.appendChild(importedNode);
      svgContainer.node().appendChild(svgWrapper);
      console.log(`SVG loaded: ${svgFiles[remainder]}`);
    })
    .catch((error) => console.error(`Error loading ${svgFiles[remainder]}:`, error));
}

// Export the function for use in other modules
export { loadSVGs };
