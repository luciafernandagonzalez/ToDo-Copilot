# To-Do List App

Aplicación web simple para gestionar tareas (To-Do List) creada con Node.js, Express y JavaScript. Permite agregar, editar, completar y eliminar tareas desde una interfaz moderna y responsiva. Realizada completamente con copilot.

## Características

- Backend con Express y endpoints REST para tareas.
- Frontend en HTML, CSS y JavaScript puro.
- Interfaz responsiva tipo tarjetas, con colores según estado.
- Edición de tareas mediante modal estilizado.
- Sin base de datos, las tareas se guardan en memoria.

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/todo-copilot.git
   cd todo-copilot
   ```

2. **Instala las dependencias:**
   ```bash
   npm install express
   ```

## Ejecución

1. **Inicia el servidor:**
   ```bash
   node server.js
   ```
2. **Abre la aplicación:**
   - Ve a [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

- **Agregar tarea:** Escribe el nombre y haz clic en "Agregar".
- **Editar tarea:** Haz clic en "Editar", modifica el texto y guarda.
- **Completar/Desmarcar:** Haz clic en "Completar" o "Desmarcar".
- **Eliminar:** Haz clic en "Eliminar" para borrar la tarea.

## Estructura del proyecto

```
todo-copilot/
│
├── server.js           # Backend Express
├── public/
│   ├── index.html      # Interfaz principal
│   ├── style.css       # Estilos responsivos y tarjetas
│   └── script.js       # Lógica frontend
└── README.md
```

## Cómo se creó con Copilot

Esta aplicación fue desarrollada utilizando **GitHub Copilot** como asistente de programación. Copilot ayudó a:

- Generar la estructura básica del servidor Express y los endpoints REST.
- Proponer el código para la interfaz HTML y la lógica JavaScript.
- Sugerir estilos CSS modernos y responsivos.
- Mejorar la experiencia de usuario con modales y tarjetas.
- Optimizar el código y responder dudas técnicas durante el desarrollo.

Los prompts principales usados fueron:
- Crear servidor con express
- Crear servidor con Express
- Lista de tareas en memoria
- Endpoints: GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id
- Interfaz de To-Do List: formulario para agregar tareas, lista de tareas, y botones para editar, completar o eliminar
- Estilos base para todo list
- Funcion para obtener tareas del backend y mostrarlas en el dom
- Función para enviar nueva tarea al backend, Función para editar tarea, Función para marcar como completada, Función para eliminar tarea
Los estilos se fueron mejorando a traves de promps recursivos y arreglando bugs de la misma manera "mejorar estilos, hacer tipo tarjetas y colores segun estado", "cambiar el prompt de editar tarea a un mmodal con estilos", "hacer responsive", etc.
