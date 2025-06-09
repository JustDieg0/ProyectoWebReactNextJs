import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import UpNav from './ui/up-nav';
import { fetchDepartamento } from './api/departamentos';

export default async function Home() {


  const departments = await fetchDepartamento();
  return (
    <div className="min-h-screen flex flex-col text-secondary">
      <UpNav/>
      <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept,i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <Image
              src="./next.svg"
              alt={dept.estado}
              width={400}
              height={250}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-secondary">{dept.tipo}</h2>
              <p className="text-primary mt-2">{dept.precio_mensual}</p>
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-secondary"
              >
                Reservar
              </button>
            </div>
          </div>
        ))}
        <Link 
        href="/dashboard"
        className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'>
          <span>Login</span>
        </Link>
        <Link 
        href="/catalogo"
        className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'>
          <span>Catalogo</span>
        </Link>
      </main>

      <footer className="bg-accent text-white text-center py-4">
        <p>© 2025 Catálogo de Departamentos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

