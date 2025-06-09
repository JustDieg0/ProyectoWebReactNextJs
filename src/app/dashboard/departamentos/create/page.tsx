import Form from '@/app/ui/dashboard/departamento/create-form';
import Breadcrumbs from '@/app/ui/dashboard/departamento/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Departamentos', href: '/dashboard/departamentos' },
          {
            label: 'Crear Departamento',
            href: '/dashboard/departamentos/create',
            active: true,
          },
        ]}
      />
      {<Form/>}
    </main>
  );
}