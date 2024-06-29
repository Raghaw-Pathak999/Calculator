document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let secondOperand = null;

    // Function to update the display
    function updateDisplay() {
        display.value = currentInput;
    }

    // Function to handle number button clicks
    function handleNumberClick(number) {
        currentInput += number;
        updateDisplay();
    }

    // Function to handle operator button clicks
    function handleOperatorClick(op) {
        if (currentInput === '') return; // Do nothing if no number is entered
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
            operator = op;
            currentInput = '';
        } else {
            secondOperand = parseFloat(currentInput);
            performOperation();
            operator = op;
            currentInput = '';
        }
    }

    // Function to perform the calculation based on operator
    function performOperation() {
        if (operator === '+') {
            firstOperand += secondOperand;
        } else if (operator === '-') {
            firstOperand -= secondOperand;
        } else if (operator === '*') {
            firstOperand *= secondOperand;
        } else if (operator === '/') {
            if (secondOperand === 0) {
                alert("Error: Division by zero");
                clearAll();
                return;
            } else {
                firstOperand /= secondOperand;
            }
        }
        secondOperand = null;
        currentInput = firstOperand.toString();
        updateDisplay();
    }

    // Function to handle equal button click
    function handleEqualClick() {
        if (operator && currentInput !== '') {
            secondOperand = parseFloat(currentInput);
            performOperation();
            operator = null;
        }
    }

    // Function to handle clear button click
    function handleClearClick() {
        clearAll();
        updateDisplay();
    }

    // Function to clear all variables
    function clearAll() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        secondOperand = null;
    }

    // Event listeners for button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                handleNumberClick(button.textContent);
            } else if (button.classList.contains('operator')) {
                handleOperatorClick(button.textContent);
            } else if (button.classList.contains('equal')) {
                handleEqualClick();
            } else if (button.classList.contains('clear')) {
                handleClearClick();
            }
        });
    });
});