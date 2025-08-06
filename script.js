let correctX;
let expression;
let result;
let T1, T2, T3, T;
let T1_display, T2_display, T3_display, T_display, correctX_display;
let correctAnswers = 0;
let totalQuestions = 0;
let currentCorrectOptions = [];
let isAnswered = false;

// Định nghĩa toàn cục (chỉ giá trị dương)
const decimals = [0.1, 0.2, 0.25, 0.5, 1, 2];
const fractions = [0.25, 0.5, 0.5]; // Số thực cho tính toán, chỉ giá trị dương

function generateSubExpression(allowOperation = true, forceTwoNumbers = false, excludeZero = false) {
  const operations = ['+', '-', '*'];
  let numbers = [...decimals, ...fractions];
  if (excludeZero) {
    numbers = numbers.filter(n => n !== 0); // Loại bỏ 0 nếu excludeZero là true
  }
  let parts = [numbers[Math.floor(Math.random() * numbers.length)]];

  if (forceTwoNumbers || (allowOperation && Math.random() < 0.7)) {
    let num2;
    do {
      num2 = numbers[Math.floor(Math.random() * numbers.length)];
    } while (num2 === parts[0]); // Đảm bảo num2 khác num1
    parts.push(operations[Math.floor(Math.random() * operations.length)]);
    parts.push(num2);
  }

  return parts.join(' ');
}

function simplifyExpression(expr) {
  let parts = expr.split(/[\+\-\*]/).map(p => p.trim()).filter(p => p);
  if (parts.length === 1 && !expr.includes('+') && !expr.includes('-') && !expr.includes('*') && !expr.includes('/')) {
    return expr; // Không dùng ngoặc nếu chỉ có 1 số
  }
  return `(${expr})`;
}

function evaluateExpression(expr) {
  console.log(`Evaluating expression: ${expr}`);
  let cleanExpr = expr.trim().replace(/\s+/g, ' '); // Chuẩn hóa khoảng trắng

  // Thay thế x bằng 0 tạm thời nếu có (để tính T độc lập với x)
  cleanExpr = cleanExpr.replace(/x/g, '0');

  // Xử lý hai dấu trừ liên tiếp (- -) thành +
  cleanExpr = cleanExpr.replace(/-\s*-/g, '+');

  // Tách biểu thức thành các thành phần và xử lý số âm
  let parts = [];
  let tokens = cleanExpr.match(/(-?\d+\.?\d*)|([\+\-\*])/g) || [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].match(/[\+\-\*]/)) {
      parts.push(tokens[i]);
    } else {
      parts.push(parseFloat(tokens[i]) || 0); // Đảm bảo giá trị là số, mặc định 0 nếu NaN
    }
  }
  console.log(`Parts: ${parts}`);

  // Tính toán theo thứ tự ưu tiên: * trước
  for (let i = 0; i < parts.length; i++) {
    if (typeof parts[i] === 'string' && parts[i] === '*') {
      let a = parts[i - 1];
      let b = parts[i + 1];
      if (typeof a === 'number' && typeof b === 'number') {
        let result = a * b;
        parts.splice(i - 1, 3, result);
        i--; // Quay lại kiểm tra vị trí mới
        console.log(`Multiplication: ${a} * ${b} = ${result}`);
      }
    }
  }

  // Tính toán cộng và trừ, đảm bảo giá trị trung gian đúng
  let total = parts[0];
  if (typeof total !== 'number' || isNaN(total)) total = 0; // Khởi tạo total là 0 nếu không phải số
  for (let i = 1; i < parts.length; i += 2) {
    let sign = parts[i];
    let value = parts[i + 1];
    if (typeof sign === 'string' && typeof value === 'number') {
      total = sign === '+' ? total + value : total - value;
      if (isNaN(total)) total = 0; // Ngăn lan truyền NaN, giữ 0 nếu cần
      console.log(`Operation: ${total} ${sign} ${value} = ${total}`);
    }
  }

  // Làm tròn đến 4 chữ số thập phân và loại bỏ 0 tận cùng
  let rounded = Number.isFinite(total) ? Number(total.toFixed(4)) : 0;
  return rounded.toString().replace(/\.?0+$/, '');
}

function formatForDisplay(value) {
  return value.toString().replace('.', ',');
}

