import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
      <>
        <main className="min-h-screen px-5 md:px-20">
          <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(5)].map((_,i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <Image
                src= "/next.svg"
                alt="hola"
                width="400"
                height="250"
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-secondary">Departamento en Miraflores</h2>
                <p className="text-primary mt-2">$850 / mes</p>
                <Link
                  href="/catalogo/departamento"
                  className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-full hover:bg-secondary"
                >
                  Reservar
                </Link>
              </div>
            </div>
            ))}
          </div>
        </main>
        <footer className="bg-accent text-white text-center py-4">
        <p>© 2025 Catálogo de Departamentos. Todos los derechos reservados.</p>
      </footer>
      </>
    );
  }