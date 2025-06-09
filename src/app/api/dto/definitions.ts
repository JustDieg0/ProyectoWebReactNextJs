export type Usuario = {
    id: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    nacionalidad: string;
    doc_ident: string;
    correo: string;
    contraseña: string;
};

export type Departamento = {
    departamentoid: string;
    nombre: string;
    descripcion: string;
    tipo: 'departamento' | 'minidepartamento' | 'cuarto';
    precio_mensual: number;
    estado: 'libre' | 'ocupado' | 'mantenimiento';
    aforo: number;
    ubicacion: string;
    activo: 0|1;
};