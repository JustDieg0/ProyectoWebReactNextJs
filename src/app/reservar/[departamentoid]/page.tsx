import { getDepartamentoById } from '@/app/api/departamentos';
import { CreditCardForm } from '@/app/ui/card-form';

export default async function Page({children, params }: { children: React.ReactNode; params: Promise<{ departamentoid: string }> }) {
  const { departamentoid } = await params;
  const dep = await getDepartamentoById(departamentoid);
  var precio_m = 1000

  if(dep){
    precio_m = dep.precio_mensual/2;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <section className="w-full max-w-md">
        <CreditCardForm departamentoid={departamentoid} precio={precio_m} />
      </section>
    </main>
  );
}
