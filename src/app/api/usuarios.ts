'use server'

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { Usuario } from './dto/definitions';

const url_base = "http://localhost:3001/";

const FormSchema = z.object({
    usuarioid: z.string().max(5, { message: 'El id es de 5 caracteres' }),
    nombres: z
        .string()
        .min(3, { message: 'Los nombres deben tener al menos 3 caracteres' })
        .max(50, { message: 'Los nombres no deben exceder los 50 caracteres' }),

    apellidos: z
        .string()
        .min(3, { message: 'Los apellidos deben tener al menos 3 caracteres' })
        .max(50, { message: 'Los apellidos no deben exceder los 50 caracteres' }),

    telefono: z
        .string()
        .regex(/^\d{9}$/, { message: 'El teléfono debe tener exactamente 9 dígitos numéricos' }),

    nacionalidad: z
        .string()
        .min(3, { message: 'La nacionalidad debe tener al menos 3 caracteres' })
        .max(50, { message: 'La nacionalidad no debe exceder los 50 caracteres' }),

    doc_ident: z
        .string()
        .min(3, { message: 'El documento de identidad debe tener al menos 3 caracteres' })
        .max(50, { message: 'El documento de identidad no debe exceder los 50 caracteres' }),

    correo: z
        .string()
        .email({ message: 'El correo debe tener un formato válido' })
        .min(3, { message: 'El correo debe tener al menos 3 caracteres' })
        .max(50, { message: 'El correo no debe exceder los 50 caracteres' }),

    contrasena: z
        .string()
        .min(3, { message: 'La contraseña debe tener al menos 3 caracteres' })
        .max(50, { message: 'La contraseña no debe exceder los 50 caracteres' }),
    activo: z.string().transform((val) => val === "1")

});

const CreateUsuario = FormSchema.omit({ usuarioid: true, activo: true });
const UpdateUsuario = FormSchema.omit({ usuarioid: true });
const PatchActivoUsuario = FormSchema.pick({ activo : true})

export type State = {
    errors?: {
        usuarioid?: string[];
        nombres?: string[];
        apellidos?: string[];
        telefono?: string[];
        nacionalidad?: string[];
        doc_ident?: string[];
        correo?: string[];
        contrasena?: string[];
    };
    message?: string | null;
};

export async function fetchUsuario(): Promise<Usuario[]> {
  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    console.error('No hay sesión activa o token');
    return [];
  }

  try {
    const response = await axios.get(url_base + "usuario", {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    const message = response.data.message;
    const data = response.data.data;

    if (Array.isArray(data)) {
      console.log(message);
      return data as Usuario[];
    } else {
      console.warn("La respuesta no es un array:", data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
}

export async function getUsuarioById(id: string): Promise<Usuario | null> {
    const session = await getServerSession(authOptions);
    if (!session || !session.token) {
        console.error('No hay sesión activa o token');
        return null;
    }

  try {
    const response = await axios.get(`${url_base}usuario/${id}`,{
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
    const message = response.data.message;
    const data = response.data.data;

    console.log(message);

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return null;
  }
}

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
        console.error("Error al obtener usuarios:", error);
        return 0;
    }
}

export async function createUsuario(prevState: State, formData: FormData): Promise<State> {
  const validationFields = CreateUsuario.safeParse({
    nombres: formData.get('nombres'),
    apellidos: formData.get('apellidos'),
    telefono: formData.get('telefono'),
    nacionalidad: formData.get('nacionalidad'),
    doc_ident: formData.get('doc_ident'),
    correo: formData.get('correo'),
    contrasena: formData.get('contrasena'),
  });
  const path : string = formData.get('path')?.toString() || "/login";

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
      message: 'Faltan campos o son inválidos. No se pudo crear el usuario',
    };
  }

  const { nombres, apellidos, telefono, nacionalidad, doc_ident, correo, contrasena } = validationFields.data;

  const session = await getServerSession(authOptions);

  if (!session?.token) {
    console.error('No hay sesión activa o token');
    return {
      message: 'No se pudo crear usuario',
    };
  }

  try {
    await axios.post(
      'http://localhost:3001/usuario',
      {
        nombres,
        apellidos,
        telefono,
        nacionalidad,
        doc_ident,
        correo,
        contrasena,
      },
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
  } catch (error) {
    console.error('Error al conectar con la API', error);
    return {
      message: 'Error al conectar con la API',
    };
  }

  revalidatePath(path);
  redirect(path);
}

export async function updateUsuario(id: string, prevState : State, formData: FormData) : Promise<State> {
  const validationFields= UpdateUsuario.safeParse({
    nombres: formData.get('nombres'),
    apellidos: formData.get('apellidos'),
    telefono: formData.get('telefono'),
    nacionalidad: formData.get('nacionalidad'),
    doc_ident: formData.get('doc_ident'),
    correo: formData.get('correo'),
    contrasena: formData.get('contrasena'),
    activo: formData.get('activo'),
  });

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
      message: 'Faltan campos o son inválidos. No se pudo crear el usuario',
    };
  }

  const { nombres, apellidos, telefono, nacionalidad, doc_ident, correo, contrasena, activo } = validationFields.data

  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    console.error('No hay sesión activa o token');
    return {
      message: 'No se pudo crear usuario',
    };
  }

  await axios.put(`http://localhost:3001/usuario/${id}`, {
    nombres,
    apellidos,
    telefono,
    nacionalidad,
    doc_ident,
    correo,
    contrasena,
    activo,
  }, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  revalidatePath('/dashboard/clientes');
  redirect('/dashboard/clientes');
}

export async function deleteUsuario(id: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    console.error('No hay sesión activa o token');
    return;
  }

  await axios.delete(`http://localhost:3001/usuario/${id}`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  revalidatePath('/dashboard/clientes');
}

export async function patchActivoUsuario(id: string, formData: FormData) {

  const validationFields = PatchActivoUsuario.safeParse({
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

  await axios.patch(`http://localhost:3001/usuario/${id}`,
    {
      activo
    }, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  revalidatePath('/dashboard/clientes');
}