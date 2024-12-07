import { loadSVGs } from "./script.js";

const gua = [
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
const elementToNumber = {
  天: 1, 泽: 2, 火: 3, 雷: 4, 风: 5, 水: 6, 山: 7, 地: 8
};

// Select DOM elements
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const submitButton = document.getElementById("submit-btn");
const result1Display = document.getElementById("result1");
const result2Display = document.getElementById("result2");

// Process numbers and update results
function processNumbers() {
  const num1 = parseInt(input1.value, 10) || 0;
  const num2 = parseInt(input2.value, 10) || 0;

  // Calculate indices
  let index1 = (num1 <= 64 ? num1 - 1 : (num1 % 64) - 1 + 64) % 64;
  let index2 = (num2 <= 64 ? num2 - 1 : (num2 % 64) - 1 + 64) % 64;

  // Get results
  const result1 = gua[index1].name;
  const split1 = gua[index1].split;
  const result2 = gua[index2].name;
  const split2 = gua[index2].split;

  // Map split elements to their corresponding numbers
  const split1Numbers = split1.map((el) => elementToNumber[el]);
  const split2Numbers = split2.map((el) => elementToNumber[el]);

  // Update the UI
  result1Display.textContent = `Result 1: ${result1} (${num1}) (${split1[0]}: ${split1Numbers[0]}, ${split1[1]}: ${split1Numbers[1]})`;
  result2Display.textContent = `Result 2: ${result2} (${num2}) (${split2[0]}: ${split2Numbers[0]}, ${split2[1]}: ${split2Numbers[1]})`;

  // Load the required SVGs and modify them
  console.log(`Loading SVGs for first number: ${split1Numbers[0]} and modifying with second number: ${split1Numbers[1]}, input2: ${num2}`);
  loadSVGs(split1Numbers[0], split1Numbers[1], num2);
}

// Attach event listener
submitButton.addEventListener("click", processNumbers);
