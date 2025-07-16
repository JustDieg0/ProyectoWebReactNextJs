import PagosTable from "@/app/ui/dashboard/pago/table";

export default function Page() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pagos por periodo</h1>
      <PagosTable />
    </main>
  );
}
