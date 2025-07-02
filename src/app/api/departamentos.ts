"use server"

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth'
import { Departamento } from './dto/definitions';
import axios from "axios";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const url_base = "http://localhost:3001/";

const FormSchema = z.object({
    departamentoid: z.string().max(5, { message: 'El id es de 5 caracteres' }),
    nombre: z.string().max(100, { message: 'El id es de 100 caracteres máximo' }),
    descripcion: z.string({ invalid_type_error: 'Elija un estado valido' }),
    tipo: z.enum(['departamento', 'minidepartamento', 'cuarto'], { invalid_type_error: 'Elija un tipo valido' }),
    precio_mensual: z.coerce.number().gte(0, { message: 'El precio mensual es mayor a 0' }).lte(9999.99, { message: 'El precio mensual es menor a 9999.99' }),
    estado: z.enum(['disponible', 'ocupado', 'mantenimiento'], { invalid_type_error: 'Elija un estado valido' }),
    aforo: z.coerce.number().int({ message: 'El aforo tiene que ser entero' }).gte(0, { message: 'El aforo tiene que ser mayor a 0' }).lte(99, { message: 'El aforo tiene que ser mayor a 99' }),
    ubicacion: z.string().max(100, { message: 'La ubicación es de maxímo 100 caracteres' }),
    activo: z.string().transform((val) => val === "1")

});

const CreateDepartamento = FormSchema.omit({ departamentoid: true, activo: true });
const UpdateDepartamento = FormSchema.omit({ departamentoid: true });
const PatchActivoDepartamento = FormSchema.pick({ activo : true})

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

export async function fetchAdminDepartamento(): Promise<Departamento[]> {
    const session = await getServerSession(authOptions);

    if (!session || !session.token) {
        console.error('No hay sesión activa o token');
        return [];
    }
    try {
        const response = await axios.get(url_base + "admin/departamento", {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        });
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

export type State = {
    errors?: {
        departamentoid?: string[];
        nombre?: string[];
        descripcion?: string[];
        tipo?: string[];
        precio_mensual?: string[];
        estado?: string[];
        aforo?: string[];
        ubicacion?: string[];
    };
    message?: string | null;
};

export async function createDepartamento(prevState: State, formData: FormData): Promise<State> {
    const validationFields = CreateDepartamento.safeParse({
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        tipo: formData.get('tipo'),
        precio_mensual: formData.get('precio_mensual'),
        estado: formData.get('estado'),
        aforo: formData.get('aforo'),
        ubicacion: formData.get('ubicacion'),
    });

    if (!validationFields.success) {
        return {
            errors: validationFields.error.flatten().fieldErrors,
            message: 'Faltan Campos. No se pudo crear un departamento'
        }
    }

    const { nombre, descripcion, tipo, precio_mensual, estado, aforo, ubicacion } = validationFields.data

    const session = await getServerSession(authOptions);

    if (!session?.token) {
        console.error('No hay sesión activa o token');
        return {
            message: "No se pudo crear departamento"
        };
    }

    try {
        await axios.post("http://localhost:3001/departamento", {
            nombre,
            descripcion,
            tipo,
            precio_mensual,
            estado,
            aforo,
            ubicacion,
        },
            {
                headers:
                {
                    Authorization: `Bearer ${session.token}`,
                },
            });
    } catch (error) {
        return {
            message: 'Error al conectar con la api'
        }
    }

    revalidatePath('/dashboard/departamentos');
    redirect('/dashboard/departamentos');

}

export async function updateDepartamento(id: string, prevState: State, formData: FormData) : Promise<State> {
    const validationFields = UpdateDepartamento.safeParse({
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        tipo: formData.get('tipo'),
        precio_mensual: formData.get('precio_mensual'),
        estado: formData.get('estado'),
        aforo: formData.get('aforo'),
        ubicacion: formData.get('ubicacion'),
        activo: formData.get('activo'),
    });

    if (!validationFields.success) {
        return {
            errors: validationFields.error.flatten().fieldErrors,
            message: 'Faltan Campos. No se pudo crear un departamento'
        }
    }

    const { nombre, descripcion, tipo, precio_mensual, estado, aforo, ubicacion, activo } = validationFields.data

    const session = await getServerSession(authOptions);

    if (!session || !session.token) {
        console.error('No hay sesión activa o token');
        return {
            message: "No se pudo crear departamento"
        };
    }
    try {
        await axios.put(`http://localhost:3001/departamento/${id}`, {
            nombre,
            descripcion,
            tipo,
            precio_mensual,
            estado,
            aforo,
            ubicacion,
            activo
        },
            {
                headers:
                {
                    Authorization: `Bearer ${session.token}`,
                },
            });
    } catch (error) {
        return {
            message: 'Error al conectar con la api'
        }
    }

    revalidatePath('/dashboard/departamentos');
    redirect('/dashboard/departamentos');
}

export async function deleteDepartamento(id: string) {

    const session = await getServerSession(authOptions);

    if (!session || !session.token) {
        console.error('No hay sesión activa o token');
        return;
    }

    await axios.delete(`http://localhost:3001/departamento/${id}`, {
        headers:
        {
            Authorization: `Bearer ${session.token}`,
        },
    });
    revalidatePath('/dashboard/departamentos');
}

export async function patchActivoDepartamento(id: string, formData: FormData) {

  const validationFields = PatchActivoDepartamento.safeParse({
    activo : formData.get("activo")
  });

  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    console.error('No hay sesión activa o token');
    return;
  }

  if (!validationFields.success) {
    return;
  }

  var { activo } = validationFields.data

  await axios.patch(`http://localhost:3001/departamento/${id}`,
    {
      activo
    }, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  revalidatePath('/dashboard/departamentos');
}