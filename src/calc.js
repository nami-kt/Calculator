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
});
