'use client';

import { clsx } from 'clsx';

import type { TemaCarta } from '@/features/carta/constantes/temasCarta';

interface SelectorTemaCartaProps {
  temas: TemaCarta[];
  temaActivoId: string;
  onCambiar: (temaId: string) => void;
}

export function SelectorTemaCarta({ temas, temaActivoId, onCambiar }: SelectorTemaCartaProps) {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-xs uppercase tracking-[0.55em] text-[var(--color-texto)]/60">
          Modos de ambiente
        </h2>
      </header>
      <nav
        aria-label="Selección de tema visual"
        role="tablist"
        className="relative -mx-1 flex items-end gap-2 overflow-x-auto border-b border-[var(--color-subrayado)]/30 px-1 pb-2"
      >
        {temas.map((tema, indice) => {
          const temaNumero = indice + 1;
          const activo = tema.id === temaActivoId;
          return (
            <button
              key={tema.id}
              type="button"
              role="tab"
              id={`tema-tab-${tema.id}`}
              aria-selected={activo}
              aria-controls={`panel-tema-${tema.id}`}
              onClick={() => onCambiar(tema.id)}
              className={clsx(
                'group relative flex min-w-[140px] flex-col items-start gap-1 whitespace-nowrap px-1 pb-2 text-left transition-colors duration-200 sm:min-w-[160px]',
                'text-[0.65rem] uppercase tracking-[0.38em] font-detalle text-[var(--color-texto)]/55',
                activo
                  ? 'text-[var(--color-texto)]'
                  : 'hover:text-[var(--color-texto)]/80',
              )}
            >
              <span className="text-xs font-semibold tracking-[0.42em]">
                Tema {temaNumero.toString().padStart(2, '0')}
              </span>
              <span className="text-[0.62rem] text-[var(--color-texto)]/55 font-cuerpo">
                {tema.nombre}
              </span>
              <span
                className={clsx(
                  'pointer-events-none absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300',
                  activo
                    ? 'bg-[var(--color-destacado)] shadow-[0_0_12px_var(--color-destacado)]'
                    : 'bg-transparent group-hover:bg-[var(--color-destacado)]/60',
                )}
              />
            </button>
          );
        })}
      </nav>
    </section>
  );
}
