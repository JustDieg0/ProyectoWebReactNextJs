import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import TomLogo from '@/app/ui/tom-logo'
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
    return (
        <div className='flex h-full flex-col px-3 py-4 md:px-2'>
            <Link
                className='mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40'
                href="/"
            >
                <div className='w-32 text-white md:w-40'>
                    <TomLogo/>
                </div>
            </Link>
            <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
                <NavLinks/>
                <div className='hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-accent md:block'></div>
            <form>
                <button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-accent p-3 text-sm font-medium hover:bg-secondary hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3'>
                    <PowerIcon className='w-6'/>
                    <div className='hidden md:block'>Sign Out</div>
                </button>
            </form>
            </div>
        </div>
    );
}