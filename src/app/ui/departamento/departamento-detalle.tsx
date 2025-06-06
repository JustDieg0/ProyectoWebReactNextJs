'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function DepartamentoDetalle() {
  const departamento = {
    id: 1,
    nombre: 'Departamento Moderno en Miraflores',
    precio: 1200,
    ubicacion: 'Miraflores, Lima',
    descripcion:
      'Amplio departamento de 2 dormitorios, totalmente amoblado, con excelente iluminación natural y a pocos pasos del malecón.',
    imagen:
      '/next.svg',
    caracteristicas: ['2 Dormitorios', '1 Baño', 'Cocina equipada', 'Wi-Fi', 'Balcón con vista'],
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="relative w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-md">
          <Image
            src={departamento.imagen}
            alt={departamento.nombre}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        {/* Detalles */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{departamento.nombre}</h1>
            <p className="text-primary text-lg font-semibold mb-1">${departamento.precio} / mes</p>
            <p className="text-gray-600 mb-4">{departamento.ubicacion}</p>

            <p className="text-gray-700 mb-4">{departamento.descripcion}</p>

            <ul className="mb-4 list-disc list-inside text-sm text-gray-700 space-y-1">
              {departamento.caracteristicas.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Botón Reservar */}
          <Link
            href={`/reservar/${departamento.id}`}
            className="mt-6 inline-block w-full text-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-secondary transition-colors"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
