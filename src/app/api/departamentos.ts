"use server"

import { Departamento } from './dto/definitions';
import axios from "axios";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const url_base = "http://localhost:3001/";

const FormSchema = z.object({
    departamentoid : z.string().max(5),
    nombre : z.string().max(100),
    descripcion : z.string(),
    tipo : z.enum(['departamento','minidepartamento','cuarto']),
    precio_mensual: z.coerce.number().gte(0).lte(9999.99),
    estado : z.enum(['disponible','ocupado','mantenimiento']),
    aforo : z.coerce.number().int().gte(0).lte(99),
    ubicacion : z.string().max(100),
    activo: z.string().transform((val) => val === "1")

});

const CreateDepartamento = FormSchema.omit({ departamentoid: true, activo: true });
const UpdateDepartamento = FormSchema.omit({ departamentoid: true });

export async function fetchDepartamento(): Promise<Departamento[]> {
    try {
        const response = await axios.get(url_base + "departamento");
        const message = response.data.message;
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

export async function getDepartamentoById(id: string): Promise<Departamento | null> {
    try {
        const response = await axios.get(`${url_base}departamento/${id}`);
        const message = response.data.message;
        const data = response.data.data;
        console.log(message);
        if (Array.isArray(data) && data.length > 0) {
            return data[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el departamento:", error);
        return null;
    }
}

export async function createDepartamento(formData: FormData) {
  const { nombre, descripcion, tipo, precio_mensual, estado, aforo, ubicacion } = CreateDepartamento.parse({
        nombre: formData.get('nombre'),
        descripcion : formData.get('descripcion'),
        tipo : formData.get('tipo'),
        precio_mensual: formData.get('precio_mensual'),
        estado : formData.get('estado'),
        aforo : formData.get('aforo'),
        ubicacion : formData.get('ubicacion'),
    });


    await axios.post("http://localhost:3001/departamento", {
        nombre,
        descripcion,
        tipo,
        precio_mensual,
        estado,
        aforo,
        ubicacion
    });

    revalidatePath('/dashboard/departamentos');
    redirect('/dashboard/departamentos');

}

export async function updateDepartamento(id: string, formData: FormData){
    const { nombre, descripcion, tipo, precio_mensual, estado, aforo, ubicacion, activo } = UpdateDepartamento.parse({
        nombre: formData.get('nombre'),
        descripcion : formData.get('descripcion'),
        tipo : formData.get('tipo'),
        precio_mensual: formData.get('precio_mensual'),
        estado : formData.get('estado'),
        aforo : formData.get('aforo'),
        ubicacion : formData.get('ubicacion'),
        activo : formData.get('activo'),
    });

    console.log(activo);
    await axios.put(`http://localhost:3001/departamento/${id}`, {
        nombre,
        descripcion,
        tipo,
        precio_mensual,
        estado,
        aforo,
        ubicacion,
        activo
    });

    revalidatePath('/dashboard/departamentos');
    redirect('/dashboard/departamentos');
}

export async function deleteDepartamento(id: string){
    await axios.delete(`http://localhost:3001/departamento/${id}`);
    revalidatePath('/dashboard/departamentos');
}