import { getDepartamentoById } from '@/app/api/departamentos';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  id: string;
}

export default async function DepartamentoDetalle({ id }: Props) {
  const departamento = await getDepartamentoById(id);

  if (!departamento) {
    return notFound();
  }

  return (
    <div className="px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
        {/* Imagen */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src={`http://localhost:3001/img/departamento/${departamento.departamentoid}.png`}
            alt="xd"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Detalles */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{departamento.nombre}</h1>
            <p className="text-primary text-2xl font-semibold mb-2">${departamento.precio_mensual} / mes</p>
            <p className="text-gray-600 mb-4 text-lg">{departamento.ubicacion}</p>
            <p className="text-gray-700 mb-6 text-base">{departamento.descripcion}</p>

            <ul className="mb-6 list-disc list-inside text-base text-gray-700 space-y-1">
              {/* departamento.caracteristicas.map((item, i) => (
                <li key={i}>{item}</li>
              )) */}
            </ul>
          </div>

          <Link
            href={`/reservar/${departamento.departamentoid}`}
            className="mt-6 inline-block w-full text-center px-6 py-4 bg-primary text-white text-lg font-semibold rounded-full hover:bg-secondary transition-colors"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>

  );
}
