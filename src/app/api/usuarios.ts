import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const url_base = "http://localhost:3001/";

export async function fetchCountUsuarios(): Promise<number> {
    try {
        const response = await axios.get(url_base + "cantidad/usuario");
        const message = response.data.message;
        const data = response.data.data;

        if (Array.isArray(data)) {
            return data[0].cantidad;
        } else {
            console.warn("La respuesta no es un array:", data);
            return 0;
        }
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return 0;
    }
}