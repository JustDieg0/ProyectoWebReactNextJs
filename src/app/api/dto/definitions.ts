import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

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

export type Reserva = {
    reservaid: string;
    usuarioid: string;
    departamentoid: string;
    fecha_reserva: Timestamp;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado: 'pendiente'|'confirmada'|'cancelada'|'vencida';
}

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

export type ContratoPago = {
      pagoid: string
      contratoid: string,
      administradorid: string,
      usuarioid: string,
      departamentoid: string,
      garantiaid: string,
      fecha_inicio: string,
      fecha_fin: string,
      estado: string,
      monto_contrato: number,
      monto_pago: number,
      tipo_pago: string,
      metodo_pago: string;
}

export type ReservaPago = {
    pagoreservaid: string;
    reservaid: string;
    nombre_usuario: string;
    apellido_usuario: string;
    departamentoid: string;
    fecha_pago: string;
    monto: number;
    metodo_pago: 'yape' | 'tansferencia' | 'efectivo' | 'paypal' |'mercado pago';
}

export type Estadisticas = {
    max_monto: number;
    min_monto: number;
    promedio_monto: number;
}