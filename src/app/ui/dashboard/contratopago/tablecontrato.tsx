"use client";
import { useEffect, useState } from "react";
import { contratoPago } from '@/app/api/contrato';

export default function ContratoTable({ tipoPago }: { tipoPago: string }) {
  const [contratos, setContratos] = useState<any[]>([]);

  useEffect(() => {
    contratoPago().then(data => setContratos(data));
  }, []);

  const contratosFiltrados = tipoPago
    ? contratos.filter(c => c.tipo_pago === tipoPago)
    : contratos;

  return (
    <div className="mt-6 w-full">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-primary p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Pago Id
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Contrato Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha de Inicio
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha de Fin
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Monto de Pago
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tipo de Pago
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Metodo de Pago
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary">
              {contratosFiltrados?.map((contrato) => (
                <tr
                  key={contrato.pagoid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{contrato.pagoid}</p>
                    </div>
                  </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{contrato.contratoid}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{contrato.fecha_inicio}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contrato.fecha_fin}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contrato.estado}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contrato.monto_pago}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contrato.tipo_pago}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contrato.metodo_pago}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
