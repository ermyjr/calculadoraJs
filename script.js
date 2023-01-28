const previousOperationText = document.querySelector("#previusOperation")
const currentOperationText = document.querySelector("#currentOperation")
const buttons = document.querySelectorAll("#buttonsContainer button")
class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit) {

        if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    processOperation(operation) {

        if (this.currentOperationText.innerText === " ") {
            if (this.previousOperationText.innerText !== " " && operation !== "C") {
                this.changeOperation(operation);
            }
            return;
        }

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "DEL":
                this.processDelOperator();
                break;

            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearOperator();
                break;

                case "=":
                    this.processEqualOperator();
                    break;


            default:
                return;

        }

    }

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if (previous === 0) {
                operationValue = current;
            }
            this.previousOperationText.innerText = `${operationValue} ${operation} `;
            this.currentOperationText.innerText = " ";
        }
    }

    changeOperation(operation) {

        const mathOperations = ["*", "/", "-", "+"]

        if (!mathOperations.includes(operation)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    processClearCurrentOperator(){
        this.currentOperationText.innerText = "";
    }

    processClearOperator(){
        this.currentOperationText.innerText = " ";
        this.previousOperationText.innerText = " ";
    }

    processEqualOperator() {
        const operation= previousOperationText.innerText.split(" ")[1];
        
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);

        } else {
            calc.processOperation(value);
        }
    });
});