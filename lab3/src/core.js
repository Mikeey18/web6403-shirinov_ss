/**
 * Проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return (n | 0) === n;
}

/**
 * Возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    const result = [];
    for (let i = 2; i <= 20; i += 2) {
        result.push(i);
    }
    return result;
}

/**
 * Считает сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Считает сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    if (n <= 1) return n;
    return n + recSumTo(n - 1);
}

/**
 * Считает факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    if (n <= 0) return false;
    return (n & (n - 1)) === 0;
}

/**
 * Находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

/** 
 * Принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn(storedValue, newValue) => {operation}
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue;
    return function(newValue) {
        if (typeof operatorFn !== 'function') {
            return initialValue;
        }
        storedValue = operatorFn(storedValue, newValue);
        return storedValue;
    };
}

/**
 * Создает генератор арифметической последовательности.
 * @param {number} start число с чего начинается последовательность
 * @param {number} step - шаг последовательности
 */
function sequence(start = 0, step = 1) {
    let current = start - step;
    let isFirstCall = true;
    
    return function() {
        if (isFirstCall) {
            current = start;
            isFirstCall = false;
        } else {
            current += step;
        }
        return current;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 * 
 * @param {object} firstObject первый объект
 * @param {object} secondObject второй объект
 * @returns {boolean} true если объекты равны(по содержанию) иначе false
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) return true;

    if (
        typeof firstObject !== 'object' || firstObject === null ||
        typeof secondObject !== 'object' || secondObject === null
    ) {
        // Проверка на NaN, если оба значения NaN
        return Number.isNaN(firstObject) && Number.isNaN(secondObject);
    }

    const keysA = Object.keys(firstObject);
    const keysB = Object.keys(secondObject);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key)) return false;
        if (!deepEqual(firstObject[key], secondObject[key])) return false;
    }

    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};