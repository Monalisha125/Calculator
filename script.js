const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('button');

let screenValue = '';
let currentOperator = '';
let previousValue = '';
let currentValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.value;

        if (buttonValue === 'all-clear') {
            screenValue = '';
            currentOperator = '';
            previousValue = '';
            currentValue = '';
            screen.value = '';
        } else if (buttonValue === '=') {
            if (currentOperator && previousValue !== '') {
                screenValue = operate(previousValue, currentOperator, currentValue);
                screen.value = screenValue;
                currentOperator = '';
                previousValue = screenValue;
                currentValue = '';
            }
        } else if (button.classList.contains('operator')) {
            if (previousValue === '') {
                previousValue = screenValue;
            } else if (currentOperator) {
                screenValue = operate(previousValue, currentOperator, currentValue);
                previousValue = screenValue;
            }
            currentOperator = buttonValue;
            screenValue = '';
        } else {
            screenValue += buttonValue;
            screen.value = screenValue;
            currentValue = screenValue;
        }
    });
});

function operate(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error';
        default:
            return num2;
    }
}
