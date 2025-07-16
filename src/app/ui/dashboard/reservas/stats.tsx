// src/app/ui/dashboard/reservas/ReservaPagoStats.tsx
import { getReservaPagoStats } from '@/app/api/reserva'; // ajusta la ruta según tu estructura

type Props = {
  anio: number;
  mes: number;
  small?: boolean;
};

export default async function ReservaPagoStats({ anio, mes, small=false }: Props) {
  const stats = await getReservaPagoStats(anio, mes);

  const cardClasses = small
    ? 'w-[140px] p-2 text-sm'
    : ' p-4 text-base';
    
    var val_max = 0
    var val_min = 0
    var val_avg = 0

    if(stats.max_monto){
        val_max = stats.max_monto;
        val_min = stats.min_monto;
        val_avg = stats.promedio_monto;
    }

  const cards = [
    { title: 'Monto Máximo', value: val_max, color: 'bg-green-500' },
    { title: 'Monto Mínimo', value: val_min, color: 'bg-red-500' },
    { title: 'Monto Promedio', value: val_avg, color: 'bg-blue-500' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`flex-row flex-nowrap p-4 rounded-lg text-white shadow-md ${card.color} ${cardClasses}`}
        >
          <h3 className="text-md font-semibold">{card.title}</h3>
          <p className="text-2xl font-bold mt-2">S/ {card.value.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
