import { PencilIcon, PlusIcon, TrashIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteUsuario, patchActivoUsuario } from '@/app/api/usuarios';

export function CreateUsuario() {
  return (
    <Link
      href="/dashboard/clientes/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Usuario</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateUsuario({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/clientes/${id}/edit`}
      className="rounded-md border p-2 hover:bg-amber-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteUsuario({ id }: { id: string }) {
  const deleteUsuarioWithId = deleteUsuario.bind(null, id);
  return (
    <>
    <form action={deleteUsuarioWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-amber-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
    </>
  );
}

export function SwitchActivateUsuario({ id, value } : { id: string, value: number }) {
  var newValue = 0
  if (value != 1){
    newValue = 1
  }
  const  patchActivoUsuarioWithId = patchActivoUsuario.bind(null, id);
  
  return(
    <>
      <form action={patchActivoUsuarioWithId}>
        <input type='hidden' name='activo' value={newValue}/>
        <button type="submit" className="rounded-md border p-2 hover:bg-amber-100">
        <span className="sr-only">Switch</span>
        <ArrowsRightLeftIcon className="w-5" />
      </button>
      </form>
    </>
  );
}