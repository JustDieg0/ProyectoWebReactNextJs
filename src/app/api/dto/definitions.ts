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
    id: string;
    tipo: 'departamento' | 'minidepartamento' | 'cuarto';
    precio_mensual: number;
    estado: 'libre' | 'ocupado' | 'mantenimiento';
    afoto: number;
    ubicacion: string;
};