import { UpdateDepartamento, DeleteDepartamento, SwitchActivateDepartamento } from '@/app/ui/dashboard/departamento/buttons';
import { AdminDepartamentosEliminados } from '@/app/api/departamentos';

export default async function DepartamentosEliminadosTable() {
  const departamentos = await AdminDepartamentosEliminados();
  
  return (
    <div className="mt-6 w-full">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-primary p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tipo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Precio mensual
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Aforo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ubicación
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Activo
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary">
              {departamentos?.map((departamento) => (
                <tr
                  key={departamento.departamentoid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{departamento.departamentoid}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{departamento.nombre}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {departamento.tipo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {departamento.precio_mensual}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {departamento.estado}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {departamento.aforo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {departamento.ubicacion}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {departamento.activo}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateDepartamento id={departamento.departamentoid} />
                      <DeleteDepartamento id={departamento.departamentoid} />
                      <SwitchActivateDepartamento id={departamento.departamentoid} value={departamento.activo}/> 
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
