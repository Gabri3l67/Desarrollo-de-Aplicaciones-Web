CREATE DATABASE QuizApp;
GO

USE QuizApp;
GO

CREATE TABLE Questions (
    id INT PRIMARY KEY IDENTITY(1,1),
    question NVARCHAR(MAX),
    option1 NVARCHAR(255),
    option2 NVARCHAR(255),
    option3 NVARCHAR(255),
    option4 NVARCHAR(255),
    answer NVARCHAR(255)
);

INSERT INTO Questions (question, option1, option2, option3, option4, answer) VALUES
('¿Cuál es el lenguaje estándar específico para aplicar estilos de presentación a nuestras páginas web?', 'Javascript', 'CSS', 'PHP', 'Flash', 'CSS'),
('¿Qué significa la sigla HTML?', 'Hypertext Manual Language', 'Hypertext Markup Language', 'Hypertext Match Language', 'Sign Language HTML', 'Hypertext Markup Language'),
('¿Qué atributo de HTML se emplea en un formulario para especificar la página a la que se van a enviar los datos del mismo?', 'file', 'method', 'name', 'action', 'action'),
('¿Qué significa CSS?', 'Color Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets'),
('¿Qué significa XML?', 'extensible Markup Language', 'executable Multiple Language', 'exTra Multi-Program Language', 'examine Multiple Language', 'extensible Markup Language'),
('¿Cuál es la función de `document.getElementById` en JavaScript?', 'Crea un nuevo ID', 'Obtiene el elemento con el ID especificado', 'Modifica un ID existente', 'Elimina un ID específico', 'Obtiene el elemento con el ID especificado'),
('¿Qué etiqueta HTML se utiliza para definir una imagen?', '&lt;image&gt;', '&lt;img&gt;', '&lt;src&gt;', '&lt;media&gt;', '&lt;img&gt;'),
('¿Qué es jQuery?', 'Un lenguaje de programación', 'Una base de datos SQL', 'Una hoja de estilo CSS', 'Una biblioteca de JavaScript', 'Una biblioteca de JavaScript'),
('¿Qué lenguaje se utiliza principalmente para crear scripts en el lado del servidor?', 'HTML', 'CSS', 'JavaScript', 'PHP', 'PHP'),
('¿Qué es AJAX?', 'Asynchronous JavaScript and XML', 'Advanced JavaScript and XML', 'Asynchronous Java and XML', 'Automatic JavaScript and XML', 'Asynchronous JavaScript and XML'),
('¿Qué etiqueta HTML se utiliza para definir un párrafo?', '&lt;paragraph&gt;', '&lt;p&gt;', '&lt;pg&gt;', '&lt;para&gt;', '&lt;p&gt;'),
('¿Qué atributo se usa en HTML para referenciar un archivo CSS externo?', 'class', 'src', 'style', 'href', 'href'),
('¿Qué operador se utiliza en JavaScript para comparar tanto el valor como el tipo?', '==', '===', '=', '!=', '==='),
('¿Cuál de estos no es un framework de JavaScript?', 'React', 'Angular', 'Vue', 'Python', 'Python'),
('¿Qué es un bucle infinito?', 'Un bucle que nunca termina', 'Un bucle que ejecuta un número limitado de veces', 'Un error de compilación', 'Un tipo de estructura de datos', 'Un bucle que nunca termina'),
('¿Qué significa API en el contexto de desarrollo web?', 'Application Programming Interface', 'Application Protocol Interface', 'Application Performance Indicator', 'Array Programming Interface', 'Application Programming Interface'),
('¿Qué lenguaje de base de datos es el más utilizado?', 'Java', 'C#', 'Python', 'SQL', 'SQL'),
('¿Cuál es el propósito principal de la etiqueta &lt;canvas&gt; en HTML?', 'Manejar multimedia', 'Crear gráficos interactivos', 'Dibujar gráficos', 'Diseñar textos', 'Dibujar gráficos'),
('¿Qué herramienta se utiliza para asegurar la calidad del código en un proyecto de JavaScript?', 'Webpack', 'Babel', 'JQuery', 'ESLint', 'ESLint'),
('¿Qué es Git?', 'Un sistema de control de versiones', 'Un lenguaje de programación', 'Un tipo de base de datos', 'Un compilador', 'Un sistema de control de versiones'),
('¿Cuál de las siguientes opciones es un tipo de dato en JavaScript?', 'Element', 'Tag', 'Boolean', 'Attribute', 'Boolean'),
('¿Cuál de estas opciones es una herramienta para gestionar paquetes en JavaScript?', 'Java', 'SQL', 'npm', 'Photoshop', 'npm'),
('¿Qué significa SEO?', 'Search Engine Optimization', 'Secure Electronic Operation', 'Simple Electronic Operation', 'Software Engineering Operation', 'Search Engine Optimization'),
('¿Qué tipo de base de datos es MongoDB?', 'SQL', 'NoSQL', 'NewSQL', 'OldSQL', 'NoSQL'),
('¿Qué etiqueta HTML se utiliza para definir una lista desordenada?', '&lt;ul&gt;', '&lt;ol&gt;', '&lt;li&gt;', '&lt;list&gt;', '&lt;ul&gt;'),
('¿Qué atributo HTML se utiliza para definir estilos en línea?', 'class', 'style', 'styles', 'stylesheet', 'style'),
('¿Cuál es el propósito de la etiqueta &lt;link&gt; en HTML?', 'Vincular hojas de estilo', 'Iniciar un enlace', 'Conectar con bases de datos', 'Crear un hipervínculo', 'Vincular hojas de estilo'),
('¿Cuál de los siguientes es un editor de texto popular para el desarrollo web?', 'Microsoft Word', 'Notepad', 'Visual Studio Code', 'Adobe Reader', 'Visual Studio Code'),
('¿Qué tecnología se utiliza principalmente para añadir interactividad a una página web?', 'CSS', 'HTML', 'JavaScript', 'SQL', 'JavaScript'),
('¿Cuál de los siguientes NO es un sistema operativo?', 'Windows', 'Linux', 'MacOS', 'Oracle', 'Oracle'),
('¿Qué significa HTTP?', 'Hypertext Transfer Protocol', 'HighText Transfer Product', 'HyperText Transfer Process', 'None of the above', 'Hypertext Transfer Protocol'),
('¿Qué etiqueta HTML se utiliza para definir texto en negrita?', '&lt;bold&gt;', '&lt;b&gt;', '&lt;strong&gt;', '&lt;em&gt;', '&lt;strong&gt;'),
('¿Qué es una función en JavaScript?', 'Un tipo de variable', 'Un bloque de código diseñado para realizar una tarea particular', 'Una declaración de estilo CSS', 'Un modelo de base de datos', 'Un bloque de código diseñado para realizar una tarea particular'),
('¿Qué lenguaje se utiliza para definir y manipular datos en una base de datos?', 'HTML', 'JavaScript', 'CSS', 'SQL', 'SQL'),
('¿Cuál es la diferencia entre "class" y "id" en HTML?', '"class" y "id" son intercambiables', '"id" es más rápido en CSS', '"class" puede usarse en múltiples elementos, mientras que "id" es único para cada elemento', 'No hay diferencia', '"class" puede usarse en múltiples elementos, mientras que "id" es único para cada elemento');
