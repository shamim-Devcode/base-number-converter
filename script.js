function validateAndConvert(base) {
    const input = document.getElementById(base).value.trim();
    const errorElement = document.getElementById(`${base}-error`);
    let isValid = true;

    // Validation rules based on base
    if (base === 'binary') {
        isValid = /^[01]*$/.test(input);
        errorElement.textContent = 'Invalid input: Binary only supports 0 and 1';
    } else if (base === 'decimal') {
        isValid = /^[0-9]*$/.test(input);
        errorElement.textContent = 'Invalid input: Decimal only supports digits 0-9';
    } else if (base === 'hexadecimal') {
        isValid = /^[0-9a-fA-F]*$/.test(input);
        errorElement.textContent = 'Invalid input: Hexadecimal supports 0-9 and A-F';
    } else if (base === 'octal') {
        isValid = /^[0-7]*$/.test(input);
        errorElement.textContent = 'Invalid input: Octal only supports digits 0-7';
    }

    if (isValid && input) {
        errorElement.style.display = 'none';
        convertFrom(base, input);
    } else if (!input) {
        clearAll(); // Clear outputs if input is empty
    } else {
        errorElement.style.display = 'block';
    }
}

function convertFrom(base, input) {
    let decimal;

    try {
        if (base === 'decimal') {
            decimal = BigInt(input);
        } else if (base === 'binary') {
            decimal = BigInt(`0b${input}`);
        } else if (base === 'hexadecimal') {
            decimal = BigInt(`0x${input}`);
        } else if (base === 'octal') {
            decimal = BigInt(`0o${input}`);
        }
        
        document.getElementById('decimal').value = decimal.toString(10);
        document.getElementById('binary').value = decimal.toString(2);
        document.getElementById('hexadecimal').value = decimal.toString(16).toUpperCase();
        document.getElementById('octal').value = decimal.toString(8);
    } catch (e) {
        console.error("Error in conversion:", e);
    }
    resizeTextareas();
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

function resizeTextareas() {
    document.querySelectorAll('textarea').forEach(textarea => {
        autoResize(textarea);
    });
}

function clearAll() {
    document.getElementById('decimal').value = '';
    document.getElementById('binary').value = '';
    document.getElementById('hexadecimal').value = '';
    document.getElementById('octal').value = '';
    setPlaceholders();
    clearErrors();
}

function clearErrors() {
    document.getElementById('decimal-error').style.display = 'none';
    document.getElementById('binary-error').style.display = 'none';
    document.getElementById('hexadecimal-error').style.display = 'none';
    document.getElementById('octal-error').style.display = 'none';
}

function setPlaceholders() {
    document.getElementById('decimal').placeholder = 'Enter decimal';
    document.getElementById('binary').placeholder = 'Enter binary';
    document.getElementById('hexadecimal').placeholder = 'Enter hexadecimal';
    document.getElementById('octal').placeholder = 'Enter octal';
}

function copyText(id) {
    const copyText = document.getElementById(id);
    copyText.select();
    document.execCommand('copy');
    showCopyMessage(id);
}

function showCopyMessage(id) {
    const inputGroup = document.getElementById(id).parentElement;
    const message = document.createElement('div');
    message.id = 'copyAlt';
    //message.innerHTML = 'Copied!';
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Copied!",
        showConfirmButton: false,
        timer: 500
      });
    inputGroup.appendChild(message);
    setTimeout(() => {
        inputGroup.removeChild(message);
    }, 1000);
}

window.onload = function() {
    setPlaceholders();
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', () => autoResize(textarea));
        autoResize(textarea); // Initialize the size
    });
};
