import { UpdateUsuario, DeleteUsuario, SwitchActivateUsuario } from '@/app/ui/dashboard/usuario/buttons';
import { fetchUsuario } from '@/app/api/usuarios';
import UsuarioActivo from './activo';

export default async function UsuariosTable() {
  const usuarios = await fetchUsuario();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-primary p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {usuarios?.map((usuario) => (
              <div
                key={usuario.usuarioid}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{usuario.nombres} {usuario.apellidos}</p>
                    </div>
                    <p className="text-sm text-gray-500">{usuario.correo}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm">Tel: {usuario.telefono}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateUsuario id={usuario.usuarioid} />
                    <DeleteUsuario id={usuario.usuarioid} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">ID</th>
                <th scope="col" className="px-3 py-5 font-medium">Nombres</th>
                <th scope="col" className="px-3 py-5 font-medium">Apellidos</th>
                <th scope="col" className="px-3 py-5 font-medium">Correo</th>
                <th scope="col" className="px-3 py-5 font-medium">Teléfono</th>
                <th scope="col" className="px-3 py-5 font-medium">Nacionalidad</th>
                <th scope="col" className="px-3 py-5 font-medium">Doc. Identidad</th>
                <th scope="col" className="px-3 py-5 font-medium">Activo</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary">
              {usuarios?.map((usuario) => (
                <tr
                  key={usuario.usuarioid}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{usuario.usuarioid}</td>
                  <td className="whitespace-nowrap px-3 py-3">{usuario.nombres}</td>
                  <td className="whitespace-nowrap px-3 py-3">{usuario.apellidos}</td>
                  <td className="whitespace-nowrap px-3 py-3">{usuario.correo}</td>
                  <td className="whitespace-nowrap px-3 py-3">{usuario.telefono}</td>
                  <td className="whitespace-nowrap px-3 py-3">{usuario.nacionalidad}</td>
                  <td className="whitespace-nowrap px-3 py-3">{usuario.doc_ident}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <UsuarioActivo activo={usuario.activo} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateUsuario id={usuario.usuarioid} />
                      <DeleteUsuario id={usuario.usuarioid} />
                      <SwitchActivateUsuario id={usuario.usuarioid} value={usuario.activo}/>
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
