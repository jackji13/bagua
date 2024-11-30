// Define the 64卦 array and their split elements
let gua = [
  { name: "乾", split: ["天", "天"] },
  { name: "坤", split: ["地", "地"] },
  { name: "屯", split: ["水", "雷"] },
  { name: "蒙", split: ["山", "水"] },
  { name: "需", split: ["水", "天"] },
  { name: "讼", split: ["天", "水"] },
  { name: "师", split: ["地", "水"] },
  { name: "比", split: ["水", "地"] },
  { name: "小畜", split: ["风", "天"] },
  { name: "履", split: ["天", "泽"] },
  { name: "泰", split: ["地", "天"] },
  { name: "否", split: ["天", "地"] },
  { name: "同人", split: ["天", "火"] },
  { name: "大有", split: ["火", "天"] },
  { name: "谦", split: ["地", "山"] },
  { name: "豫", split: ["雷", "地"] },
  { name: "随", split: ["泽", "雷"] },
  { name: "蛊", split: ["山", "风"] },
  { name: "临", split: ["地", "泽"] },
  { name: "观", split: ["风", "地"] },
  { name: "噬嗑", split: ["火", "雷"] },
  { name: "贲", split: ["山", "火"] },
  { name: "剥", split: ["山", "地"] },
  { name: "复", split: ["地", "雷"] },
  { name: "无妄", split: ["天", "雷"] },
  { name: "大畜", split: ["山", "天"] },
  { name: "颐", split: ["山", "雷"] },
  { name: "大过", split: ["泽", "风"] },
  { name: "坎", split: ["水", "水"] },
  { name: "离", split: ["火", "火"] },
  { name: "咸", split: ["泽", "山"] },
  { name: "恒", split: ["雷", "风"] },
  { name: "遁", split: ["天", "山"] },
  { name: "大壮", split: ["雷", "天"] },
  { name: "晋", split: ["火", "地"] },
  { name: "明夷", split: ["地", "火"] },
  { name: "家人", split: ["风", "火"] },
  { name: "睽", split: ["火", "泽"] },
  { name: "蹇", split: ["水", "山"] },
  { name: "解", split: ["雷", "水"] },
  { name: "损", split: ["山", "泽"] },
  { name: "益", split: ["风", "雷"] },
  { name: "夬", split: ["泽", "天"] },
  { name: "姤", split: ["天", "风"] },
  { name: "萃", split: ["泽", "地"] },
  { name: "升", split: ["地", "风"] },
  { name: "困", split: ["泽", "水"] },
  { name: "井", split: ["水", "风"] },
  { name: "革", split: ["泽", "火"] },
  { name: "鼎", split: ["火", "风"] },
  { name: "震", split: ["雷", "雷"] },
  { name: "艮", split: ["山", "山"] },
  { name: "渐", split: ["风", "山"] },
  { name: "归妹", split: ["雷", "泽"] },
  { name: "丰", split: ["雷", "火"] },
  { name: "旅", split: ["火", "山"] },
  { name: "巽", split: ["风", "风"] },
  { name: "兑", split: ["泽", "泽"] },
  { name: "涣", split: ["风", "水"] },
  { name: "节", split: ["水", "泽"] },
  { name: "中孚", split: ["风", "泽"] },
  { name: "小过", split: ["雷", "山"] },
  { name: "既济", split: ["水", "火"] },
  { name: "未济", split: ["火", "水"] }
];

// Mapping chart for transferring element to number
let elementToNumber = {
  "天": 1, "泽": 2, "火": 3, "雷": 4, 
  "风": 5, "水": 6, "山": 7, "地": 8
};

// Input elements
let input1, input2, button;
let result1 = "", result2 = "";
let split1 = [], split2 = [];

function setup() {
  createCanvas(1600, 800); // Combined canvas
  noLoop();

  // Input fields for numbers
  input1 = createInput();
  input1.position(20, 50);

  input2 = createInput();
  input2.position(20, 100);

  // Button to calculate
  button = createButton("Submit");
  button.position(20, 150);
  button.mousePressed(processNumbers);
}

function draw() {
  background(240);

  // Draw results on the left side
  fill(0);
  textSize(16);
  text("Enter two numbers:", 20, 30);
  text(`Result 1: ${result1} (${split1[0]}, ${split1[1]})`, 20, 200);
  text(`Result 2: ${result2} (${split2[0]}, ${split2[1]})`, 20, 250);

  // Draw pattern on the right side
  translate(800, 0);
  drawPattern();
}

function processNumbers() {
  let num1 = int(input1.value());
  let num2 = int(input2.value());

  // Process numbers based on the remainder
  let index1 = (num1 <= 64) ? num1 - 1 : (num1 % 64) - 1;
  let index2 = (num2 <= 64) ? num2 - 1 : (num2 % 64) - 1;

  // Ensure indices are within bounds
  index1 = (index1 + 64) % 64;
  index2 = (index2 + 64) % 64;

  // Get matching 卦 and their splits
  result1 = gua[index1].name;
  split1 = gua[index1].split;

  result2 = gua[index2].name;
  split2 = gua[index2].split;

  redraw();
}

function drawPattern() {
  if (split1.length === 0 || split2.length === 0) return;

  // Get anchor circle position from split1 elements
  let anchorX = elementToNumber[split1[0]] * 100;
  let anchorY = elementToNumber[split1[1]] * 100;

  // Get number of rings and distance from split2 elements
  let numRings = elementToNumber[split2[0]];
  let ringDistance = elementToNumber[split2[1]] * 20;

  // Get color from system time
  let h = hour();
  let m = minute();
  let s = second();
  let r = map(h, 0, 23, 0, 255);
  let g = map(m, 0, 59, 0, 255);
  let b = map(s, 0, 59, 0, 255);

  fill(r, g, b);
  noStroke();

  // Draw anchor circle
  ellipse(anchorX, anchorY, 30, 30);

  // Draw rings
  for (let i = 1; i <= numRings; i++) {
    let radius = i * ringDistance;
    let numCircles = 8; // Fixed number of circles per ring
    for (let j = 0; j < numCircles; j++) {
      let angle = TWO_PI / numCircles * j;
      let x = anchorX + cos(angle) * radius;
      let y = anchorY + sin(angle) * radius;
      ellipse(x, y, 20, 20);
    }
  }
}
