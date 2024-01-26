// Dividir: Divide

/**
 * Check if all variables are valid numbers.
 * @param  {any} variables
 * @returns {boolean} - true if all variables are numbers of false other way.
 */
function areNumbers(...variables) {
    let numbers = true
    variables.forEach((variable) => {
        if (typeof variable !== "number" || isNaN(variable)) {
            numbers = false
        }
    })
    return numbers
}

function areZerosNegatives(op, ...numbers) {
    let result = false
    for (let i = 0; i < numbers.length; i++) {
        if (op(numbers[i], 0)) {
            result = true
            break
        }
    }
    return result
}

function areZeros(a, b) {
    return areZerosNegatives((a, b) => a === b, a, b)
}

function areNegatives(a, b) {
    return areZerosNegatives((a, b) => a < b, a, b)
}

/**
 * Add or subtract two numbers depending of op.
 * @param {number} a
 * @param {number} b
 * @param {function} op
 * @returns {Promise} - Result of adding or subtracting a and b.
 */
function addSubtract(a, b, op) {
    return new Promise((resolve, reject) => {
        if (areNumbers(a, b)) { // If they are numbers
            if (!areZeros(a, b)) { // If they are numbers and they are not zeros
                result = op(a, b)
                if (result < 0) // If they are numbers and they are not zeros but the add is negative
                    reject("El resultado debe ser positivo.")
                else
                    resolve(result)
            } else { // If they are numbers but someone is zero
                reject("Operación innecesaria. Uno de los números es 0.")
            }
        } else { // If they are not numbers
            reject("Solo se puede operar con números.")
        }
    })
}

function add(a, b) {
    return addSubtract(a, b, (a, b) => a + b)
}

function subtract(a, b) {
    return addSubtract(a, b, (a, b) => a - b)
}

function multiply(a, b) {
    return new Promise((resolve, reject) => {
        if (areNumbers(a, b)) {
            if (!areNegatives(a, b)) {
                resolve(a * b)
            } else {
                reject("La calculadora sólo puede devolver valores positivos.")
            }
        } else { // If they are not numbers
            reject("Solo se puede operar con números.")
        }
    })
}

function divide(a, b) {
    return new Promise((resolve, reject) => {
        if (areNumbers(a, b)) {
            if (b === 0) {
                reject("División por cero.")
            } else {
                resolve(a / b)
            }
        } else { // If they are not numbers
            reject("Solo se puede operar con números.")
        }
    })
}

// TESTING
// add(20, 1)
//     .then((result) => console.log("RESOLVE:", result))
//     .catch((error) => console.log("REJECT:", error))

// subtract(5, 10)
//     .then((result) => console.log("RESOLVE:", result))
//     .catch((error) => console.log("REJECT:", error))

// multiply(2, 10)
//     .then((result) => console.log("RESOLVE:", result))
//     .catch((error) => console.log("REJECT:", error))

// divide(12, 3)
//     .then((result) => console.log("RESOLVE:", result))
//     .catch((error) => console.log("REJECT:", error))

async function calculator() {
    try {
        const addResult = await add(1, 2)
        const subtractResult = await subtract(3, 2)
        const multiplyResult = await multiply(1, 2)
        const divideResult = await divide(1, 2)
        console.log(addResult)
        console.log(subtractResult)
        console.log(multiplyResult)
        console.log(divideResult)
    } catch (error) {
        console.log(error)
    }
}

calculator()