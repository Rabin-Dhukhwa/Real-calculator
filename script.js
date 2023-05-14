"use strict";

const btns = document.querySelectorAll(".btn");
// console.log(btns);
const displayElement = document.querySelector(".display");
let strToDisplay = "";

const operators = ["%", "/", "+", "-", "*"];

let lastOperator = "";

btns.forEach((btn) => {
  //   console.log(btn);
  btn.addEventListener("click", () => {
    const val = btn.innerText;

    // console.log( val);
    // console.log(typeof val);

    //when you click operator and when the strToDisplay is empty or strToDisplay.length=0, it will return
    //you cann't click operator in first place
    if (operators.includes(val) && !strToDisplay.length) {
      return;
    }
    if (operators.includes(val)) {
      lastOperator = val;
      const lastChar = strToDisplay.slice(-1);
      //   console.log(strToDisplay);
      //   console.log(lastChar);
      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
    }

    if (val === "=") {
      return total();
    }

    if (val === "AC") {
      strToDisplay = "";
      return display();
    }
    if (val === "C") {
      strToDisplay = strToDisplay.slice(0, -1);
      return display(strToDisplay);
    }

    if (val === ".") {
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex); //string with and after last operator index
      //   console.log(lastOperatorIndex, lastNumberSet);
      if (lastNumberSet.includes(".")) {
        return;
      }
      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }

    strToDisplay += val;
    display(strToDisplay);
  });
});

// to display on calculator
const display = (str) => {
  displayElement.innerText = str || "0.00";
};

//calculating total and changing total in string again
const total = () => {
  const ttl = eval(strToDisplay);
  display(ttl);
  strToDisplay = ttl.toString();
};
