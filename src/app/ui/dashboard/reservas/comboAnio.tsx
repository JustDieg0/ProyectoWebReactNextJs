'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function ComboAnio({ anio }: { anio : number}){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const createPageURL = (aAnio : number) => {
        const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
        params.set('anio', aAnio.toString());
        return `${pathname}?${params.toString()}`;
  };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMes = Number(e.target.value);
    const newUrl = createPageURL(selectedMes);
    router.push(newUrl);
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return(
    <select
          className="rounded-lg bg-primary text-white px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={anio}
          onChange={handleChange}
        >
            <option key={0} value={0}>Seleccione año</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
  )
}