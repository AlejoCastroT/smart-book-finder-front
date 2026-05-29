# 📚 Smart Book Finder - Frontend

Este repositorio contiene el código de la interfaz de usuario (Frontend) para la aplicación web **Smart Book Finder**, desarrollada como parte del Taller Final de desarrollo y aseguramiento de calidad de una aplicación Full Stack.

El frontend permite a los usuarios buscar libros de forma intuitiva consumiendo una API RESTful propia, visualizar los resultados organizados en tarjetas y gestionar el estado de la aplicación de manera eficiente.

---

# 🛠️ Tecnologías y Herramientas

* **Librería Principal:** React
* **Empaquetador:** Vite
* **Peticiones HTTP:** Axios
* **Pruebas Funcionales (E2E):** Playwright
* **Estilos:** CSS puro (diseño limpio y responsivo)

---

# 📐 Arquitectura de Componentes

El código fue refactorizado siguiendo el patrón de **Componentes Contenedores y Presentacionales** para garantizar una arquitectura limpia, escalable y profesional.

## `App.jsx` (Contenedor)

Actúa como orquestador principal. Maneja el estado global de la vista, los estados de carga y coordina la comunicación con los servicios.

---

## `SearchForm.jsx` (Presentacional con estado aislado)

Se encarga exclusivamente de:

* Capturar los datos del usuario
* Limpiar los campos nulos (como idiomas no seleccionados)
* Enviar el payload formateado hacia el componente padre

---

## `BookList.jsx` (Presentacional)

Recibe el arreglo de libros y se encarga de iterarlos dinámicamente para generar la cuadrícula de resultados.

---

## `BookCard.jsx` (Presentacional)

Componente atómico que dibuja la información individual de un libro:

* Título
* Autor
* Año
* Ediciones
* Portada

Además, expone el evento para guardar en favoritos.

---

## `services/api.js`

Capa de servicios aislada que:

* Centraliza todas las llamadas HTTP (Axios)
* Gestiona el mapeo de errores provenientes del backend

---

# 🚀 Requisitos Previos

Para ejecutar este proyecto en un entorno local, asegúrate de tener instalado:

* **Node.js** (Versión 18 o superior)
* **npm** (Gestor de paquetes de Node)

---

# ⚙️ Instrucciones de Ejecución

## 1. Descargar (Clonar) el repositorio

Abre tu terminal y ejecuta el siguiente comando para descargar el código a tu equipo:

```bash id="q1"
git clone https://github.com/AlejoCastroT/smart-book-finder-front.git
cd smart-book-finder-front
```

---

## 2. Instalar las dependencias

Una vez dentro de la carpeta del proyecto, instala todas las librerías necesarias ejecutando:

```bash id="q2"
npm install
```

---

## 3. Iniciar el servidor de desarrollo

Para levantar la aplicación, utiliza el siguiente comando:

```bash id="q3"
npm run dev
```

---

# 🧪 Ejecución de Pruebas Funcionales (Playwright)

Este proyecto cumple con el aseguramiento de calidad mediante pruebas funcionales (E2E) integradas, las cuales validan el flujo completo y las reglas de negocio exigidas en la rúbrica.

## Escenarios de prueba cubiertos

* Búsqueda y visualización exitosa de resultados
* Manejo de error por parámetros requeridos nulos (título o autor)
* Manejo de error por cantidad insuficiente de coincidencias (< 3)

---

## Ejecutar la suite de pruebas automatizadas

Asegúrate de estar en la raíz del proyecto (`smart-book-finder-front`) y utiliza uno de los siguientes comandos.

### Opción A: Modo Consola (Headless)

Ejecuta las pruebas rápidamente en segundo plano:

```bash id="q4"
npx playwright test
```

---

### Opción B: Modo Interfaz Gráfica (UI)

Abre una ventana interactiva ideal para ver cómo el navegador realiza las pruebas paso a paso:

```bash id="q5"
npx playwright test --ui
```
