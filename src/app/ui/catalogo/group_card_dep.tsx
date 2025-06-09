import { fetchDepartamento } from '../../api/departamentos';
import CardDep from './card_dep';

export default async function GroupCardDep(){
    const departments = await fetchDepartamento();

    return(
        <>
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept,i) => (
            <CardDep key={i} departamento={dept}/>
        ))}
        </div>
        </>
    );
}