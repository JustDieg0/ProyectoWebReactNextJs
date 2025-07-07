import Form from '@/app/ui/dashboard/usuario/create-form';
import Breadcrumbs from '@/app/ui/dashboard/usuario/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Usuarios', href: '/dashboard/clientes' },
          {
            label: 'Crear Usuario',
            href: '/dashboard/usuarios/create',
            active: true,
          },
        ]}
      />
      {<Form/>}
    </main>
  );
}