function generateQuestion() {
  // Bước 1: Tạo vế trái
  let leftExpr = generateSubExpression(true, false, true); // Loại bỏ 0 ban đầu
  T1 = parseFloat(evaluateExpression(leftExpr));
  let safeT1 = isNaN(T1) ? 0 : T1; // Biến trung gian thay NaN bằng 0
  T1_display = formatForDisplay(safeT1);
  console.log(`T1 calculated from ${leftExpr} = ${safeT1} (display: ${T1_display})`);
  T = parseFloat(T1_display.replace(',', '.') || 0); // Khởi đầu T = T1_display, dùng 0 nếu NaN

  // Bước 2: Tạo dấu vế giữa
  const operatorsMid = ['+', '-', '*'];
  let operatorMid = operatorsMid[Math.floor(Math.random() * operatorsMid.length)];
  if (T1 === 0) {
    operatorMid = operatorsMid[Math.floor(Math.random() * 2)]; // Chọn + hoặc - nếu T1 = 0, loại bỏ *
  }

  // Bước 3: Tạo vế giữa (luôn gồm 2 số thập phân, thay num2 bằng x)
  let num1 = decimals[Math.floor(Math.random() * decimals.length)];
  if (num1 === 0) {
    num1 = decimals.find(n => n !== 0) || 0.1; // Đảm bảo num1 khác 0
  }
  let num2 = decimals[Math.floor(Math.random() * decimals.length)];
  const centerOperations = ['+', '-', '*'];
  let centerOp = centerOperations[Math.floor(Math.random() * centerOperations.length)];
  if (num1 === 0 && centerOp === '*') {
    centerOp = centerOperations[Math.floor(Math.random() * 2)]; // Chọn + hoặc - nếu num1 = 0
  }
  let centerExpr = `${num1} ${centerOp} ${num2}`; // Khai báo centerExpr trước
  let centerExprParts = centerExpr.split(' ').map(part => part.trim()); // Tách thành mảng
  if (centerExprParts.length !== 3) {
    centerExprParts = [num1.toString(), centerOp, num2.toString()]; // Đảm bảo đúng 3 phần tử
  }
  T2 = parseFloat(evaluateExpression(centerExpr));
  let safeT2 = isNaN(T2) ? 0 : T2; // Biến trung gian thay NaN bằng 0
  T2_display = formatForDisplay(safeT2);
  console.log(`T2 calculated from ${centerExpr} = ${safeT2} (display: ${T2_display})`);
  // Cập nhật T = T <operatorMid> T2_display
  T = operatorMid === '+' ? T + parseFloat(T2_display.replace(',', '.') || 0) :
      operatorMid === '-' ? T - parseFloat(T2_display.replace(',', '.') || 0) :
      operatorMid === '*' ? T * parseFloat(T2_display.replace(',', '.') || 0) : T;

  // Bước 4: Thay x bằng num2 (thay num2 sau centerOp)
  correctX = num2;
  correctX_display = formatForDisplay(correctX);
  console.log(`correctX set to ${correctX_display} (replaced from ${num2})`);
  let centerExprWithX = `${centerExprParts[0]} ${centerExprParts[1]} x`; // Thay num2 bằng x sau centerOp

  // Bước 5: Tạo dấu vế phải
  const operatorsRight = ['+', '-'];
  let operatorRight = operatorsRight[Math.floor(Math.random() * operatorsRight.length)];

  // Bước 6: Tạo vế phải
  let rightExpr = generateSubExpression(true);
  T3 = parseFloat(evaluateExpression(rightExpr));
  let safeT3 = isNaN(T3) ? 0 : T3; // Biến trung gian thay NaN bằng 0
  T3_display = formatForDisplay(safeT3);
  console.log(`T3 calculated from ${rightExpr} = ${safeT3} (display: ${T3_display})`);
  // Cập nhật T = T <operatorRight> T3_display
  T = operatorRight === '+' ? T + parseFloat(T3_display.replace(',', '.') || 0) :
      operatorRight === '-' ? T - parseFloat(T3_display.replace(',', '.') || 0) : T;

  T_display = formatForDisplay(Number(T.toFixed(4))); // Làm tròn đến 4 chữ số thập phân
  console.log(`T calculated from ${T1_display} ${operatorMid} ${T2_display} ${operatorRight} ${T3_display} = ${T} (display: ${T_display})`);

  // Bước 7: Nối đề theo định dạng ký hiệu toán học và định dạng tiếng Việt
  let simplifiedLeftExpr = simplifyExpression(leftExpr).replaceAll('.', ',').replace('*', '.');
  let simplifiedCenterExpr = centerOp === '*' ? `${num1.toString().replace('.', ',')} . ${num2.toString().replace('.', ',')}` : `(${centerExpr.replaceAll('.', ',').replace('*', '.')})`;
  let simplifiedCenterExprWithX = centerOp === '*' ? `${num1.toString().replace('.', ',')} . x` : `(${centerExprWithX.replaceAll('.', ',').replace('*', '.')})`;
  let simplifiedRightExpr = simplifyExpression(rightExpr).replaceAll('.', ',').replace('*', '.');
  expression = `${simplifiedLeftExpr} ${operatorMid === '*' ? '.' : operatorMid} ${simplifiedCenterExprWithX} ${operatorRight} ${simplifiedRightExpr}`;

  // Bước 8: Tạo 4 phương án
  let options = [correctX_display];
  let otherOptions = decimals.filter(n => Math.abs(n - correctX) > 0.01 && !options.includes(formatForDisplay(n))).map(n => formatForDisplay(n));
  while (options.length < 4 && otherOptions.length > 0) {
    let randIdx = Math.floor(Math.random() * otherOptions.length);
    options.push(otherOptions[randIdx]);
    otherOptions.splice(randIdx, 1);
  }
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  // Sử dụng T_display làm result, làm tròn đến 4 chữ số thập phân
  result = T_display;
  console.log(`Result set to T_display = ${result}`);

  return { expression, result, correctX, options };
}

