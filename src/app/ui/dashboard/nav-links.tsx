'use client';

import {
    UserGroupIcon,
    HomeIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Home from '@/app/page';

// array con los datos de los botones de sidenav
const links = [
    { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
    { name: 'Clientes', href: '/dashboard/clientes', icon: UserGroupIcon },
    { name: 'Departamentos', href: '/dashboard/departamentos', icon: BuildingOfficeIcon },
];

export default function NavLinks(){
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                    key={link.name}
                    href={link.href}
                    className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-accent p-3 text-sm font-medium hover:bg-secondary hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3',{
                        'bg-sencondary text-primary' : pathname === link.href,
                    },
                )}
                    >
                        <LinkIcon className='w-6'/>
                        <p className='hidden md:block'>{link.name}</p>
                    </Link>
                );
            })}
        </>
    )
}