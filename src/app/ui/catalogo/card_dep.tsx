import { Departamento } from "@/app/api/dto/definitions";
import Image from "next/image";
import Link from "next/link";

type Props = {
  departamento: Departamento;
};

export default function CardDep({ departamento }: Props){

    return (
        <>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <Image
                src= {`http://localhost:3001/img/departamento/${departamento.departamentoid}.png`}
                alt="hola"
                width="400"
                height="250"
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-secondary">{departamento.nombre}</h2>
                <p className="text-primary mt-2">${departamento.precio_mensual} / mes</p>
                <Link
                  href={`/catalogo/departamento/${departamento.departamentoid}`}
                  className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-full hover:bg-secondary"
                >
                  Ver Más
                </Link>
              </div>
            </div>
        </>
    );
}