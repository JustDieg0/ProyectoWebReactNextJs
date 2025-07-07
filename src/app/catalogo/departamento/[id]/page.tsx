import DepartamentoDetalle from "@/app/ui/departamento/departamento-detalle";

export default async function Page({children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <DepartamentoDetalle id={id}/>
    </div>
  );
}
