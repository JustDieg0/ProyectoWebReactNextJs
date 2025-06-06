// components/side-cart.tsx
'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideCart({ isOpen, onClose }: SideCartProps) {
  return (
    <>
      <div
        className={clsx(
          'fixed top-2 right-2 h-[calc(100%-1rem)] w-80 bg-background/80 backdrop-blur-xl shadow-lg z-50 rounded-2xl transform transition-transform duration-300',
          {
            'translate-x-0': isOpen,
            'translate-x-[calc(100%+0.5rem)]': !isOpen,
          }
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Carrito de compras</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="p-4">
          {/* Aquí van los productos del carrito */}
          <p>Tu carrito está vacío.</p>
        </div>
      </div>

      {/* Fondo oscuro detrás del carrito */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </>
  );
}

