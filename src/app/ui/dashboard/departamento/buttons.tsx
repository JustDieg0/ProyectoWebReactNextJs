import { PencilIcon, PlusIcon, TrashIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteDepartamento, patchActivoDepartamento } from '@/app/api/departamentos';

export function CreateDepartamento() {
  return (
    <Link
      href="/dashboard/departamentos/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Departamento</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateDepartamento({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/departamentos/${id}/edit`}
      className="rounded-md border p-2 hover:bg-amber-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteDepartamento({ id }: { id: string }) {
  const deleteDepartamentoWithId = deleteDepartamento.bind(null, id);
  return (
    <>
    <form action={deleteDepartamentoWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-amber-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
    </>
  );
}

export function SwitchActivateDepartamento({ id, value } : { id: string, value: number }) {
  var newValue = 0
  if (value != 1){
    newValue = 1
  }
  const  patchActivoDepartamentoWithId = patchActivoDepartamento.bind(null, id);
  
  return(
    <>
      <form action={patchActivoDepartamentoWithId}>
        <input type='hidden' name='activo' value={newValue}/>
        <button type="submit" className="rounded-md border p-2 hover:bg-amber-100">
        <span className="sr-only">Switch</span>
        <ArrowsRightLeftIcon className="w-5" />
      </button>
      </form>
    </>
  );
}