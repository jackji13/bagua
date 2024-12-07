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

// Patterns folder path
const patternsPath = "assets/patterns/";

// Select the container
const svgContainer = d3.select("#svg-container");

// Helper to clear the container
function clearContainer() {
  svgContainer.selectAll("*").remove();
}

// Function to load and display the chosen SVG files
function loadSVGs(firstNumber, secondNumber, input2, rgb, gua) {
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
  console.log(`Second number of the first result: ${secondNumber}`);
  console.log(`Input 2: ${input2}`);

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

  // Load the SVG corresponding to the remainder and modify it
  d3.xml(svgFiles[remainder])
    .then((data) => {
      const importedNode = document.importNode(data.documentElement, true);
      const svgWrapper = document.createElement("div");
      svgWrapper.classList.add("svg-layer");
      svgWrapper.appendChild(importedNode);
      svgContainer.node().appendChild(svgWrapper);
      console.log(`SVG loaded: ${svgFiles[remainder]}`);

      // Modify the <circle> elements and apply color to the new SVGs
      modifySVG(svgWrapper, secondNumber, input2, firstNumber, rgb, gua);
    })
    .catch((error) => console.error(`Error loading ${svgFiles[remainder]}:`, error));
}

function modifySVG(wrapper, count, input2, result1Number, rgb, gua) {
  const [r, g, b] = rgb || [0, 0, 0]; // Default to black if RGB is undefined
  const rgbString = `rgb(${r}, ${g}, ${b})`;

  console.log(`Applying color filter: ${rgbString} for Result 1 Number: ${result1Number}`);

  // Select all <circle> elements in the SVG
  const svg = d3.select(wrapper).select("svg");
  const circles = svg.selectAll("circle");
  const totalCircles = circles.size();

  console.log(`Total <circle> elements found: ${totalCircles}`);

  if (count >= totalCircles) {
    console.warn(`Count (${count}) exceeds or matches total circles. No circles hidden.`);
    return;
  }

  // Shuffle the <circle> selection and choose the specified number to keep
  const selectedIndices = d3.shuffle(d3.range(totalCircles)).slice(0, count);

  console.log(`Selected indices: ${selectedIndices}`);

  // Load the pattern SVG based on input2
  let patternIndex = input2 <= 8 ? input2 : input2 % 8 || 8;
  let patternFile = `${patternsPath}${patternIndex}.svg`;

  d3.xml(patternFile)
    .then((patternData) => {
      console.log(`Pattern SVG loaded: ${patternFile}`);

      // Get the viewBox and dimensions of the pattern SVG
      const patternNode = document.importNode(patternData.documentElement, true);
      const viewBox = patternNode.getAttribute("viewBox") || "0 0 100 100";
      const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(" ").map(parseFloat);

      console.log(`Pattern viewBox: ${viewBox}`);

      // Add the pattern SVG to each selected circle position
      selectedIndices.forEach((index) => {
        const circle = d3.select(circles.nodes()[index]);
        const cx = parseFloat(circle.attr("cx"));
        const cy = parseFloat(circle.attr("cy"));
        const r = parseFloat(circle.attr("r"));

        if (!isNaN(cx) && !isNaN(cy)) {
          const patternWrapper = svg.append("g")
            .attr("class", "pattern-layer")
            .attr(
              "transform",
              `translate(${cx - (vbWidth / 2) * (r / 50) + 5.5}, ${
                cy - (vbHeight / 2) * (r / 50) - 5.5
              }) scale(${r / 50})`
            ); // Center align and scale the pattern SVG

          const clonedPattern = patternNode.cloneNode(true);
          patternWrapper.node().appendChild(clonedPattern);

          // Apply a color filter overlay
          svg.append("rect")
            .attr("x", cx - vbWidth / 2)
            .attr("y", cy - vbHeight / 2)
            .attr("width", vbWidth)
            .attr("height", vbHeight)
            .attr("fill", rgbString)
            .attr("opacity", 0.5); // Adjust opacity for blending

          console.log(`Pattern placed at (${cx}, ${cy}) with RGB filter: ${rgbString}`);
        } else {
          console.warn(`Invalid circle position at index ${index}`);
        }
      });
    })
    .catch((error) => console.error(`Error loading pattern SVG: ${patternFile}`, error));

  // Hide unselected <circle> elements
  circles.each(function (d, i) {
    if (!selectedIndices.includes(i)) {
      d3.select(this).style("display", "none");
    }
  });
}

// Export the function for use in other modules
export { loadSVGs };
