import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { ultimosPagos } from '@/app/api/pago';
import { formatToShortDate } from '@/app/lib/utils';
export default async function LatestInvoices() {
  const latestInvoices = await ultimosPagos();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Próximos pagos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-primary p-4">

        { <div className="bg-secondary px-6 border-2 rounded-2xl">
          {latestInvoices.map((pago, i) => {
            return (
              <div
                key={i}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t text-accent': i !== 0,
                  },
                )}
              >
                <div className="flex items-center w-1/4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base text-accent">
                      {pago.usuario}
                    </p>
                    <p className="hidden text-sm sm:block text-accent">
                      {pago.tipo_pago}
                    </p>
                  </div>
                </div>
                <div className={`${lusitana.className}w-1/4 text-center text-accent`}>
                  <p>{formatToShortDate(pago.fecha_pago)}</p>
                </div>
                <div className={`w-1/4 text-center text-accent`}>
                  <p>{pago.estado}</p>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base text-right text-accent w-1/6`}
                >
                  {pago.monto}
                </p>
              </div>
            );
          })}
        </div>}
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-700" />
          <h3 className="ml-2 text-sm text-gray-700 ">Actualizado justo ahora</h3>
        </div>
      </div>
    </div>
  );
}
