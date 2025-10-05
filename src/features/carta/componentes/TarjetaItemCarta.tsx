import type { ItemCarta } from '@/features/carta/interfaces/carta';
import { formatearDinero } from '@/utils/moneda';

interface TarjetaItemCartaProps {
  item: ItemCarta;
}

export function TarjetaItemCarta({ item }: TarjetaItemCartaProps) {
  const { nombre, descripcion, etiquetas, precio } = item;

  return (
    <article className="relative isolate overflow-hidden rounded-3xl border border-[var(--color-resaltado)]/35 bg-[rgba(28,8,9,0.82)] px-5 py-6">
      <div className="flex flex-col gap-4">
        <header className="flex items-start justify-between gap-3">
          <h3 className="font-cuerpo text-base font-bold uppercase tracking-[0.24em] text-[var(--color-texto)]">
            {nombre}
          </h3>
          <span className="rounded-full bg-[var(--color-destacado)]/25 px-3 py-1 text-xs font-medium text-[var(--color-texto)]">
            {formatearDinero(precio)}
          </span>
        </header>
        <p className="font-cuerpo text-sm font-semibold leading-relaxed text-[var(--color-texto)]/80">
          {descripcion}
        </p>
        {etiquetas.length > 0 && (
          <ul className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-[var(--color-texto)]/50">
            {etiquetas.map((etiqueta) => (
              <li
                key={`${item.id}-${etiqueta}`}
                className="rounded-full border border-[var(--color-destacado)]/35 px-2 py-1"
              >
                {etiqueta}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
