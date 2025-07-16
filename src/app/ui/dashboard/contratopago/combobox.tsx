"use client";
import React from 'react';

export default function ComboBox({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="tipoPago" className="text-lg font-medium">Tipo de pago:</label>
      <select
        id="tipoPago"
        name="tipoPago"
        className="rounded border px-3 py-2"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">Seleccione...</option>
        <option value="pendiente">Pendiente</option>
        <option value="atrasado">Atrasado</option>
        <option value="pagado">Pagado</option>
      </select>
    </div>
  );
}