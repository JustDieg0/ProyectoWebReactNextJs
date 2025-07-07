import { CheckIcon, ClockIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function DepartamentoEstado({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'ocupado',
          'bg-green-500 text-white': status === 'disponible',
          'bg-yellow-500 text-white': status === 'mantenimiento',
        },
      )}
    >
      {status === 'mantenimiento' ? (
        <>
          En Mantenimiento
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'disponible' ? (
        <>
          Disponible
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'ocupado' ? (
        <>
          Ocupado
          <NoSymbolIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
    </span>
  );
}
