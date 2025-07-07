import Form from '@/app/ui/dashboard/departamento/edit-form';
import Breadcrumbs from '@/app/ui/dashboard/departamento/breadcrumbs';
import { getDepartamentoById } from '@/app/api/departamentos';
import { notFound } from 'next/navigation';
 
export default async function Page(props: {params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;
    const departamento = await getDepartamentoById(id);
    if (departamento){
        return (
            <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Departamento', href: '/dashboard/departamentos' },
                {
                    label: 'Editar departamento',
                    href: `/dashboard/departamentos/${id}/edit`,
                    active: true,
                },
                ]}
            />
            <Form departamento={departamento} />
            </main>
        );
    }else{
        return notFound();
    }
  
}