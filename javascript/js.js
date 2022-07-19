const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const button = document.querySelectorAll("#buttons-container button");


class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

    }

    //adicionando digito//
    addDigit(digit){
        console.log(digit);
        //checando se tiver um ou mais pontos//
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();

    }

    //Processando as operações da calculadora//
    processOperation(operation){
    //checagem do current value//
    if(this.currentOperationText.innerText === "" && operation !== "C"){
         //mudança de operação//
        if(this.previousOperationText.innerText !== ""){
            this.changeOperation(operation);
           

        }
        return;
    }


    //pegando os valores atuais e anteriores//

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
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
          // Aderindo valor ao atual//
          this.currentOperationText.innerText += this.currentOperation;
        } else {
          // Checando valor é zero//
          if (previous === 0) {
            operationValue = current;
          }
          // Adicionar o anterior ao atual//
          this.previousOperationText.innerText = `${operationValue} ${operation}`;
          this.currentOperationText.innerText = "";
        }
      }

    changeOperation(operation){

        const mathOperations =["*","/","+","-"];

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice(0,-1) + operation;
    }
  // Delete a digit//
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Clear current operation//
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Clear all operations//
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Process an operation//
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);



button.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;

        if (+value >= 0 ||  value === ".") {
            console.log(value);
            calc.addDigit(value);

        } else {
            calc.processOperation(value);

        }
    });
});