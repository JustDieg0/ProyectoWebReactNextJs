import React, { useEffect, useState } from 'react';
import { fetchPagosPorPeriodo } from '@/app/api/pago';
import { ReservaPago } from '@/app/api/dto/definitions';
import { getReservaPago } from '@/app/api/reserva';
import ComboMes from './comboMes';
import ComboAnio from './comboAnio';
import ReservaPagoStats from './stats';


export default async function ReservasTable({
  mes,
  anio,
}: {
  mes : number;
  anio : number;
}) {
  const reservas : ReservaPago[] = await getReservaPago(anio,mes);
  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
      <div className="flex gap-4 mb-4 items-center">
        <ComboMes mes={mes} />
        <ComboAnio anio={anio}/>
      </div>
      <ReservaPagoStats mes={mes} anio={anio} small/>
      </div>
      <div className="rounded-lg bg-primary p-2 md:pt-0">
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Reserva Reserva Id</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Reserva Id</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Nombre</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Apellido</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Departamento id</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Fecha Pago</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Monto</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Metodo de Reserva</th>
            </tr>
          </thead>
          <tbody className="bg-secondary">
            {reservas.map((reserva, idx) => (
                <tr key={idx} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{reserva.pagoreservaid}</td>
                  <td className="whitespace-nowrap px-3 py-3">{reserva.reservaid}</td>
                  <td className="whitespace-nowrap px-3 py-3">{reserva.nombre_usuario}</td>
                  <td className="whitespace-nowrap px-3 py-3">{reserva.apellido_usuario}</td>
                  <td className="whitespace-nowrap px-3 py-3">{reserva.departamentoid}</td>
                  <td className="whitespace-nowrap px-3 py-3">{reserva.fecha_pago}</td>
                  <td className="whitespace-nowrap px-3 py-3">{reserva.monto}</td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{reserva.metodo_pago}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

