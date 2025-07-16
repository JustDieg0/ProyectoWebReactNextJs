"use client";
import React, { useEffect, useState } from 'react';
import { fetchPagosPorPeriodo } from '@/app/api/pago';

interface Pago {
  doc_ident: string;
  nombres: string;
  apellidos: string;
  fecha_inicio: string;
  fecha_fin: string;
  fecha_pago: string;
  monto: number;
  tipo_pago: string;
}



const meses = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

const PagosTable: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

//Alerta de existencia de pagos no encontrados
const handleListar = () => {
    setLoading(true);
    fetchPagosPorPeriodo(year, month)
      .then((data) => {
        setPagos(data);
        if (Array.isArray(data) && data.length === 0) {
          window.alert('No hay pagos en el periodo seleccionado.');
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="flex gap-4 mb-4 items-center">
        <select
          className="rounded-lg bg-primary text-white px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
        >
          {meses.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <select
          className="rounded-lg bg-primary text-white px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button
          className="rounded-lg bg-primary text-white px-10 py-2 font-semibold shadow hover:bg-black transition-colors border border-gray-200"
          onClick={handleListar}
        >
          Listar
        </button>
      </div>
      <div className="rounded-lg bg-primary p-2 md:pt-0">
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Doc. Identidad</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Nombres</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Apellidos</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Fecha Inicio Contrato</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Fecha Fin Contrato</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Fecha Pago</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Monto</th>
              <th scope="col" className="whitespace-nowrap py-3 pl-6 pr-3">Tipo de Pago</th>
            </tr>
          </thead>
          <tbody className="bg-secondary">
            {loading ? (
              <tr><td colSpan={8} className="text-center p-4">Cargando...</td></tr>
            ) : pagos.length === 0 ? (
              <tr><td colSpan={8} className="text-center p-4">No hay pagos en este periodo.</td></tr>
            ) : (
              pagos.map((pago, idx) => (
                <tr key={idx} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{pago.doc_ident}</td>
                  <td className="whitespace-nowrap px-3 py-3">{pago.nombres}</td>
                  <td className="whitespace-nowrap px-3 py-3">{pago.apellidos}</td>
                  <td className="whitespace-nowrap px-3 py-3">{pago.fecha_inicio}</td>
                  <td className="whitespace-nowrap px-3 py-3">{pago.fecha_fin}</td>
                  <td className="whitespace-nowrap px-3 py-3">{pago.fecha_pago}</td>
                  <td className="whitespace-nowrap px-3 py-3">{pago.monto}</td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{pago.tipo_pago}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagosTable;
