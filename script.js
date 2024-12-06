// List of SVG files to load
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

// Load all SVGs into the container but hide them initially
const loadedSVGs = [];
svgFiles.forEach((file, index) => {
  d3.xml(file)
    .then((data) => {
      const importedNode = document.importNode(data.documentElement, true);

      // Append the SVG with an ID corresponding to its index
      const svgElement = svgContainer
        .append("div")
        .attr("class", "svg-layer")
        .attr("id", `svg-${index}`) // ID for controlling visibility
        .style("display", index === 0 ? "block" : "none") // Show only 0.svg by default
        .node();

      svgElement.appendChild(importedNode);
      loadedSVGs.push(svgElement);
    })
    .catch((error) => {
      console.error(`Error loading the SVG file ${file}:`, error);
    });
});

// Function to control SVG visibility based on the first number of the first result
function updateSVGVisibility(firstNumber) {
  const remainder = firstNumber % 7;

  // Hide all SVGs except 0.svg and the calculated one
  loadedSVGs.forEach((svg, index) => {
    if (index === 0 || index === remainder) {
      svg.style.display = "block";
    } else {
      svg.style.display = "none";
    }
  });
}

// Export the updateSVGVisibility function for use in calculator.js
export { updateSVGVisibility };