function convertToDecimal(expr) {
  return expr.replace(/\\frac{(\d+)}{(\d+)}/g, (_, num, den) => {
    let result = parseFloat(num) / parseFloat(den);
    return result.toString().replace('.', ',');
  });
}

function generateAQuestion() {
  const { expression, result, correctX, options } = generateQuestion();
  const mathDiv = document.getElementById('math-expression');
  mathDiv.innerHTML = `\\(${expression} = ${result}\\)`;
  document.getElementById('checkButton').disabled = false;

  // Đảm bảo MathJax đã sẵn sàng
  if (typeof MathJax !== 'undefined' && MathJax.startup) {
    MathJax.startup.promise.then(() => {
      MathJax.typesetPromise().then(() => {
        const optionsDiv = document.getElementById('options-container');
        optionsDiv.innerHTML = '<b>Chọn giá trị x:</b><br>' + options.map((opt, index) => `
          <div class="option">
            <input type="radio" id="option${index}" name="xValue" value="${opt}" ${index === 0 ? 'checked' : ''}>
            <label for="option${index}">${opt}</label>
          </div>
        `).join('');
      }).catch(err => console.log('MathJax typesetting error:', err));
    }).catch(err => console.log('MathJax startup error:', err));
  } else {
    console.error('MathJax is not loaded');
    const optionsDiv = document.getElementById('options-container');
    optionsDiv.innerHTML = '<b>Chọn giá trị x:</b><br>' + options.map((opt, index) => `
      <div class="option">
        <input type="radio" id="option${index}" name="xValue" value="${opt}" ${index === 0 ? 'checked' : ''}>
        <label for="option${index}">${opt}</label>
      </div>
    `).join('');
  }
}

function startQuiz() {
  generateAQuestion();
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('checkButton').style.display = 'inline-block';
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="xValue"]:checked');
  if (!selectedOption) {
    document.getElementById('result').innerHTML = 'Vui lòng chọn một giá trị cho x!';
    return;
  }

  const userX = parseFloat(selectedOption.value.replace(',', '.'));
  const isCorrect = Math.abs(userX - parseFloat(correctX.toString().replace('.', '.'))) < 0.01;

  totalQuestions++;
  if (isCorrect) correctAnswers++;
  document.getElementById('correct').textContent = correctAnswers;
  document.getElementById('total').textContent = totalQuestions;
  document.getElementById('percentage').textContent =
    totalQuestions > 0 ? ((correctAnswers / totalQuestions * 100).toFixed(2) + '%') : '0%';

  document.getElementById('result').innerHTML = isCorrect
    ? '<span style="color: green;">Đúng!</span>'
    : `<span style="color: red;">Sai! Giá trị x đúng là ${correctX_display}.</span>`;
  isAnswered = true;
  document.getElementById('nextButton').disabled = false;
  document.getElementById('checkButton').disabled = true;
}

function nextQuestion() {
  if (isAnswered) {
    generateAQuestion();
    document.getElementById('result').innerHTML = '';
    document.getElementById('nextButton').disabled = true;
    isAnswered = false;
  }
}

window.onload = function() {
  // Thiết lập dark theme mặc định
  document.body.classList.add('dark-theme');
  const themeSwitch = document.createElement('button');
  themeSwitch.textContent = 'Chuyển sang Light Theme';
  themeSwitch.className = 'theme-switch';
  themeSwitch.onclick = () => {
    document.body.classList.toggle('dark-theme');
    themeSwitch.textContent = document.body.classList.contains('dark-theme')
      ? 'Chuyển sang Light Theme'
      : 'Chuyển sang Dark Theme';
  };
  document.body.appendChild(themeSwitch);
};