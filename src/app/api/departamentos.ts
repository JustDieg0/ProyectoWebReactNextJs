import { Departamento } from './dto/definitions';
import axios from "axios";

const url_base = "http://localhost:3001/";

export async function fetchDepartamento(): Promise<Departamento[]> {
    try {
        const response = await axios.get(url_base + "departamento");
        const message = response.data.message
        const data = response.data.data;

        if (Array.isArray(data)) {
            console.log(message);
            return data as Departamento[];
        } else {
            console.warn("La respuesta no es un array:", data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return [];
    }
}
