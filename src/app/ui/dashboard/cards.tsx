import {
  BanknotesIcon,
  DocumentIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCountUsuarios } from '@/app/api/usuarios';
import { fetchCountContratos } from '@/app/api/contrato';
import { fetchCountPagos } from '@/app/api/pago';
import { fetchCountReservas } from '@/app/api/reservas';

const iconMap = {
  usuarios: UserGroupIcon,
  contratos: DocumentIcon,
  pagos: BanknotesIcon,
  reservas: InboxIcon,
};

export default async function CardWrapper() {
    const numberOfUsers = await fetchCountUsuarios();
    const numberOfContract = await fetchCountContratos();
    const quantityOfSells = await fetchCountPagos();
    const numberOfReservation = await fetchCountReservas();

  return (
    <>
      <Card title="Usuarios registrados" value={numberOfUsers} type="usuarios" />
      <Card title="Contratos activos" value={numberOfContract} type="contratos" />
      <Card title="Pagos recibidos" value={`S/.${quantityOfSells}`} type="pagos" />
      <Card
        title="Total de reservas"
        value={numberOfReservation}
        type="reservas"
      /> 
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'usuarios' | 'contratos' | 'pagos' | 'reservas';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-primary p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-accent" /> : null}
        <h3 className="ml-2 text-sm font-medium text-accent">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-secondary px-4 py-8 text-center text-2xl text-accent`}
      >
        {value}
      </p>
    </div>
  );
}