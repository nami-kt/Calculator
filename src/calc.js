const calculator = {
  displayValue: "0",
  firstOperand: null,
  //secondOperand: null,
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
  calculator.operator = nextOperator;
}

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
  "=": (firstOperand, secondOperand) => secondOperand
};

function allClear() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  //calculator.secondOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  updateDisplay();
}

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", event => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    return;
  }
  if (target.classList.contains("all-clear")) {
    allClear();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
