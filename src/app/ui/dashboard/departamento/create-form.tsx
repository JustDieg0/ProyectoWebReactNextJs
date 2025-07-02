'use client'

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  HomeIcon,
  UserGroupIcon,
  MapPinIcon,
  NoSymbolIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createDepartamento, State } from '@/app/api/departamentos';
import { useActionState } from 'react';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createDepartamento, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-primary p-4 md:p-6">
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="mb-2 block font-medium text-base text-accent">
            Coloca un nombre
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="nombre"
                name="nombre"
                type="text"
                step="0.01"
                placeholder="Ingresa un nombre"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="nombre-error"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="nombre-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nombre &&
              state.errors.nombre.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>
        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="mb-2 block font-medium text-base text-accent">
            Coloca una descripción
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="descripcion"
                name="descripcion"
                type="text"
                step="0.01"
                placeholder="Ingresa una descripción"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="descripcion-error"
                required
             />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="descripcion-error" aria-live="polite" aria-atomic="true">
            {state.errors?.descripcion &&
              state.errors.descripcion.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Tipo */}
        <fieldset className='mb-4'>
          <legend className="mb-2 block font-medium text-base text-accent">
            Ingresa el tipo de departamento
          </legend>
          <div className="rounded-md border border-accent bg-secondary px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="departamento"
                  name="tipo"
                  type="radio"
                  value="departamento"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="tipo-error"
                  required
                />
                <label
                  htmlFor="departamento"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Departamento <BuildingOffice2Icon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="minidepartamento"
                  name="tipo"
                  type="radio"
                  value="minidepartamento"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="tipo-error"
                  required
                />
                <label
                  htmlFor="minidepartamento"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Minidepartamento <BuildingOfficeIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="cuarto"
                  name="tipo"
                  type="radio"
                  value="cuarto"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="tipo-error"
                  required
                />
                <label
                  htmlFor="cuarto"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Cuarto <HomeIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
            <div id="tipo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tipo &&
              state.errors.tipo.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          </div>
        </fieldset>
        {/* Precio mensual */}
        <div className="mb-4">
          <label htmlFor="precio_mensual" className="mb-2 block font-medium text-base text-accent">
            Coloca un precio al departamento
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="precio_mensual"
                name="precio_mensual"
                type="number"
                step="0.01"
                placeholder="Ingresa monto"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="precio_mensual-error"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="precio_mensual-error" aria-live="polite" aria-atomic="true">
            {state.errors?.precio_mensual &&
              state.errors.precio_mensual.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Estado */}
        <fieldset className='mb-4'>
          <legend className="mb-2 block font-medium text-base text-accent">
            Ingresa el estado del departamento
          </legend>
          <div className="rounded-md border border-accent bg-secondary px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="disponible"
                  name="estado"
                  type="radio"
                  value="disponible"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="estado-error"
                  required
                />
                <label
                  htmlFor="disponible"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Disponible <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="ocupado"
                  name="estado"
                  type="radio"
                  value="ocupado"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="estado-error"
                  required
                />
                <label
                  htmlFor="ocupado"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Ocupado <NoSymbolIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="mantenimiento"
                  name="estado"
                  type="radio"
                  value="mantenimiento"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="estado-error"
                  required
                />
                <label
                  htmlFor="mantenimiento"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Mantenimiento <ClockIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
            <div id="estado-error" aria-live="polite" aria-atomic="true">
            {state.errors?.estado &&
              state.errors.estado.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          </div>
        </fieldset>
        {/* Aforo */}
        <div className="mb-4">
          <label htmlFor="aforo" className="mb-2 block font-medium text-base text-accent">
            Coloca el aforo del departamento
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="aforo"
                name="aforo"
                type="number"
                step="0.01"
                placeholder="Ingresa aforo"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="aforo-error"
                required
              />
              <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="aforo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.aforo &&
              state.errors.aforo.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Ubicación */}
        <div className="mb-4">
          <label htmlFor="ubicacion" className="mb-2 block font-medium text-base text-accent">
            Coloca la ubicacion del departamento
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="ubicacion"
                name="ubicacion"
                type="text"
                step="0.01"
                placeholder="Ingresa la ubicación"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="ubicacion-error"
                required
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="ubicacion-error" aria-live="polite" aria-atomic="true">
            {state.errors?.ubicacion &&
              state.errors.ubicacion.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Activo para el edit*/}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/departamentos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Crear Departamento</Button>
      </div>
    </form>
  );
}
