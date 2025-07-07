import Table from '@/app/ui/dashboard/departamento/table';
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { CreateDepartamento } from '@/app/ui/dashboard/departamento/buttons';

export default async function Page() {
    return(
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-4xl text-accent dark:text-secondary`}>Departamentos</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <CreateDepartamento />
        </div>
        <Suspense fallback={<InvoicesTableSkeleton />}>
            <Table/>
        </Suspense>
        </div>
    );
  }