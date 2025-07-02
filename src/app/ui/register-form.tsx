'use client';
import { lusitana } from '@/app/ui/fonts';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react'
import { useActionState } from 'react';
import { createUsuario, State } from '@/app/api/usuarios'


export default function RegisterForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction ] = useActionState(createUsuario, initialState);

    return (
        <form action={formAction} className="space-y-3">
            <div className="flex-1 rounded-lg bg-secondary px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl text-black`}>
                    Por favor Registrese
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="nombres"
                        >
                            Nombre
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                id="nombres"
                                type="text"
                                name="nombres"
                                placeholder="Ingrese su nombre"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="apellidos"
                        >
                            Apellidos
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                id="apellidos"
                                type="text"
                                name="apellidos"
                                placeholder="Ingrese su apellido"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="telefono"
                        >
                            Telefono
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                id="telefono"
                                type="text"
                                name="telefono"
                                placeholder="Ingrese su telefono"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div id="telefono-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.telefono &&
                            state.errors.telefono.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="nacionalidad"
                        >
                            Nacionalidad
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                id="nacionalidad"
                                type="text"
                                name="nacionalidad"
                                placeholder="Ingrese su nacionalidad"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="doc_ident"
                        >
                            Documento de Identidad
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                id="doc_ident"
                                type="text"
                                name="doc_ident"
                                placeholder="Ingrese su documento de identidad"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="correo"
                        >
                            Correo
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                id="correo"
                                type="email"
                                name="correo"
                                placeholder="Ingrese su correo"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                id="password"
                                type="password"
                                name="contrasena"
                                placeholder="Ingresa tu contraseña"
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                    <input type="hidden" name="path" value="/login" />
                    <Button className="mt-4 w-full">
                    Registrese <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                    </Button>
                </div>
            </div>
        </form>
    );
}
