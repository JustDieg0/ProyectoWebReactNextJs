'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import TomNavLogo from './tom-nav-logo';
import SideCart from './side-cart';

export default function UpNav() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    return(
        <>
        <div className='bg-primary w-full text-white px-6 py-4 flex justify-between items-center'>
            <div className='md:w-40 flex flex-row align-center'>
                <Link
                className=''
                href='/'>
                    <TomNavLogo/>
                </Link>
                <div className='flex flex-row items-end align center mx-5 gap-x-5'>
                    <Link
                    className='hover:text-accent transition-colors'
                    href="/catalogo"
                    >
                        <div>Catalogo</div>
                    </Link>
                </div>
            </div>
            <div>
                {/*}<button onClick={toggleCart} className='cursor-pointer'>
                    <ShoppingCartIcon className='w-6 hover:text-accent transition-colors'/>
                </button>{*/}
            </div>
        </div>
        <SideCart isOpen={isCartOpen} onClose={toggleCart} />
        </>
    );
}