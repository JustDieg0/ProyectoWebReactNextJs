'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function ComboMes({ mes }: { mes : number}){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const createPageURL = (aMes : number) => {
        const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
        params.set('mes', aMes.toString());
        return `${pathname}?${params.toString()}`;
  };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMes = Number(e.target.value);
    const newUrl = createPageURL(selectedMes);
    router.push(newUrl);
  };

  const meses = [
    { value: 0, label: 'Seleccione Mes' },
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' },
];

  return(
    <select
          className="rounded-lg bg-primary text-white px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={mes}
          onChange={handleChange}
        >
          {meses.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
  )
}