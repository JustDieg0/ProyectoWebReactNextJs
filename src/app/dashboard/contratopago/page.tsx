"use client";
import { useState } from "react";
import { lusitana } from '@/app/ui/fonts';
import ContratoTable from '@/app/ui/dashboard/contratopago/tablecontrato';
import ComboBox from '@/app/ui/dashboard/contratopago/combobox';

export default function Page() {
  const [tipoPago, setTipoPago] = useState("");

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-4xl text-accent dark:text-secondary`}>Contrato por Tipo de Pago</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <ComboBox value={tipoPago} onChange={setTipoPago} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <ContratoTable tipoPago={tipoPago} />
      </div>
    </div>
  );
}