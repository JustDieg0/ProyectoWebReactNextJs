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
import { updateUsuario, State } from '@/app/api/usuarios';
import { Usuario } from '@/app/api/dto/definitions';
import { useActionState } from 'react';

export default function EditUsuarioForm({ usuario } : { usuario:Usuario; }) {
    const updateUsuarioId = updateUsuario.bind(null, usuario.usuarioid);
    const initialState: State = { message: null, errors: {} };
      const [state, formAction] = useActionState(updateUsuarioId, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-primary p-4 md:p-6">
        {/* Nombres */}
        <div className="mb-4">
          <label htmlFor="nombres" className="mb-2 block font-medium text-base text-accent">
            Coloca un nombres
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="nombres"
                name="nombres"
                type="text"
                step="0.01"
                placeholder="Ingresa un nombres"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="nombres-error"
                defaultValue={usuario.nombres}
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="nombres-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nombres &&
              state.errors.nombres.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

        </div>
        {/* Apellidos */}
        <div className="mb-4">
          <label htmlFor="apellidos" className="mb-2 block font-medium text-base text-accent">
            Coloca una apellidos
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                step="0.01"
                placeholder="Ingresa una apellidos"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="apellidos-error"
                defaultValue={usuario.apellidos}
                required
             />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="apellidos-error" aria-live="polite" aria-atomic="true">
            {state.errors?.apellidos &&
              state.errors.apellidos.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Telefono */}
        <div className="mb-4">
          <label htmlFor="telefono" className="mb-2 block font-medium text-base text-accent">
            Coloca un telefono
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="telefono"
                name="telefono"
                type="text"
                step="0.01"
                placeholder="Ingresa una telefono"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="telefono-error"
                defaultValue={usuario.telefono}
                required
             />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="telefono-error" aria-live="polite" aria-atomic="true">
            {state.errors?.apellidos &&
              state.errors.apellidos.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Nacionalidad */}
        <div className="mb-4">
          <label htmlFor="nacionalidad" className="mb-2 block font-medium text-base text-accent">
            Coloca una nacionalidad
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="nacionalidad"
                name="nacionalidad"
                type="text"
                placeholder="Ingresa monto"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="nacionalidad-error"
                defaultValue={usuario.nacionalidad}
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="nacionalidad-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nacionalidad &&
              state.errors.nacionalidad.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Documento de identidad */}
        <div className="mb-4">
          <label htmlFor="doc_ident" className="mb-2 block font-medium text-base text-accent">
            Coloca el documento de identidad del usuario
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="doc_ident"
                name="doc_ident"
                type="text"
                placeholder="Ingresa doc_ident"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="doc_ident-error"
                defaultValue={usuario.doc_ident}
                required
              />
              <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="doc_ident-error" aria-live="polite" aria-atomic="true">
            {state.errors?.doc_ident &&
              state.errors.doc_ident.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Correo */}
        <div className="mb-4">
          <label htmlFor="correo" className="mb-2 block font-medium text-base text-accent">
            Coloca el correo del usuario
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="correo"
                name="correo"
                type="text"
                step="0.01"
                placeholder="Ingresa la ubicación"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="correo-error"
                defaultValue={usuario.correo}
                required
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="correo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.correo &&
              state.errors.correo.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Contraseña */}
        <div className="mb-4">
          <label htmlFor="contrasena" className="mb-2 block font-medium text-base text-accent">
            Coloca la contrasena del usuario
          </label>
          <div className="relative mt-2 rounded-md text-accent font-medium">
            <div className="relative">
              <input
                id="contrasena"
                name="contrasena"
                type="text"
                step="0.01"
                placeholder="Ingresa la ubicación"
                className="peer block w-full rounded-md border text-base bg-secondary border-accent py-2 pl-10 outline-2 placeholder:text-accent-light focus:outline-accent-light focus:-outline-offset-1 focus:outline-3"
                aria-describedby="contrasena-error"
                defaultValue={usuario.contrasena}
                required
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent-light peer-focus:text-accent" />
            </div>
          </div>
          <div id="contrasena-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contrasena &&
              state.errors.contrasena.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Activo para el edit*/}
        <fieldset className='mb-4'>
          <legend className="mb-2 block font-medium text-base text-accent">
            Ingresa la actividad del usuario
          </legend>
          <div className="rounded-md border border-accent bg-secondary px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="1"
                  name="activo"
                  type="radio"
                  value="1"
                  defaultChecked={usuario.activo === 1}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
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
                  id="0"
                  name="activo"
                  type="radio"
                  value="0"
                  defaultChecked={usuario.activo === 0}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="ocupado"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Ocupado <NoSymbolIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/usuarios"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar Usuario</Button>
      </div>
    </form>
  );
}
