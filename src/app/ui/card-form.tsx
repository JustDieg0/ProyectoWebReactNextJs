'use client';

import { useActionState } from 'react';
import { createReserva, createReservaPago, State } from '@/app/api/reserva';
import { CreditCardIcon, CalendarIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { lusitana } from '@/app/ui/fonts';
import { getDepartamentoById } from '../api/departamentos';

export function CreditCardForm({ departamentoid, precio }: { departamentoid: string, precio: number }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReservaPago, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-secondary px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-black`}>
          Ingrese los datos de su tarjeta
        </h1>

        <div className="w-full">
          {/* Número de tarjeta */}
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="numero">
            Número de Tarjeta
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
              id="numero"
              type="text"
              name="numero"
              placeholder="Ej. 4111111111111111"
              required
            />
            <CreditCardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          {state.errors?.numero?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
          ))}

          {/* Nombre del titular */}
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="nombre_titular">
            Nombre del Titular
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
              id="nombre_titular"
              type="text"
              name="nombre_titular"
              placeholder="Ej. Juan Pérez"
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          {state.errors?.nombre_titular?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
          ))}

          {/* Vencimiento */}
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="vencimiento">
            Vencimiento (MM/AA)
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
              id="vencimiento"
              type="text"
              name="vencimiento"
              placeholder="Ej. 08/26"
              required
            />
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          {state.errors?.vencimiento?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
          ))}

          {/* CVV */}
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="cvv">
            CVV
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
              id="cvv"
              type="text"
              name="cvv"
              placeholder="Ej. 123"
              required
            />
            <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          {state.errors?.cvv?.map((error) => (
            <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
          ))}

          {/* Campo oculto con ID del departamento */}
          <input type="hidden" name="departamentoid" value={departamentoid} />
          <input type="hidden" name="depprecio" value={precio} />

          {/* Botón */}
          <Button className="mt-6 w-full">
            Confirmar Reserva
          </Button>

          {/* Mensaje general */}
          {state.message && (
            <p className="mt-4 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
