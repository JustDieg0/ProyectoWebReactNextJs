import { getDepartamentoById } from '@/app/api/departamentos';
import { lusitana } from '@/app/ui/fonts';

export default async function Page(props: {
    searchParams?: Promise<{
        usuario ?: string;
        departamentoid ?: string;
        departamento ?: string;
        fecha_inicio ?: string;
        fecha_fin ?: string;
        estado ?: string;
        precio ?: string;
    }>
}) {

    const searchParams = await props.searchParams;
    const usuario = searchParams?.usuario || '';
    const departamentoid = searchParams?.departamentoid || '';
    const departamento = await getDepartamentoById(departamentoid);
    const fecha_inicio = searchParams?.fecha_inicio || '';
    const fecha_fin = searchParams?.fecha_fin || '';
    const estado = searchParams?.estado || '';
    const pago = searchParams?.precio || ''

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary px-6 py-10">
      <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-md">
        <h1 className={`${lusitana.className} text-3xl font-bold text-black mb-4`}>
          ¡Pago Exitoso!
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Su reserva ha sido confirmada correctamente. A continuación se muestran los detalles:
        </p>

        <div className="space-y-3 text-sm text-black">
          <div>
            <span className="font-semibold">Usuario:</span> {usuario}
          </div>
          <div>
            <span className="font-semibold">Departamento ID:</span> {departamentoid}
          </div>
          <div>
            <span className="font-semibold">Precio:</span> S/. {pago}
          </div>
          <div>
            <span className="font-semibold">Departamento:</span> {departamento?.nombre ||''}
          </div>
          <div>
            <span className="font-semibold">Fecha de Inicio:</span> {fecha_inicio}
          </div>
          <div>
            <span className="font-semibold">Fecha de Fin:</span> {fecha_fin}
          </div>
          <div>
            <span className="font-semibold">Estado:</span>{' '}
            <span
              className={`font-medium ${
                estado === 'confirmada' ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              {estado}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/catalogo"
            className="inline-block w-full rounded-md bg-black px-4 py-2 text-white text-center text-sm hover:bg-gray-800"
          >
            Ir al catalogo
          </a>
        </div>
      </div>
    </main>
  );
}
