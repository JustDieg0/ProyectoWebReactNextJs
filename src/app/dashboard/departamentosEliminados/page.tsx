
import { lusitana } from '@/app/ui/fonts';
import  DepartamentosEliminadosTable from '@/app/ui/dashboard/departamentosEliminados/tableEliminados';

export default async function Page() {
    return(
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-4xl text-accent dark:text-secondary`}>Departamentos Eliminados</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <DepartamentosEliminadosTable />
        </div>
        </div>
    );
  }