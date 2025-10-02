'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { clsx } from 'clsx';

import type { CartaDigital } from '@/features/carta/interfaces/carta';
import { useTabsCarta } from '@/features/carta/ganchos/useTabsCarta';
import { familiasFuentes } from '@/ui/tipografia/nixxFuentes';

import { EncabezadoCarta } from './EncabezadoCarta';
import { MenuCategorias } from './MenuCategorias';
import { TarjetaItemCarta } from './TarjetaItemCarta';

interface VistaCartaProps {
  carta: CartaDigital;
}

export function VistaCarta({ carta }: VistaCartaProps) {
  const idsCategorias = useMemo(
    () => carta.categorias.map((categoria) => categoria.id),
    [carta.categorias],
  );

  const { activo, seleccionar } = useTabsCarta({ categoriasIds: idsCategorias, inicial: '' });

  const [menuMovilAbierto, setMenuMovilAbierto] = useState<boolean>(false);

  const manejarSeleccion = (categoriaId: string) => {
    seleccionar(categoriaId);
    setMenuMovilAbierto(false);
  };

  const categoriaActual = carta.categorias.find((categoria) => categoria.id === activo);
  const familiaAdobeErnie = familiasFuentes.adobeErnie;

  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      <EncabezadoCarta titulo={carta.titulo} subtitulo={carta.subtitulo} />
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setMenuMovilAbierto((abierto) => !abierto)}
          className="flex w-full items-center justify-between rounded-2xl border border-[var(--color-subrayado)]/40 bg-[var(--color-fondo)]/60 px-4 py-3 text-left text-sm uppercase tracking-[0.32em] text-[var(--color-texto)]/70"
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
          className={clsx(
            'overflow-hidden transition-all duration-300',
            menuMovilAbierto ? 'max-h-[420px] py-4' : 'max-h-0',
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
      <div className="hidden sm:block">
        <MenuCategorias
          categorias={carta.categorias}
          categoriaActiva={activo}
          onSeleccionar={seleccionar}
        />
      </div>
      {categoriaActual ? (
        <>
          <header className="flex flex-col gap-2">
            <h2
              className="text-3xl text-[var(--color-texto)] sm:text-[2.85rem]"
              style={{
                fontFamily: familiaAdobeErnie,
                letterSpacing: '-0.12em',
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {categoriaActual.items.map((item) => (
              <TarjetaItemCarta key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="relative flex min-h-[260px] items-start justify-center pt-10 sm:pt-14">
          <Image
            src="/logo_small.svg"
            alt="Marca de agua Nixx"
            width={320}
            height={220}
            className="pointer-events-none select-none opacity-75"
            style={{
              filter:
                'drop-shadow(0 0 3px rgba(31, 0, 1, 0.35)) drop-shadow(0 0 8px rgba(31, 0, 1, 0.25))',
              mixBlendMode: 'multiply',
            }}
          />
        </div>
      )}
    </section>
  );
}
