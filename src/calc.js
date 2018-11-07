/*
document.querySelectorAll(".calculator-keys button").forEach(b => {
  b.onclick = function() {
    let text = b.innerText;
    if (text == "AC") {
      document.querySelector(".calculator-screen").value = "";
    } else if (text == "=") {
      let eq = document.querySelector(".calculator-screen").value;
      try {
        document.querySelector(".calculator-screen").value = eval(eq);
      } catch (e) {
        document.querySelector(".calculator-screen").value = "err";
      }
    } else if (text == ".") {
      document.querySelector(".calculator-screen").value += ".";
    } else if (text == "×") {
      document.querySelector(".calculator-screen").value += "*";
    } else if (text == "÷") {
      document.querySelector(".calculator-screen").value += "/";
    } else {
      document.querySelector(".calculator-screen").value += text;
    }
  };
}); */

const calculator = {
  displayValue: "0",
  firstOperand: null,
  secondOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();

function inputDigit(digit) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    if (calculator.displayValue === "0") {
      calculator.displayValue = digit;
    } else {
      calculator.displayValue = calculator.displayValue + digit;
    }
  }
}

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", event => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }
  if (target.classList.contains("operator")) {
    handleOperator(target.classList);
    return;
  }
  if (target.classList.contains("equals")) {
    printResult();
    return;
  }
  if (target.classList.contains("all-clear")) {
    allClear();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

function handleOperator(nextOperator) {
  //pokud je to prvni cislo ve vyrazu, firstOperand = displayValue
  if (calculator.firstOperand === null) {
    calculator.firstOperand = parseFloat(calculator.displayValue);
  } else if (calculator.operator) {
    //pokud to neni prvni cislo, spocita current vysledek (firstOper + display) a ulozi do result
    const result = performCalculation[calculator.operator](
      calculator.firstOperand,
      parseFloat(calculator.displayValue)
    );

    //na display ulozi current vysledek
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
    updateDisplay();
  }
  calculator.waitingForSecondOperand = true;
  //calculator.operator = nextOperator;
}

function allClear() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.secondOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  updateDisplay();
}

function printResult() {
  calculator.displayValue = performCalculation;
  updateDisplay();
}

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand
};
