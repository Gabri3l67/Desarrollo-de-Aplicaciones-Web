// 1. Invertir una Cadena
function invertirCadena(cadena) {
    return cadena.split('').reverse().join('');
}

// 2. Número Primo
function esPrimo(numero) {
    if (numero <= 1) return false;
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) return false;
    }
    return true;
}

// 3. Eliminar Duplicados en un Arreglo
function eliminarDuplicados(arreglo) {
    return [...new Set(arreglo)];
}

// 4. Factorial de un Número
function factorial(numero) {
    if (numero < 0) return -1;
    if (numero === 0) return 1;
    return numero * factorial(numero - 1);
}

// 5. Contar Vocales
function contarVocales(cadena) {
    let count = 0;
    const vocales = 'aeiouAEIOU';
    for (let letra of cadena) {
        if (vocales.includes(letra)) count++;
    }
    return count;
}

// 6. Sumar los Números de un Arreglo
function sumarArreglo(arreglo) {
    return arreglo.reduce((a, b) => a + b, 0);
}

// 7. Buscar el Máximo en un Arreglo
function maximoEnArreglo(arreglo) {
    return Math.max(...arreglo);
}

// Funciones para mostrar resultados en la página
function mostrarResultado(actividad, inputId) {
    let input = document.getElementById(inputId).value;
    let resultado;

    switch (actividad) {
        case 'Invertir una Cadena':
            resultado = invertirCadena(input);
            break;
        case 'Número Primo':
            resultado = esPrimo(Number(input));
            break;
        case 'Eliminar Duplicados en un Arreglo':
            resultado = eliminarDuplicados(JSON.parse(input));
            break;
        case 'Factorial de un Número':
            resultado = factorial(Number(input));
            break;
        case 'Contar Vocales':
            resultado = contarVocales(input);
            break;
        case 'Sumar los Números de un Arreglo':
            resultado = sumarArreglo(JSON.parse(input));
            break;
        case 'Buscar el Máximo en un Arreglo':
            resultado = maximoEnArreglo(JSON.parse(input));
            break;
    }

    document.getElementById(`resultado-${inputId}`).innerText = `Resultado de ${actividad}: ${resultado}`;

    
}
