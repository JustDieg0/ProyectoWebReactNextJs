import { HomeModernIcon } from "@heroicons/react/24/outline";
import { lusitana } from '@/app/ui/fonts';

export default function TomLogo() {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
        >
            <HomeModernIcon className="h-8 w-8" />
            <p className="text-[24px]">Tomy's</p>
        </div>
    );
}