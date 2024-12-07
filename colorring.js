const canvas = document.getElementById('colorRing');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const outerRadius = 150;
const innerRadius = 120;
const parts = 64;
const rotationOffset = -Math.PI / 2; // 90 degrees counter-clockwise
const elements = [
    "乾", "坤", "屯", "蒙", "需", "讼", "师", "比",
    "小畜", "履", "泰", "否", "同人", "大有", "谦", "豫",
    "随", "蛊", "临", "观", "噬嗑", "贲", "剥", "复",
    "无妄", "大畜", "颐", "大过", "坎", "离", "咸", "恒",
    "遯", "大壮", "晋", "明夷", "家人", "睽", "蹇", "解",
    "损", "益", "夬", "姤", "萃", "升", "困", "井",
    "革", "鼎", "震", "艮", "渐", "归妹", "丰", "旅",
    "巽", "兑", "涣", "节", "中孚", "小过", "既济", "未济"
];
const colors = ['green', 'blue', 'red', 'yellow', 'white', 'gray', 'black','brown'];

function createColorWheel() {
    const gradient = ctx.createConicGradient(0, centerX, centerY);
    const colorStops = colors.length;
    for (let i = 0; i < colorStops; i++) {
        gradient.addColorStop(i / colorStops, colors[i]);
    }
    gradient.addColorStop(1, colors[0]); // Close the gradient loop
    ctx.fillStyle = gradient;

    // Draw the full ring with gradient
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true);
    ctx.closePath();
    ctx.fill();
}

function sliceRing() {
    const angleStep = (2 * Math.PI) / parts;

    for (let i = 0; i < parts; i++) {
        const startAngle = rotationOffset + i * angleStep;
        const endAngle = startAngle + angleStep;

        // Clip a segment of the gradient
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        ctx.closePath();
        ctx.clip();

        // Draw the segment
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // Calculate average color (rough estimate using the middle angle)
        const middleAngle = (startAngle + endAngle) / 2;
        const avgColor = getAverageColor(middleAngle);

        // Display color info with the element index
        displayColorInfo(elements[i], avgColor, i);
    }
}


function getAverageColor(angle) {
    // Estimate average color by sampling the gradient
    const x = centerX + Math.cos(angle) * ((outerRadius + innerRadius) / 2);
    const y = centerY + Math.sin(angle) * ((outerRadius + innerRadius) / 2);
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    return { r: imageData[0], g: imageData[1], b: imageData[2] };
}

// Create a global array to store output
const outputArray = [];

function displayColorInfo(element, avgColor, index) {
    const colorInfo = document.getElementById('colorInfo');
    const div = document.createElement('div');
    div.className = 'color-item';

    // Set background color
    const backgroundColor = `rgb(${avgColor.r}, ${avgColor.g}, ${avgColor.b})`;
    div.style.backgroundColor = backgroundColor;

    // Calculate inverted text color
    const invertedColor = `rgb(${255 - avgColor.r}, ${255 - avgColor.g}, ${255 - avgColor.b})`;
    div.style.color = invertedColor;

    // Set text content with the number
    div.textContent = `${element} (${index + 1}): ${backgroundColor}`;
    colorInfo.appendChild(div);

    // Push the data into the output array
    outputArray.push({
        element: element,
        index: index + 1,
        avgColor: {
            r: avgColor.r,
            g: avgColor.g,
            b: avgColor.b
        },
        backgroundColor: backgroundColor
    });
}

// After all the colors are processed, log the array
createColorWheel();
sliceRing();
console.log(outputArray);
