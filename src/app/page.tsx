import type { Metadata } from 'next';

import { CartaInteractiva } from '@/features/carta/componentes/CartaInteractiva';
import { obtenerCarta } from '@/features/carta/servicios/obtenerCarta';

export const metadata: Metadata = {
  title: 'Nixx resto',
};

export default async function PaginaPrincipal() {
  const carta = await obtenerCarta();

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-4 py-12 sm:px-8">
      <CartaInteractiva carta={carta} />
    </main>
  );
}
