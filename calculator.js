import { loadSVGs } from "./script.js";

const gua = [
  { name: "乾", split: ["天", "天"], rgb: [10, 3, 3] },
  { name: "坤", split: ["地", "地"], rgb: [30, 8, 8] },
  { name: "屯", split: ["水", "雷"], rgb: [51, 13, 13] },
  { name: "蒙", split: ["山", "水"], rgb: [72, 18, 18] },
  { name: "需", split: ["水", "天"], rgb: [92, 23, 23] },
  { name: "讼", split: ["天", "水"], rgb: [114, 29, 29] },
  { name: "师", split: ["地", "水"], rgb: [134, 34, 34] },
  { name: "比", split: ["水", "地"], rgb: [154, 39, 39] },
  { name: "小畜", split: ["风", "天"], rgb: [154, 48, 39] },
  { name: "履", split: ["天", "泽"], rgb: [134, 58, 34] },
  { name: "泰", split: ["地", "天"], rgb: [114, 69, 29] },
  { name: "否", split: ["天", "地"], rgb: [92, 80, 23] },
  { name: "同人", split: ["天", "火"], rgb: [72, 91, 18] },
  { name: "大有", split: ["火", "天"], rgb: [51, 101, 13] },
  { name: "谦", split: ["地", "山"], rgb: [31, 112, 8] },
  { name: "豫", split: ["雷", "地"], rgb: [10, 123, 3] },
  { name: "随", split: ["泽", "雷"], rgb: [0, 120, 16] },
  { name: "蛊", split: ["山", "风"], rgb: [0, 104, 47] },
  { name: "临", split: ["地", "泽"], rgb: [0, 88, 79] },
  { name: "观", split: ["风", "地"], rgb: [0, 72, 111] },
  { name: "噬嗑", split: ["火", "雷"], rgb: [0, 57, 142] },
  { name: "贲", split: ["山", "火"], rgb: [0, 40, 176] },
  { name: "剥", split: ["山", "地"], rgb: [0, 24, 207] },
  { name: "复", split: ["地", "雷"], rgb: [0, 9, 238] },
  { name: "无妄", split: ["天", "雷"], rgb: [17, 0, 238] },
  { name: "大畜", split: ["山", "天"], rgb: [48, 0, 207] },
  { name: "颐", split: ["山", "雷"], rgb: [79, 0, 176] },
  { name: "大过", split: ["泽", "风"], rgb: [113, 0, 142] },
  { name: "坎", split: ["水", "水"], rgb: [144, 0, 111] },
  { name: "离", split: ["火", "火"], rgb: [176, 0, 79] },
  { name: "咸", split: ["泽", "山"], rgb: [208, 0, 47] },
  { name: "恒", split: ["雷", "风"], rgb: [239, 0, 16] },
  { name: "遁", split: ["天", "山"], rgb: [255, 16, 0] },
  { name: "大壮", split: ["雷", "天"], rgb: [255, 47, 0] },
  { name: "晋", split: ["火", "地"], rgb: [255, 79, 0] },
  { name: "明夷", split: ["地", "火"], rgb: [255, 111, 0] },
  { name: "家人", split: ["风", "火"], rgb: [255, 142, 0] },
  { name: "睽", split: ["火", "泽"], rgb: [255, 176, 0] },
  { name: "蹇", split: ["水", "山"], rgb: [255, 207, 0] },
  { name: "解", split: ["雷", "水"], rgb: [255, 238, 0] },
  { name: "损", split: ["山", "泽"], rgb: [255, 255, 17] },
  { name: "益", split: ["风", "雷"], rgb: [255, 255, 48] },
  { name: "夬", split: ["泽", "天"], rgb: [255, 255, 79] },
  { name: "姤", split: ["天", "风"], rgb: [255, 255, 113] },
  { name: "萃", split: ["泽", "地"], rgb: [255, 255, 144] },
  { name: "升", split: ["地", "风"], rgb: [255, 255, 176] },
  { name: "困", split: ["泽", "水"], rgb: [255, 255, 208] },
  { name: "井", split: ["水", "风"], rgb: [255, 255, 239] },
  { name: "革", split: ["泽", "火"], rgb: [247, 247, 247] },
  { name: "鼎", split: ["火", "风"], rgb: [232, 232, 232] },
  { name: "震", split: ["雷", "雷"], rgb: [216, 216, 216] },
  { name: "艮", split: ["山", "山"], rgb: [200, 200, 200] },
  { name: "渐", split: ["风", "山"], rgb: [184, 184, 184] },
  { name: "归妹", split: ["雷", "泽"], rgb: [167, 167, 167] },
  { name: "丰", split: ["雷", "火"], rgb: [152, 152, 152] },
  { name: "旅", split: ["火", "山"], rgb: [136, 136, 136] },
  { name: "巽", split: ["风", "风"], rgb: [120, 120, 120] },
  { name: "兑", split: ["泽", "泽"], rgb: [104, 104, 104] },
  { name: "涣", split: ["风", "水"], rgb: [88, 88, 88] },
  { name: "节", split: ["水", "泽"], rgb: [71, 71, 71] },
  { name: "中孚", split: ["风", "泽"], rgb: [56, 56, 56] },
  { name: "小过", split: ["雷", "山"], rgb: [40, 40, 40] },
  { name: "既济", split: ["水", "火"], rgb: [24, 24, 24] },
  { name: "未济", split: ["火", "水"], rgb: [8, 8, 8] }
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

  // Map split elements to numbers
  const split1Numbers = split1.map((el) => elementToNumber[el]);
  const split2Numbers = split2.map((el) => elementToNumber[el]);

  // Update UI
  result1Display.textContent = `Result 1: ${result1} (${num1}) (${split1[0]}: ${split1Numbers[0]}, ${split1[1]}: ${split1Numbers[1]})`;
  result2Display.textContent = `Result 2: ${result2} (${num2}) (${split2[0]}: ${split2Numbers[0]}, ${split2[1]}: ${split2Numbers[1]})`;

  // Load and modify SVGs
  console.log(`Loading SVGs for first number: ${split1Numbers[0]} and modifying with second number: ${split1Numbers[1]}, input2: ${num2}`);
  loadSVGs(split1Numbers[0], split1Numbers[1], num2, gua[index1].rgb, gua, split2Numbers[0]);
}


// Attach event listener
submitButton.addEventListener("click", processNumbers);
