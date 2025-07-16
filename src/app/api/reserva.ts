"use server"

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth'
import { ReservaPago, Estadisticas } from './dto/definitions';

const url_base = "http://localhost:3001/";

const FormSchema = z.object({
    reservaid: z.string().max(5),
    usuarioid: z.string().max(5),
    departamentoid: z.string().max(5),
    fecha_inicio: z.string().datetime(),
    fecha_fin: z.string().datetime(),
    estado: z.enum(["pendiente", "confirmada", "cancelada", "vencida"]),
});

const CreditCardSchema = z.object({
  numero: z.string()
    .min(13)
    .max(19)
    .regex(/^\d+$/, "Debe contener solo números"),
  nombre_titular: z.string().min(1).max(100),
  vencimiento: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato debe ser MM/AA"),
  cvv: z.string()
    .regex(/^\d{3,4}$/, "Debe contener 3 o 4 dígitos"),
});


const CreateReserva = FormSchema.omit({ reservaid: true });

export type State = {
  errors?: {
    numero?: string[];
    nombre_titular?: string[];
    vencimiento?: string[];
    cvv?: string[];
  };
  message?: string | null;
};


export async function fetchCountReservas(): Promise<number> {
    try {
        const response = await axios.get(url_base + "cantidad/reservas");
        const message = response.data.message;
        const data = response.data.data;

        if (Array.isArray(data)) {
            return data[0].cantidad;
        } else {
            console.warn("La respuesta no es un array:", data);
            return 0;
        }
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        return 0;
    }
}

export async function createReserva(prevState: State, formData: FormData): Promise<State> {
    const validationFields = CreditCardSchema.safeParse({
        numero: formData.get('numero'),
        nombre_titular: formData.get('nombre_titular'),
        vencimiento: formData.get('vencimiento'),
        cvv: formData.get('cvv'),
    });

    if (!validationFields.success) {
        return {
            errors: validationFields.error.flatten().fieldErrors,
            message: 'Faltan Campos. No se pudo crear un reserva'
        }
    }

    const session = await getServerSession(authOptions);

    if (!session?.token) {
        console.error('No hay sesión activa o token');
        return {
            message: "No se pudo crear reserva"
        };
    }

    const now = new Date();
    const fecha_inicio = now.toISOString();

    const fecha_fin_date = new Date(now);
    fecha_fin_date.setDate(fecha_fin_date.getDate() + 7);
    const fecha_fin = fecha_fin_date.toISOString();

    console.log(session.user.id+ " "+formData.get('departamentoid')+" "+ fecha_fin+" "+ fecha_inicio )

    try {
        await axios.post("http://localhost:3001/reserva", {
            usuarioid: session.user.id,
            departamentoid: formData.get('departamentoid'),
            fecha_inicio,
            fecha_fin,
            estado: "pendiente",
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

    const searchParams = new URLSearchParams({
        usuario: session.user.nombres || 'Usuario',
        departamentoid: formData.get('departamentoid') as string,
        fecha_inicio,
        fecha_fin,
        estado: "pendiente",
    });

    console.log(searchParams.toString());

    revalidatePath('/reservar/exitosa');
    redirect(`/reservar/exitosa?${searchParams.toString()}`);

}

export async function createReservaPago(prevState: State, formData: FormData): Promise<State> {
    const validationFields = CreditCardSchema.safeParse({
        numero: formData.get('numero'),
        nombre_titular: formData.get('nombre_titular'),
        vencimiento: formData.get('vencimiento'),
        cvv: formData.get('cvv'),
    });

    if (!validationFields.success) {
        return {
            errors: validationFields.error.flatten().fieldErrors,
            message: 'Faltan Campos. No se pudo crear un reserva'
        }
    }

    const session = await getServerSession(authOptions);

    if (!session?.token) {
        console.error('No hay sesión activa o token');
        return {
            message: "No se pudo crear reserva"
        };
    }

    const now = new Date();
    const fecha_inicio = now.toISOString();

    const fecha_fin_date = new Date(now);
    fecha_fin_date.setDate(fecha_fin_date.getDate() + 7);
    const fecha_fin = fecha_fin_date.toISOString();

    console.log(session.user.id+ " "+formData.get('departamentoid')+" "+ fecha_fin+" "+ fecha_inicio )

    try {
        await axios.post("http://localhost:3001/reserva/pago", {
            usuarioid: session.user.id,
            departamentoid: formData.get('departamentoid'),
            fecha_inicio,
            fecha_fin,
            estado: "pendiente",
            precio: formData.get('depprecio')
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

    const searchParams = new URLSearchParams({
        usuario: session.user.nombres || 'Usuario',
        departamentoid: formData.get('departamentoid') as string,
        fecha_inicio,
        fecha_fin,
        estado: "pendiente",
        precio: formData.get('depprecio') as string,
    });

    console.log(searchParams.toString());

    revalidatePath('/reservar/exitosa');
    redirect(`/reservar/exitosa?${searchParams.toString()}`);

}

export async function fetchReservaPago(): Promise<ReservaPago[]> {
    const session = await getServerSession(authOptions);

    if (!session || !session.token) {
        console.error('No hay sesión activa o token');
        return [];
    }
    try {
        const response = await axios.get(url_base + "reserva/periodo", {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        });
        const message = response.data.message;
        const data = response.data.data;

        if (Array.isArray(data)) {
            console.log(message);
            return data as ReservaPago[];
        } else {
            console.warn("La respuesta no es un array:", data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return [];
    }
}

export async function getReservaPago(anio : number, mes: number): Promise<ReservaPago[]> {
    try {
        const response = await axios.get(`${url_base}reserva/periodo/${anio}/${mes}`);
        const message = response.data.message;
        const data = response.data.data;

        if (Array.isArray(data) && data.length > 0) {
            return data as ReservaPago[];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error al obtener el departamento:", error);
        return [];
    }
}

export async function getReservaPagoStats(anio : number, mes: number): Promise<Estadisticas> {
    try {
        const response = await axios.get(`${url_base}reserva/periodo/stats/${anio}/${mes}`);
        const message = response.data.message;
        const data = response.data.data;

        if (Array.isArray(data) && data.length > 0) {
            return data[0] as Estadisticas;
        } else {
            return { max_monto: 0, min_monto:0, promedio_monto:0 } as Estadisticas;
        }
    } catch (error) {
        console.error("Error al obtener el departamento:", error);
        return { max_monto: 0, min_monto:0, promedio_monto:0 } as Estadisticas;
    }
}