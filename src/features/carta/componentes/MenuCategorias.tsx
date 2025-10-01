'use client';

import type { CategoriaCarta } from '@/features/carta/interfaces/carta';

interface MenuCategoriasProps {
  categorias: CategoriaCarta[];
  categoriaActiva: string;
  onSeleccionar: (categoriaId: string) => void;
  orientacion?: 'horizontal' | 'vertical';
}

export function MenuCategorias({
  categorias,
  categoriaActiva,
  onSeleccionar,
  orientacion = 'horizontal',
}: MenuCategoriasProps) {
  const esVertical = orientacion === 'vertical';

  if (esVertical) {
    return (
      <nav aria-label="Categorías de la carta" className="flex flex-col gap-3">
        {categorias.map((categoria) => {
          const activa = categoria.id === categoriaActiva;
          return (
            <button
              key={categoria.id}
              type="button"
              onClick={() => onSeleccionar(categoria.id)}
              aria-pressed={activa}
              className={`flex w-full flex-col items-start gap-1 rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                activa
                  ? 'border-[var(--color-destacado)] bg-[var(--color-destacado)]/15 text-[var(--color-texto)]'
                  : 'border-[var(--color-subrayado)]/35 text-[var(--color-texto)]/70 hover:border-[var(--color-destacado)]/35'
              }`}
            >
              <span className="font-cuerpo text-base font-semibold uppercase tracking-[0.16em] text-[var(--color-texto)]">
                {categoria.nombre}
              </span>
              <span className="font-cuerpo text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-texto)]/55">
                {categoria.items.length.toString().padStart(2, '0')} opciones
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Categorías de la carta" className="relative">
      <div className="flex items-end justify-start gap-6 overflow-x-auto pb-4">
        {categorias.map((categoria) => {
          const activa = categoria.id === categoriaActiva;
          return (
            <button
              key={categoria.id}
              type="button"
              onClick={() => onSeleccionar(categoria.id)}
              aria-pressed={activa}
              className="group flex flex-col items-start gap-2 whitespace-nowrap"
            >
              <span
                className={`font-cuerpo text-lg font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                  activa ? 'text-[var(--color-destacado)]' : 'text-[var(--color-subrayado)]'
                }`}
              >
                {categoria.nombre}
              </span>
              <span className="flex items-center gap-3">
                <span
                  className={`h-[2px] w-16 transition-all duration-300 ${
                    activa ? 'bg-[var(--color-destacado)] w-24' : 'bg-[var(--color-subrayado)]'
                  }`}
                />
                <span className="font-cuerpo text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-texto)]/60">
                  {categoria.items.length.toString().padStart(2, '0')}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-resaltado)]/30" aria-hidden="true" />
    </nav>
  );
}
