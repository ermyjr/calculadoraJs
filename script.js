const previousOperationText= document.querySelector("previusOperation");
const currentOperationText= document.querySelector("currentOperation");
const buttons= document.querySelectorAll('#buttonsContainer');
class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit){
        this.currentOperation = digit;
        this.updateScreen();
    }

    updateScreen(){
        this.currentOperationText.innerText += this.currentOperation;
    }
}

const calc = new Calculator(previousOperationText,currentOperationText);

buttons.forEach((btn)=>{
    btn.addEventListener("click",(e) =>{
        const value = e.target.innerText;

        if(+value >=0 ||value ==="." ){
            calc.addDigit(value);

        }else{
            
        }
    });
});