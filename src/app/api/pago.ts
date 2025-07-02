import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { GraficoVentas, UltimosPagos } from './dto/definitions';

const url_base = "http://localhost:3001/";

export async function fetchCountPagos(): Promise<number> {
    try {
        const response = await axios.get(url_base + "cantidad/pagos");
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

export async function dashboardPagos() : Promise<GraficoVentas[]> {
    try {
        const response = await axios.get(url_base + "dashboard/pagos");
        const message = response.data.message;
        const data = response.data.data;

        if (Array.isArray(data)) {
            return data[0];
        } else {
            console.warn("La respuesta no es un array:", data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return [];
    }
}

export async function ultimosPagos() : Promise<UltimosPagos[]> {
    try {
        const response = await axios.get(url_base + "dashboard/pagos/proximos/5");
        const message = response.data.message;
        const data = response.data.data;

        if (Array.isArray(data)) {
            return data;
        } else {
            console.warn("La respuesta no es un array:", data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return [];
    }
}