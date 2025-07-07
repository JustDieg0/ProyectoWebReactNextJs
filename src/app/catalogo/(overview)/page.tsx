import { fetchDepartamento } from "@/app/api/departamentos";
import Image from "next/image";
import Link from "next/link";
import GroupCardDep from "@/app/ui/catalogo/group_card_dep";

export default function Page() {

    return (
      <>
        <main className="min-h-screen px-5 md:px-20">
          <GroupCardDep/>
        </main>
        <footer className="bg-accent text-white text-center py-4">
        <p>© 2025 Catálogo de Departamentos. Todos los derechos reservados.</p>
      </footer>
      </>
    );
  }