 // Seleccionando todos los elementos requeridos
 const start_btn = document.querySelector(".start_btn button");
 const info_box = document.querySelector(".info_box");
 const exit_btn = info_box.querySelector(".buttons .quit");
 const continue_btn = info_box.querySelector(".buttons .restart");
 const quiz_box = document.querySelector(".quiz_box");
 const result_box = document.querySelector(".result_box");
 const option_list = document.querySelector(".option_list");
 const time_line = document.querySelector("header .time_line");
 const timeText = document.querySelector(".timer .time_left_txt");
 const timeCount = document.querySelector(".timer .timer_sec");
 
 let questions = []; // Array para almacenar las preguntas obtenidas
 let selectedQuestions = []; // Array para almacenar las 10 preguntas aleatorias seleccionadas
 
 // Función para obtener las preguntas desde la base de datos
 async function fetchQuestions() {
     try {
         const response = await fetch('http://localhost:3001/questions');
         const data = await response.json();
         questions = data.map((question, index) => ({
             numb: index + 1,
             question: question.question,
             answer: question.answer.trim(), // Asegúrate de que 'answer' sea el nombre correcto del campo en tu base de datos y recorta espacios en blanco
             options: [question.option1.trim(), question.option2.trim(), question.option3.trim(), question.option4.trim()] // Recorta espacios en blanco de las opciones
         }));
         selectedQuestions = getRandomQuestions(questions, 10); // Selecciona 10 preguntas aleatoriamente
         startQuiz(); // Inicia el quiz después de obtener las preguntas
     } catch (error) {
         console.error('Error al obtener las preguntas:', error);
     }
 }
 
 // Llamar a la función para obtener las preguntas al cargar la página
 document.addEventListener('DOMContentLoaded', fetchQuestions);
 
 // Función para iniciar el quiz
 function startQuiz() {
     // si se hace clic en el botón Iniciar prueba
     start_btn.onclick = () => {
         info_box.classList.add("activeInfo"); // Mostrar cuadro de información
     }
 
     // si se hace clic en el botón Salir del cuestionario
     exit_btn.onclick = () => {
         info_box.classList.remove("activeInfo"); // Ocultar cuadro de información
     }
 
     // si se hace clic en el botón continuar prueba
     continue_btn.onclick = () => {
         info_box.classList.remove("activeInfo"); // Ocultar cuadro de información
         quiz_box.classList.add("activeQuiz"); // Mostrar cuadro del cuestionario
         showQuestions(0); // Llamar a la función showQuestions
         queCounter(1); // Pasar el valor 1 a queCounter
         startTimer(15); // Iniciar el temporizador con 15 segundos
         startTimerLine(0); // Iniciar la línea del temporizador
     }
 
     let timeValue = 15;
     let que_count = 0;
     let que_numb = 1;
     let userScore = 0;
     let counter;
     let counterLine;
     let widthValue = 0;
 
     const restart_quiz = result_box.querySelector(".buttons .restart");
     const quit_quiz = result_box.querySelector(".buttons .quit");
 
     // si se hace clic en el botón Reiniciar cuestionario
     restart_quiz.onclick = () => {
         quiz_box.classList.add("activeQuiz"); // Mostrar cuadro del cuestionario
         result_box.classList.remove("activeResult"); // Ocultar cuadro de resultados
         timeValue = 15; // Reiniciar el tiempo a 15 segundos
         que_count = 0;
         que_numb = 1;
         userScore = 0;
         widthValue = 0;
         selectedQuestions = getRandomQuestions(questions, 10); // Seleccionar nuevas 10 preguntas aleatorias
         showQuestions(que_count); // Llamar a la función showQuestions
         queCounter(que_numb); // Pasar el valor que_numb a queCounter
         clearInterval(counter); // Limpiar el contador
         clearInterval(counterLine); // Limpiar la línea del contador
         startTimer(timeValue); // Reiniciar el temporizador con 15 segundos
         startTimerLine(widthValue); // Llamar a la función startTimerLine
         timeText.textContent = "Tiempo restante"; // Cambiar el texto de timeText a Tiempo restante
         next_btn.classList.remove("show"); // Ocultar el botón de siguiente
     }
 
     // si se hace clic en el botón Salir del cuestionario
     quit_quiz.onclick = () => {
         window.location.reload(); // Recargar la ventana actual
     }
 
     const next_btn = document.querySelector("footer .next_btn");
     const bottom_ques_counter = document.querySelector("footer .total_que");
 
     // si se hace clic en el botón Next Que
     next_btn.onclick = () => {
         if (que_count < selectedQuestions.length - 1) {
             que_count++; // Incrementar el índice de la pregunta actual
             que_numb++; // Incrementar el contador de preguntas mostradas
             showQuestions(que_count); // Mostrar la siguiente pregunta
             queCounter(que_numb); // Actualizar el contador de UI
             clearInterval(counter); // Limpiar el temporizador actual
             startTimer(timeValue); // Iniciar un nuevo temporizador
             startTimerLine(widthValue); // Reiniciar la barra de tiempo
         } else {
             clearInterval(counter); // Limpiar el temporizador si es la última pregunta
             showResult(); // Mostrar los resultados
         }
     }
 
     // obtener preguntas y opciones de la matriz
     function showQuestions(index) {
         const que_text = document.querySelector(".que_text");
 
         // Creando una nueva etiqueta span y div para la pregunta y opción y pasando el valor usando el índice de la matriz
         let que_tag = '<span>' + selectedQuestions[index].numb + ". " + selectedQuestions[index].question + '</span>';
         let option_tag = '<div class="option"><span>' + selectedQuestions[index].options[0] + '</span></div>'
             + '<div class="option"><span>' + selectedQuestions[index].options[1] + '</span></div>'
             + '<div class="option"><span>' + selectedQuestions[index].options[2] + '</span></div>'
             + '<div class="option"><span>' + selectedQuestions[index].options[3] + '</span></div>';
         que_text.innerHTML = que_tag; // Añadiendo nueva etiqueta span dentro de que_tag
         option_list.innerHTML = option_tag; // Añadiendo nueva etiqueta div dentro de option_tag
 
         const option = option_list.querySelectorAll(".option");
 
         // Establecer el atributo onclick para todas las opciones disponibles
         for (let i = 0; i < option.length; i++) {
             option[i].setAttribute("onclick", "optionSelected(this)");
         }
     }
 
     // Crear las nuevas etiquetas div para los íconos
     let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
     let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
 
     // Si el usuario hace clic en una opción
     window.optionSelected = function (answer) {
         clearInterval(counter); // Limpiar contador
         clearInterval(counterLine); // Limpiar contador de línea
 
         let userAns = answer.textContent.trim(); // Obtener la opción seleccionada por el usuario y recortar espacios en blanco
         let correcAns = selectedQuestions[que_count].answer; // Obtener la respuesta correcta de la matriz
         const allOptions = option_list.children.length; // Obtener todos los elementos de opción
 
         if (userAns === correcAns) { // Si la opción seleccionada por el usuario es igual a la respuesta correcta de la matriz
             userScore += 1; // Incrementar el valor de la puntuación del usuario en 1
             answer.classList.add("correct"); // Añadir color verde a la opción seleccionada correcta
             answer.insertAdjacentHTML("beforeend", tickIconTag); // Añadir ícono de marca de verificación a la opción seleccionada correcta
             console.log("Correct Answer");
             console.log("Your correct answers = " + userScore);
         } else {
             answer.classList.add("incorrect"); // Añadir color rojo a la opción seleccionada incorrecta
             answer.insertAdjacentHTML("beforeend", crossIconTag); // Añadir ícono de cruz a la opción seleccionada incorrecta
             console.log("Wrong Answer");
 
             for (let i = 0; i < allOptions; i++) {
                 if (option_list.children[i].textContent.trim() === correcAns) { // Si hay una opción que coincide con la respuesta de la matriz
                     option_list.children[i].setAttribute("class", "option correct"); // Añadir color verde a la opción coincidente
                     option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Añadir ícono de marca de verificación a la opción coincidente
                     console.log("Auto selected correct answer.");
                 }
             }
         }
 
         for (let i = 0; i < allOptions; i++) {
             option_list.children[i].classList.add("disabled"); // Una vez que el usuario selecciona una opción, desactivar todas las opciones
         }
         next_btn.classList.add("show"); // Mostrar el botón de siguiente si el usuario seleccionó una opción
     }
 
     function showResult() {
         info_box.classList.remove("activeInfo"); // Ocultar el cuadro de información
         quiz_box.classList.remove("activeQuiz"); // Ocultar el cuadro del cuestionario
         result_box.classList.add("activeResult"); // Mostrar el cuadro de resultados
 
         const scoreText = result_box.querySelector(".score_text");
         let scoreTag;
 
         if (userScore > 3) {  // Cambia las condiciones si lo necesitas
             scoreTag = '<span>¡Has completado el cuestionario! y Muy bueno 😊, Tienes <p>' + userScore + '</p> de <p>' + selectedQuestions.length + '</p></span>';
         } else if (userScore > 1) {
             scoreTag = '<span>¡Has completado el cuestionario! y Muy bueno 😎, Tienes <p>' + userScore + '</p> de <p>' + selectedQuestions.length + '</p></span>';
         } else {
             scoreTag = '<span>¡Has completado el cuestionario! y Fallaste 😐, Tienes <p>' + userScore + '</p> de <p>' + selectedQuestions.length + '</p></span>';
         }
 
         scoreText.innerHTML = scoreTag;
     }
 
     function startTimer(time) {
         counter = setInterval(timer, 1000);
         function timer() {
             timeCount.textContent = time; // Cambiar el valor de timeCount con el valor de tiempo
             time--; // Decrementar el valor de tiempo
             if (time < 9) { // Si el temporizador es menor que 9
                 let addZero = timeCount.textContent;
                 timeCount.textContent = "0" + addZero; // Añadir un 0 antes del valor de tiempo
             }
             if (time < 0) { // Si el temporizador es menor que 0
                 clearInterval(counter); // Limpiar contador
                 timeText.textContent = "Se acabó el tiempo"; // Cambiar el texto del temporizador a Tiempo agotado
                 const allOptions = option_list.children.length; // Obtener todos los elementos de opción
                 let correcAns = selectedQuestions[que_count].answer; // Obtener la respuesta correcta de la matriz
                 for (let i = 0; i < allOptions; i++) {
                     if (option_list.children[i].textContent.trim() === correcAns) { // Si hay una opción que coincide con la respuesta de la matriz
                         option_list.children[i].setAttribute("class", "option correct"); // Añadir color verde a la opción coincidente
                         option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Añadir ícono de marca de verificación a la opción coincidente
                         console.log("Time Off: Auto selected correct answer.");
                     }
                 }
                 for (let i = 0; i < allOptions; i++) {
                     option_list.children[i].classList.add("disabled"); // Una vez que el usuario selecciona una opción, desactivar todas las opciones
                 }
                 next_btn.classList.add("show"); // Mostrar el botón de siguiente si el usuario seleccionó una opción
             }
         }
     }
 
     function startTimerLine(time) {
         counterLine = setInterval(timer, 39);
         function timer() {
             time += 1; // Incrementar el valor de tiempo en 1
             time_line.style.width = time + "px"; // Aumentar el ancho de la línea de tiempo con px por valor de tiempo
             if (time > 549) { // Si el valor de tiempo es mayor que 549
                 clearInterval(counterLine); // Limpiar counterLine
             }
         }
     }
 
     function queCounter(index) {
         let totalQueCounTag = '<span><p>' + index + '</p> de <p>' + selectedQuestions.length + '</p> Preguntas</span>';
         bottom_ques_counter.innerHTML = totalQueCounTag;
     }
 }
 
 // Función para obtener preguntas aleatorias
 function getRandomQuestions(questions, numQuestions) {
     return questions.sort(() => 0.5 - Math.random()).slice(0, numQuestions);
 }
 