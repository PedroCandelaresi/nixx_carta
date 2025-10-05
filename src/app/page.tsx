import type { Metadata } from 'next';

import { CartaInteractiva } from '@/features/carta/componentes/CartaInteractiva';
import { obtenerCarta } from '@/features/carta/servicios/obtenerCarta';

export const metadata: Metadata = {
  title: 'Nixx resto',
};

export default async function PaginaPrincipal() {
  const carta = await obtenerCarta();

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 pb-6 pt-10 sm:px-8 sm:pt-12">
      <CartaInteractiva carta={carta} />
      <footer className="mt-auto flex w-full justify-center">
        <a
          href="https://intech.nqn.net.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="font-cuerpo text-[0.52rem] uppercase tracking-[0.3em] text-[var(--color-texto)]/18 transition-colors duration-300 hover:text-[var(--color-destacado)]/48"
        >
          Powered by Intech.NQN®
        </a>
      </footer>
    </main>
  );
}
