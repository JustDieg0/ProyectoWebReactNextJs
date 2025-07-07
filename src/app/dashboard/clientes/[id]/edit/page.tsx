import Form from '@/app/ui/dashboard/usuario/edit-form';
import Breadcrumbs from '@/app/ui/dashboard/usuario/breadcrumbs';
import { getUsuarioById } from '@/app/api/usuarios';
import { notFound } from 'next/navigation';
 
export default async function Page(props: {params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;
    const usuario = await getUsuarioById(id);
    if (usuario){
        return (
            <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Usuario', href: '/dashboard/clientes' },
                {
                    label: 'Editar usuario',
                    href: `/dashboard/clientes/${id}/edit`,
                    active: true,
                },
                ]}
            />
            <Form usuario={usuario} />
            </main>
        );
    }else{
        return notFound();
    }
  
}