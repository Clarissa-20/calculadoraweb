let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';
let memory = 0;

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.innerText;

        if (value === "C") {
            clearDisplay();
        } else if (value === "MC") {
            clearMemory();
        } else if (value === "MR") {
            recallMemory();
        } else if (value === "MS") {
            storeMemory();
        } else if (!isNaN(value) || value === '.') {
            currentInput += value;
            display.value = currentInput;
        } else if (value === "=") {
            if (operator) {
                let result = calculate(previousInput, currentInput, operator);
                display.value = result;
                currentInput = result;
                operator = '';
            }
        } else {
            if (currentInput) {
                if (operator) {
                    previousInput = calculate(previousInput, currentInput, operator);
                    display.value = previousInput;
                } else {
                    previousInput = currentInput;
                }
                currentInput = '';
            }
            operator = value;
        }
    });
});

function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (operator === '/' && b === 0) {
        return 'Error';
    }

    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '%': return (a * b) / 100;
        case 'mod': return a % b;
        default: return b;
    }
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    previousInput = '';
    operator = '';
}

function clearMemory() {
    memory = 0;
    updateMemoryDisplay();
}

function recallMemory() {
    display.value = memory;
    currentInput = memory;
}

function storeMemory() {
    if (currentInput) {
        memory = parseFloat(currentInput);
        updateMemoryDisplay();
    }
}

function updateMemoryDisplay() {
    document.getElementById('memoryDisplay').innerText = `Memoria: ${memory}`;
}
