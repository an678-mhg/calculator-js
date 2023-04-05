class calculator {
  constructor(input, buttons, calculatorElement) {
    this.input = input;
    this.buttons = buttons;
    this.calculatorElement = calculatorElement;
  }

  renderButton() {
    const html = this.buttons
      ?.map((button) => {
        return `
                <button class="button ${button.type}">
                  ${button.text}
                </button>
              `;
      })
      .join("");
    this.calculatorElement.innerHTML = html;
  }

  calculator(string) {
    let numbers = string.split(/\+|\-|\×|\÷/g);
    const operators = string.replace(/[0-9]|\./g, "").split("");

    let chia = operators.indexOf("÷");

    while (chia !== -1) {
      numbers.splice(chia, 2, numbers[chia] / numbers[chia + 1]);
      operators.splice(chia, 1);
      chia = operators.indexOf("÷");
    }

    let nhan = operators.indexOf("×");

    while (nhan !== -1) {
      numbers.splice(nhan, 2, numbers[nhan] * numbers[nhan + 1]);
      operators.splice(nhan, 1);
      nhan = operators.indexOf("×");
    }

    let tru = operators.indexOf("-");

    while (tru !== -1) {
      numbers.splice(tru, 2, numbers[tru] - numbers[tru + 1]);
      operators.splice(tru, 1);
      tru = operators.indexOf("-");
    }

    let cong = operators.indexOf("+");

    while (cong !== -1) {
      numbers.splice(0, 2, Number(numbers[cong]) + Number(numbers[cong + 1]));
      operators.splice(cong, 1);
      cong = operators.indexOf("+");
    }

    return numbers[0];
  }

  appendText(text) {
    this.input += text.trim();
    document.querySelector(".calculator-input").textContent = this.input;
  }

  clearText() {
    this.input = "";
    document.querySelector(".calculator-input").textContent = this.input;
  }

  assignText(text) {
    this.input = text.toString();
    document.querySelector(".calculator-input").textContent = this.input;
  }

  handleImportInput() {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const lastChar = this.input[this.input.length - 1];
        const typeButton = e.target.classList[1];

        if (typeButton === "operators") {
          if (!this.input.trim()) {
            return;
          }
        }

        if (typeButton === "ac") {
          return this.clearText();
        }

        if (typeButton === "del") {
          if (!this.input.trim()) {
            return;
          }

          const newInput = this.input
            .split("")
            .filter((_, index) => index !== this.input.length - 1)
            .join("");

          return this.assignText(newInput);
        }

        if (typeButton === "equal") {
          if (
            lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "×" ||
            lastChar === "÷" ||
            lastChar === "."
          ) {
            return;
          }

          const results = this.calculator(this.input);
          return this.assignText(results);
        }

        if (
          lastChar === "+" ||
          lastChar === "-" ||
          lastChar === "×" ||
          lastChar === "÷" ||
          lastChar === "."
        ) {
          if (typeButton === "operators" || typeButton === "dot") {
            return;
          }
        }

        this.appendText(e.target.textContent);
      });
    });
  }

  start() {
    this.renderButton();
    this.handleImportInput();
  }
}

const buttons = [
  {
    type: "ac",
    text: "AC",
  },
  {
    type: "del",
    text: "DEL",
  },
  {
    type: "operators",
    text: "÷",
  },
  {
    type: "operators",
    text: "×",
  },
  {
    type: "numbers",
    text: "7",
  },
  {
    type: "numbers",
    text: "8",
  },
  {
    type: "numbers",
    text: "9",
  },
  {
    type: "operators",
    text: "-",
  },
  {
    type: "numbers",
    text: "6",
  },
  {
    type: "numbers",
    text: "5",
  },
  {
    type: "numbers",
    text: "4",
  },
  {
    type: "operators",
    text: "+",
  },
  {
    type: "numbers",
    text: "1",
  },
  {
    type: "numbers",
    text: "2",
  },
  {
    type: "numbers",
    text: "3",
  },
  {
    type: "equal",
    text: "=",
  },
  {
    type: "numbers",
    text: "0",
  },
  {
    type: "dot",
    text: ".",
  },
];

const newCalculator = new calculator(
  "",
  buttons,
  document.querySelector(".calculator-button")
);

newCalculator.start();
