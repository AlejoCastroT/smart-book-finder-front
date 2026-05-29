import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books';

export const searchBooks = async (searchParams) => {
    try {
        const response = await axios.post(`${API_URL}/search`, searchParams);
        return response.data;
    } catch (error) {
        // ✅ Cambiamos .error por .message para que coincida con el backend y el mock
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error de conexión con el servidor");
    }
};

export const saveFavorite = async (bookKey) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/favorites/${bookKey}`);
        return response.data;
    } catch (error) {
        // ✅ Cambiamos .error por .message aquí también
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
};