'use client';

import type { CartaDigital } from '@/features/carta/interfaces/carta';
import { VistaCarta } from '@/features/carta/componentes/VistaCarta';

interface CartaInteractivaProps {
  carta: CartaDigital;
}

export function CartaInteractiva({ carta }: CartaInteractivaProps) {
  return (
    <section role="presentation" className="flex flex-col">
      <VistaCarta carta={carta} />
    </section>
  );
}
