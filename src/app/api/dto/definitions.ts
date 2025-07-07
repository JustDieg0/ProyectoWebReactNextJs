export type Usuario = {
    usuarioid: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    nacionalidad: string;
    doc_ident: string;
    correo: string;
    contrasena: string;
    activo: 0|1;
};

export type Departamento = {
    departamentoid: string;
    nombre: string;
    descripcion: string;
    tipo: 'departamento' | 'minidepartamento' | 'cuarto';
    precio_mensual: number;
    estado: 'disponible' | 'ocupado' | 'mantenimiento';
    aforo: number;
    ubicacion: string;
    activo: 0|1;
};

export type GraficoVentas = {
    mes: string;
    ganancia: number;
}

export type UltimosPagos = {
    monto: number;
    usuario: string;
    tipo_pago: string;
    fecha_pago: string;
    estado: string;
}