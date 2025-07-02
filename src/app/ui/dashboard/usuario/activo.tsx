import { CheckIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function UsuarioActivo({ activo }: { activo: number }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': activo === 0,
          'bg-green-500 text-white': activo === 1,
        },
      )}
    >
      {activo === 1 ? (
        <>
          Activo
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {activo === 0 ? (
        <>
          Desactivado
          <NoSymbolIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
    </span>
  );
}