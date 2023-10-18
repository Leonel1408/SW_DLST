function validateShiftAndKey(shift, key) {
    let errors = [];

    if (shift !== undefined) {
        if (isNaN(shift) || shift < 1 || shift > 25) {
            errors.push("El desplazamiento debe ser un número entre 1 y 25.");
        }
    }

    if (key !== undefined) {
        if (!/^[a-zA-Z]+$/.test(key)) {
            errors.push("La clave Vigenère debe contener solo letras.");
        }
    }

    return errors;
}

document.addEventListener("DOMContentLoaded", function() {
    // Resto del código existente
    // ...

    encryptDecryptButton.addEventListener("click", function() {
        const text = textInput.value;
        const method = methodSelect.value;
        const shift = parseInt(shiftInput.value, 10);
        const key = keyInput.value;

        const validationErrors = validateShiftAndKey(method === "cesar" ? shift : undefined, method === "vigenere" ? key : undefined);

        if (validationErrors.length > 0) {
            resultTextArea.value = "Errores de validación:\n" + validationErrors.join("\n");
        } else {
            if (method === "cesar") {
                resultTextArea.value = cesarCipher(text, shift);
            } else if (method === "vigenere") {
                resultTextArea.value = vigenereCipher(text, key);
            }
        }
    });


});


document.addEventListener("DOMContentLoaded", function() {
    const textInput = document.getElementById("text");
    const methodSelect = document.getElementById("method");
    const shiftDiv = document.getElementById("shift-div");
    const shiftInput = document.getElementById("shift");
    const keyDiv = document.getElementById("key-div");
    const keyInput = document.getElementById("key");
    const resultTextArea = document.getElementById("result");
    const encryptDecryptButton = document.getElementById("encrypt-decrypt");

    methodSelect.addEventListener("change", function() {
        if (methodSelect.value === "cesar") {
            shiftDiv.style.display = "block";
            keyDiv.style.display = "none";
        } else if (methodSelect.value === "vigenere") {
            shiftDiv.style.display = "none";
            keyDiv.style.display = "block";
        }
    });

    encryptDecryptButton.addEventListener("click", function() {
        const text = textInput.value;
        const method = methodSelect.value;

        if (method === "cesar") {
            const shift = parseInt(shiftInput.value, 10);
            resultTextArea.value = cesarCipher(text, shift);
        } else if (method === "vigenere") {
            const key = keyInput.value;
            resultTextArea.value = vigenereCipher(text, key);
        }
    });

    function cesarCipher(text, shift) {
        return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
                const isUpperCase = char === char.toUpperCase();
                const charCode = char.charCodeAt(0) - (isUpperCase ? 65 : 97);
                const shiftedCharCode = (charCode + shift) % 26;
                const shiftedChar = String.fromCharCode((shiftedCharCode >= 0 ? 65 : 97) + shiftedCharCode);
                return isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
            }
            return char;
        }).join('');
    }
    

    function vigenereCipher(text, key) {
        const keyRepeated = key.repeat(Math.ceil(text.length / key.length)).slice(0, text.length);
        return text.split('').map((char, index) => {
            if (/[a-zA-Z]/.test(char)) {
                const isUpperCase = char === char.toUpperCase();
                const textCharCode = char.charCodeAt(0) - (isUpperCase ? 65 : 97);
                const keyCharCode = keyRepeated[index].charCodeAt(0) - (isUpperCase ? 65 : 97);
                const shiftedCharCode = (textCharCode + keyCharCode) % 26;
                const shiftedChar = String.fromCharCode((shiftedCharCode >= 0 ? 65 : 97) + shiftedCharCode);
                return isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
            }
            return char;
        }).join('');
    }
    
});
