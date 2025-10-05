'use client';

import { useMemo, useState } from 'react';

import { clsx } from 'clsx';

import type { CartaDigital } from '@/features/carta/interfaces/carta';
import { useTabsCarta } from '@/features/carta/ganchos/useTabsCarta';
import { familiasFuentes } from '@/ui/tipografia/nixxFuentes';

import { EncabezadoCarta } from './EncabezadoCarta';
import { MenuCategorias } from './MenuCategorias';
import { CarruselSubcategorias } from './CarruselSubcategorias';
import { TarjetaItemCarta } from './TarjetaItemCarta';

interface VistaCartaProps {
  carta: CartaDigital;
}

const scrollToTopOfPage = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (typeof document !== 'undefined') {
    document.documentElement?.scrollTo?.({ top: 0, behavior: 'smooth' });
    document.body?.scrollTo?.({ top: 0, behavior: 'smooth' });
  }
};

export function VistaCarta({ carta }: VistaCartaProps) {
  const idsCategorias = useMemo(
    () => carta.categorias.map((categoria) => categoria.id),
    [carta.categorias],
  );

  const idInicialCategoria = useMemo(() => {
    if (idsCategorias.includes('bebidas')) {
      return 'bebidas';
    }
    return idsCategorias[0] ?? '';
  }, [idsCategorias]);

  const { activo, seleccionar } = useTabsCarta({
    categoriasIds: idsCategorias,
    inicial: idInicialCategoria,
  });

  const [menuMovilAbierto, setMenuMovilAbierto] = useState<boolean>(false);

  const manejarSeleccion = (categoriaId: string) => {
    seleccionar(categoriaId);
    setMenuMovilAbierto(false);
    scrollToTopOfPage();
  };

  const categoriaActual = carta.categorias.find((categoria) => categoria.id === activo);

  if (!categoriaActual) {
    return null;
  }

  const tieneSubcategorias =
    !!categoriaActual.subcategorias && categoriaActual.subcategorias.length > 0;
  const itemsCategoria = categoriaActual.items ?? [];
  const familiaAdobeErnie = familiasFuentes.adobeErnie;

  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      <EncabezadoCarta titulo={carta.titulo} subtitulo={carta.subtitulo} />

      {/* Menú móvil */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setMenuMovilAbierto((abierto) => !abierto)}
          className="flex w-full items-center justify-between rounded-2xl border border-[var(--color-subrayado)]/40 bg-[var(--color-fondo)]/60 px-4 py-3 text-left text-sm uppercase tracking-[0.32em] text-[var(--color-texto)]/70"
          aria-expanded={menuMovilAbierto}
          aria-controls="menu-categorias-movil"
        >
          Menú
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-subrayado)]/30 bg-[var(--color-fondo)]/60 shadow-[0_0_18px_rgba(244,194,183,0.18)]">
            <span className="relative block h-4 w-4">
              <span
                className={clsx(
                  'absolute left-1/2 h-[1px] w-4 -translate-x-1/2 rounded-full bg-[var(--color-texto)] transition-all duration-200',
                  menuMovilAbierto
                    ? 'top-1/2 rotate-45'
                    : 'top-[4px] shadow-[0_0_6px_rgba(244,194,183,0.45)]',
                )}
              />
              <span
                className={clsx(
                  'absolute left-1/2 h-[1px] w-3 -translate-x-1/2 rounded-full bg-[var(--color-texto)]/70 transition-opacity duration-200',
                  menuMovilAbierto ? 'top-1/2 opacity-0' : 'top-1/2 opacity-80',
                )}
              />
              <span
                className={clsx(
                  'absolute left-1/2 h-[1px] w-4 -translate-x-1/2 rounded-full bg-[var(--color-texto)] transition-all duration-200',
                  menuMovilAbierto
                    ? 'top-1/2 -rotate-45'
                    : 'bottom-[4px] shadow-[0_0_6px_rgba(244,194,183,0.45)]',
                )}
              />
            </span>
          </span>
        </button>

        <div
          id="menu-categorias-movil"
          className={clsx(
            'transition-all duration-300',
            menuMovilAbierto ? 'max-h-screen overflow-y-auto py-4' : 'max-h-0 overflow-hidden',
          )}
        >
          <MenuCategorias
            categorias={carta.categorias}
            categoriaActiva={activo}
            onSeleccionar={manejarSeleccion}
            orientacion="vertical"
          />
        </div>
      </div>

      {/* Menú desktop */}
      <div className="hidden sm:block">
        <MenuCategorias
          categorias={carta.categorias}
          categoriaActiva={activo}
          onSeleccionar={seleccionar}
        />
      </div>

      {/* ===== Grupo: Título de categoría + contenido (con menos separación entre sí) ===== */}
      <div className="flex flex-col gap-4.5 sm:gap-4">
        <header className="flex flex-col gap-2">
          <h2
            className="text-3xl text-[var(--color-texto)] sm:text-[2.85rem]"
            style={{
              fontFamily: familiaAdobeErnie,
              letterSpacing: '-0.001em',
              wordSpacing: '0.25rem',
            }}
          >
            {categoriaActual.nombre}
          </h2>

          {categoriaActual.descripcion.length > 0 && (
            <p className="font-cuerpo text-sm text-[var(--color-texto)]/70 sm:text-base">
              {categoriaActual.descripcion}
            </p>
          )}
        </header>

        {tieneSubcategorias ? (
          <CarruselSubcategorias
            tituloCategoria={categoriaActual.nombre}
            subcategorias={categoriaActual.subcategorias ?? []}
            familiaTitulo={familiaAdobeErnie}
          />
        ) : (
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-6">
            {itemsCategoria.map((item) => (
              <TarjetaItemCarta key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      {/* ===== Fin grupo ===== */}
    </section>
  );
}
