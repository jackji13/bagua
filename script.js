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

function loadSVGs(firstNumber, secondNumber, input2, rgb, gua, result2Number) {
  // Clear the container
  clearContainer();

  let remainder = firstNumber % 7;

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

      // Ensure result2Number is passed correctly
      if (result2Number === undefined || isNaN(result2Number)) {
        console.error("Error: result2Number is undefined or NaN.");
        return;
      }

      modifySVG(svgWrapper, secondNumber, input2, firstNumber, rgb, gua, result2Number);
    })
    .catch((error) => console.error(`Error loading ${svgFiles[remainder]}:`, error));
}

function modifySVG(wrapper, count, input2, result1Number, rgb, gua, result2Number) {
  const [r, g, b] = rgb || [0, 0, 0]; // Default to black if RGB is undefined
  const rgbString = `rgb(${r}, ${g}, ${b})`;

  console.log(`Applying CSS fill: ${rgbString} for Result 1 Number: ${result1Number}`);
  console.log(`Result 2 First Number: ${result2Number}`);

  // Calculate scale factor based on result2Number
  const minScale = 1 / 70;
  const maxScale = 1 / 15;
  const scaleFactor = minScale + ((result2Number - 1) / 7) * (maxScale - minScale);
  console.log(`Calculated scale factor: ${scaleFactor}`);

  // Select all <circle> elements in the SVG
  const svg = d3.select(wrapper).select("svg");
  const circles = svg.selectAll("circle");
  const totalCircles = circles.size();

  console.log(`Total <circle> elements found: ${totalCircles}`);

  if (count > totalCircles) {
    console.warn(`Count (${count}) exceeds total circles. Limiting count to ${totalCircles}.`);
    count = totalCircles; // Limit count to total circles
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

      // Append the pattern node temporarily to measure its bounding box
      const patternNode = document.importNode(patternData.documentElement, true);
      const tempPattern = svg.append("g").style("visibility", "hidden").node();
      tempPattern.appendChild(patternNode);

      // Get the bounding box dimensions
      const bbox = tempPattern.getBBox();
      const vbWidth = bbox.width;
      const vbHeight = bbox.height;
      svg.node().removeChild(tempPattern);

      console.log(`Pattern bounding box: ${vbWidth}x${vbHeight}`);

      // Add the pattern SVG to each selected circle position
      selectedIndices.forEach((index) => {
        const circle = d3.select(circles.nodes()[index]);
        const cx = parseFloat(circle.attr("cx"));
        const cy = parseFloat(circle.attr("cy"));

        if (!isNaN(cx) && !isNaN(cy)) {
          // Apply a slight upward offset for better centering
          const verticalAdjustment = -5; // Adjust upward by 5 units

          const patternWrapper = svg.append("g")
            .attr("class", "pattern-layer")
            .attr(
              "transform",
              `translate(${cx - (vbWidth * scaleFactor) / 2}, ${
                cy - (vbHeight * scaleFactor) / 2 + verticalAdjustment
              }) scale(${scaleFactor})`
            ); // Center align the pattern SVG

          const clonedPattern = patternNode.cloneNode(true);
          patternWrapper.node().appendChild(clonedPattern);

          // Apply the CSS fill to elements with the `.patternfilter` class
          d3.select(patternWrapper.node())
            .selectAll(".patternfilter")
            .attr("fill", rgbString); // Apply the dynamic color

          console.log(
            `Pattern placed at (${cx}, ${cy}) with adjusted vertical centering and RGB: ${rgbString}`
          );
        } else {
          console.warn(`Invalid circle position at index ${index}`);
        }
      });
    })
    .catch((error) => console.error(`Error loading pattern SVG: ${patternFile}`, error));

  // Hide unselected <circle> elements only if count < total
  if (count < totalCircles) {
    circles.each(function (d, i) {
      if (!selectedIndices.includes(i)) {
        d3.select(this).style("display", "none");
      }
    });
  }
}



// Export the function for use in other modules
export { loadSVGs };
