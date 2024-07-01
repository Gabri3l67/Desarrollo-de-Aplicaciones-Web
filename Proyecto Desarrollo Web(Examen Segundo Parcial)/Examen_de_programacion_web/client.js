document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('questions-container');
    if (!container) {
        console.error('El contenedor de preguntas no existe en el DOM');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/questions');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const questions = await response.json();

        if (questions.length === 0) {
            console.log('No hay preguntas para mostrar.');
            container.innerHTML = '<p>No se encontraron preguntas.</p>';
            return;
        }

        questions.forEach(question => {
            const elem = document.createElement('div');
            elem.innerHTML = `<strong>${question.question}</strong><ul>` +
                `<li>${question.option1}</li>` +
                `<li>${question.option2}</li>` +
                `<li>${question.option3}</li>` +
                `<li>${question.option4}</li></ul>`;
            container.appendChild(elem);
        });
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        container.innerHTML = '<p>Error al cargar las preguntas.</p>';
    }
});
