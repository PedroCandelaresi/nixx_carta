
'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { clsx } from 'clsx';

import type { SubcategoriaCarta } from '@/features/carta/interfaces/carta';

interface CarruselSubcategoriasProps {
  tituloCategoria: string;
  subcategorias: SubcategoriaCarta[];
  familiaTitulo: string;
}

interface EstadoDesplazamiento {
  puedeRetroceder: boolean;
  puedeAvanzar: boolean;
}

const logosSubcategorias: Record<string, { src: string; alt: string; marcaAgua?: { src: string; alt: string } }> = {
  'tragos-redbull': {
    src: '/redbull.png',
    alt: 'Red Bull',
    marcaAgua: {
      src: '/redbull_lata.svg',
      alt: 'Red Bull',
    },
  },
};

// Retardo para actualizar el título visible del carrusel
// Ajustado para suavizar el cambio al paginar y al deslizar
const DEBOUNCE_TITULO_MS = 200;

export function CarruselSubcategorias({ tituloCategoria, subcategorias, familiaTitulo }: CarruselSubcategoriasProps) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const tarjetasRef = useRef<Array<HTMLElement | null>>([]);
  const [estado, setEstado] = useState<EstadoDesplazamiento>({ puedeRetroceder: false, puedeAvanzar: false });
  const [indiceActivo, setIndiceActivo] = useState<number>(0);
  const [indiceVisible, setIndiceVisible] = useState<number>(0);
  const [alturaActiva, setAlturaActiva] = useState<number | null>(null);
  const temporizadorVisibleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const haySubcategorias = subcategorias.length > 0;

  const programarVisible = useCallback(
    (nuevoIndice: number) => {
      if (temporizadorVisibleRef.current) {
        clearTimeout(temporizadorVisibleRef.current);
      }

      temporizadorVisibleRef.current = setTimeout(() => {
        setIndiceVisible((previo) => (previo === nuevoIndice ? previo : nuevoIndice));
        temporizadorVisibleRef.current = null;
      }, DEBOUNCE_TITULO_MS);
    },
    [],
  );

  const centrarIndice = useCallback((indiceObjetivo: number, comportamiento: ScrollBehavior = 'smooth') => {
    const elemento = contenedorRef.current;
    if (!elemento) {
      return;
    }

    const tarjetas = Array.from(elemento.querySelectorAll<HTMLElement>('[data-carrusel-item]'));
    const objetivo = tarjetas[indiceObjetivo];
    if (!objetivo) {
      return;
    }

    const desplazamiento = objetivo.offsetLeft - (elemento.clientWidth - objetivo.offsetWidth) / 2;
    elemento.scrollTo({ left: Math.max(0, desplazamiento), behavior: comportamiento });
  }, []);

  const actualizarEstadoYActivo = useCallback(() => {
    const elemento = contenedorRef.current;
    if (!elemento) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = elemento;
    const margen = 16;
    const puedeRetroceder = scrollLeft > margen;
    const puedeAvanzar = scrollLeft + clientWidth < scrollWidth - margen;

    setEstado({ puedeRetroceder, puedeAvanzar });

    const tarjetas = Array.from(elemento.querySelectorAll<HTMLElement>('[data-carrusel-item]'));
    if (tarjetas.length === 0) {
      return;
    }

    const centroContenedor = scrollLeft + clientWidth / 2;
    let indiceCercano = 0;
    let distanciaMinima = Number.POSITIVE_INFINITY;

    tarjetas.forEach((tarjeta, indice) => {
      const centroTarjeta = tarjeta.offsetLeft + tarjeta.offsetWidth / 2;
      const distancia = Math.abs(centroTarjeta - centroContenedor);
      if (distancia < distanciaMinima) {
        distanciaMinima = distancia;
        indiceCercano = indice;
      }
    });

    setIndiceActivo((previo) => (previo === indiceCercano ? previo : indiceCercano));
    programarVisible(indiceCercano);
  }, [programarVisible]);

  useEffect(() => {
    actualizarEstadoYActivo();
  }, [actualizarEstadoYActivo, subcategorias]);

  useEffect(() => () => {
    if (temporizadorVisibleRef.current) {
      clearTimeout(temporizadorVisibleRef.current);
    }
  }, []);

  useEffect(() => {
    setIndiceActivo(0);
    setIndiceVisible(0);
    centrarIndice(0, 'auto');
    requestAnimationFrame(actualizarEstadoYActivo);
  }, [subcategorias, centrarIndice, actualizarEstadoYActivo]);

  useLayoutEffect(() => {
    const tarjetaActiva = tarjetasRef.current[indiceActivo];
    setAlturaActiva(tarjetaActiva ? tarjetaActiva.offsetHeight : null);
  }, [indiceActivo, subcategorias]);

  useEffect(() => {
    const actualizarAltura = () => {
      const tarjetaActiva = tarjetasRef.current[indiceActivo];
      setAlturaActiva(tarjetaActiva ? tarjetaActiva.offsetHeight : null);
    };

    window.addEventListener('resize', actualizarAltura);
    return () => window.removeEventListener('resize', actualizarAltura);
  }, [indiceActivo]);

  const desplazar = useCallback(
    (direccion: 'siguiente' | 'anterior') => {
      const elemento = contenedorRef.current;
      if (!elemento) {
        return;
      }

      const tarjetas = Array.from(elemento.querySelectorAll<HTMLElement>('[data-carrusel-item]'));
      if (tarjetas.length === 0) {
        return;
      }

      const delta = direccion === 'siguiente' ? 1 : -1;
      const nuevoIndice = Math.min(Math.max(indiceActivo + delta, 0), tarjetas.length - 1);
      centrarIndice(nuevoIndice);
      setIndiceActivo(nuevoIndice);
      // Actualizamos el título de forma diferida para evitar parpadeo
      // mientras el scroll suave reposiciona el carrusel.
      programarVisible(nuevoIndice);

      requestAnimationFrame(actualizarEstadoYActivo);
    },
    [indiceActivo, centrarIndice, actualizarEstadoYActivo, programarVisible],
  );

  useEffect(() => {
    const elemento = contenedorRef.current;
    if (!elemento) {
      return;
    }

    const manejarScroll = () => actualizarEstadoYActivo();
    elemento.addEventListener('scroll', manejarScroll, { passive: true });
    return () => elemento.removeEventListener('scroll', manejarScroll);
  }, [actualizarEstadoYActivo]);

  const subcategoriaVisible = subcategorias[indiceVisible] ?? subcategorias[indiceActivo] ?? subcategorias[0];
  const tituloSubcategoriaTexto = subcategoriaVisible?.nombre ?? tituloCategoria;
  const logosParaPreload = useMemo(() => Object.values(logosSubcategorias), []);
  const tituloSubcategoriaRender = tituloSubcategoriaTexto;
  const progreso = useMemo(() => {
    if (subcategorias.length === 0) {
      return 0;
    }

    return ((indiceVisible + 0.5) / subcategorias.length) * 100;
  }, [indiceVisible, subcategorias.length]);

  const progresoIzquierdo = Math.min(progreso, 100);      // 0..100
  const progresoDerecho = Math.max(100 - progreso, 0);   // 100..0

  if (!haySubcategorias) {
    return null;
  }

  return (
    <section aria-label={`Opciones de ${tituloCategoria}`} className="flex flex-col gap-4 sm:gap-5">
      <div aria-hidden className="pointer-events-none sr-only">
        {logosParaPreload.map((logo) => (
          <Image key={logo.src} src={logo.src} alt={logo.alt} width={1} height={1} priority />
        ))}
      </div>
      <header className="flex flex-col items-center gap-3 sm:gap-1.5">
        <div className="flex w-full items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex-shrink-0">
            <BotonCarrusel
              direccion="anterior"
              disabled={!estado.puedeRetroceder}
              onClick={() => desplazar('anterior')}
              size="sm"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[var(--color-subrayado)]/25 sm:h-[3px] sm:w-24">
              <span
                className="absolute inset-y-0 left-0 block h-full rounded-full bg-[var(--color-destacado)] transition-all duration-300"
                style={{ width: `${progresoIzquierdo}%` }}
              />
            </div>
            <span className="font-cuerpo text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-texto)]/70 sm:text-[0.65rem]">
              {`${(indiceVisible + 1).toString().padStart(2, '0')}/${subcategorias.length.toString().padStart(2, '0')}`}
            </span>
            <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[var(--color-subrayado)]/25 sm:h-[3px] sm:w-24">
              <span
                className="absolute inset-y-0 right-0 block h-full rounded-full bg-[var(--color-destacado)] transition-all duration-300"
                style={{ width: `${progresoDerecho}%` }}
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <BotonCarrusel
              direccion="siguiente"
              disabled={!estado.puedeAvanzar}
              onClick={() => desplazar('siguiente')}
              size="sm"
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <h3
            key={subcategoriaVisible?.id ?? 'sin-subcategoria'}
            className="animate-[fadeInUp_220ms_ease-out] text-2xl text-[var(--color-texto)] sm:text-[2.4rem] transition-opacity duration-200"
            style={{
              fontFamily: familiaTitulo,
              letterSpacing: '-0.001em',
              wordSpacing: '0.25rem',
              willChange: 'opacity, transform',
            }}
          >
            {tituloSubcategoriaRender}
          </h3>
        </div>
      </header>
      <div className="relative">
        <div
          ref={contenedorRef}
          className="no-scrollbar flex items-start snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden scroll-smooth transition-[height] duration-300 ease-out"
          style={{
            WebkitOverflowScrolling: 'touch',
            height: alturaActiva ? `${alturaActiva + 24}px` : undefined,
          }}
        >
          {subcategorias.map((subcategoria, indice) => {
            const configuracionSubcategoria = logosSubcategorias[subcategoria.id];
            const marcaAgua = configuracionSubcategoria?.marcaAgua;

            return (
              <article
                key={subcategoria.id}
                data-carrusel-item
                aria-current={indice === indiceActivo ? 'true' : undefined}
                className={clsx(
                  'relative w-full max-w-[420px] flex-shrink-0 snap-center overflow-hidden rounded-3xl border border-[var(--color-resaltado)]/35 bg-[rgba(28,8,9,0.82)] p-6 text-[var(--color-texto)] transition-colors duration-200 sm:max-w-[460px] sm:p-7',
                  indice === indiceActivo
                    ? 'border-[var(--color-destacado)]/45'
                    : 'border-[var(--color-resaltado)]/35',
                )}
                ref={(elemento) => {
                  tarjetasRef.current[indice] = elemento;
                }}
              >
                {marcaAgua && (
                  <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-full w-full max-h-[78%] max-w-[78%] items-center justify-center rounded-[2.25rem] bg-[rgba(17,6,7,0.62)] p-6 sm:max-h-[72%] sm:max-w-[72%] sm:p-8">
                      <Image
                        src={marcaAgua.src}
                        alt={marcaAgua.alt}
                        fill
                        sizes="(min-width: 640px) 460px, 320px"
                        className="pointer-events-none select-none object-contain opacity-30 brightness-55 saturate-105"
                      />
                    </span>
                  </span>
                )}
                <ul className="relative z-10 flex flex-col gap-4">
                  {subcategoria.items.map((item) => (
                    <li key={item.id} className="flex flex-col gap-2 border-b border-[var(--color-subrayado)]/20 pb-4 last:border-none last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col">
                          <span className="font-cuerpo text-lg font-semibold tracking-[0.06em]">
                            {item.nombre}
                          </span>
                          {item.descripcion.length > 0 && (
                            <span className="font-cuerpo text-sm text-[var(--color-texto)]/75">
                              {item.descripcion}
                            </span>
                          )}
                        </div>
                        <span className="font-cuerpo text-lg font-semibold text-[var(--color-texto)]/90">
                          ${item.precio.toLocaleString('es-AR')}
                        </span>
                      </div>
                      {item.etiquetas.length > 0 && (
                        <span className="font-cuerpo text-[0.65rem] uppercase tracking-[0.35em] text-[var(--color-texto)]/50">
                          {item.etiquetas.join(' • ')}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface BotonCarruselProps {
  direccion: 'anterior' | 'siguiente';
  disabled: boolean;
  onClick: () => void;
  size?: 'md' | 'sm';
}

function BotonCarrusel({ direccion, disabled, onClick, size = 'md' }: BotonCarruselProps) {
  const etiqueta = direccion === 'anterior' ? 'Anterior' : 'Siguiente';
  const esAnterior = direccion === 'anterior';

  const clasesBase = clsx(
    'group relative flex items-center justify-center rounded-full border border-[var(--color-subrayado)]/35 bg-[var(--color-fondo)]/80 text-[var(--color-texto)] transition-all duration-300 ease-out',
    disabled
      ? 'cursor-default opacity-40'
      : 'hover:border-[var(--color-destacado)]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-destacado)] active:scale-[0.94] shadow-[0_0_18px_rgba(244,194,183,0.18)] active:shadow-[0_0_22px_rgba(244,194,183,0.45)]',
  );

  const tamanio = size === 'sm'
    ? 'h-9 w-9 sm:h-10 sm:w-10'
    : 'h-12 w-12 sm:h-14 sm:w-14';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={etiqueta}
      disabled={disabled}
      className={`${clasesBase} ${tamanio}`}
    >
      {!disabled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[var(--color-destacado)]/18 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70 group-active:opacity-90"
        />
      )}
      <span
        aria-hidden="true"
        className={clsx(
          'pointer-events-none relative flex h-full w-full items-center justify-center rounded-full bg-[var(--color-subrayado)]/15 transition-transform duration-300 ease-out',
          !disabled && 'group-hover:bg-[var(--color-destacado)]/18 group-hover:scale-110 group-active:scale-95 group-active:bg-[var(--color-destacado)]/28',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={clsx(
            'h-4 w-4 text-[var(--color-texto)] drop-shadow-[0_0_8px_rgba(244,194,183,0.35)] transition-transform duration-300 ease-out',
            esAnterior && '-scale-x-100',
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  );
}
