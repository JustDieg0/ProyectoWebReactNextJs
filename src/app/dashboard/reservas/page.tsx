import ReservassTable from "@/app/ui/dashboard/reservas/table";

export default async function Page(props: {
  searchParams?: Promise<{
    mes?: number;
    anio?: number;
  }>
}) {

  const searchParams = await props.searchParams;
  const mes = searchParams?.mes || 0;
  const anio = searchParams?.anio || 0;
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pagos de reserva por periodo</h1>
      <ReservassTable mes={mes} anio={anio}/>
    </main>
  );
}