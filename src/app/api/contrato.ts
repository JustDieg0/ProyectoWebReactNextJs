import axios from 'axios';
import { ContratoPago } from '@/app/api/dto/definitions';

const url_base = "http://localhost:3001/";

export async function fetchCountContratos(): Promise<number> {
    try {
        const response = await axios.get(url_base + "cantidad/contrato");
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

export async function contratoPago(): Promise<ContratoPago[]> {
    try {
        const response = await axios.get(url_base + "contratopago");        
        const message = response.data.message;
        const data = response.data.data;

        if (Array.isArray(data)) {
            return data as ContratoPago[];
        } else {
            console.warn("La respuesta no es un array:", data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener contratos:", error);
        return [];
    }
}