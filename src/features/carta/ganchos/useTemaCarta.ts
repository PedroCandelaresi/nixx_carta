'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { TemaCarta } from '@/features/carta/constantes/temasCarta';

interface OpcionesTemaCarta {
  temas: TemaCarta[];
  temaInicialId?: string;
}

interface ResultadoTemaCarta {
  temaActivo: TemaCarta | null;
  temaActivoId: string;
  seleccionarTema: (nuevoId: string) => void;
  temasDisponibles: TemaCarta[];
}

export function useTemaCarta({ temas, temaInicialId }: OpcionesTemaCarta): ResultadoTemaCarta {
  const temasDisponibles = useMemo(() => temas, [temas]);

  const primerTema = temasDisponibles[0] ?? null;
  const idInicial = useMemo(() => {
    if (temaInicialId && temasDisponibles.some((tema) => tema.id === temaInicialId)) {
      return temaInicialId;
    }
    return primerTema?.id ?? '';
  }, [temaInicialId, temasDisponibles, primerTema]);

  const [temaActivoId, setTemaActivoId] = useState<string>(idInicial);

  const temaActivo = useMemo(
    () => temasDisponibles.find((tema) => tema.id === temaActivoId) ?? primerTema ?? null,
    [temaActivoId, temasDisponibles, primerTema],
  );

  const todasLasClaves = useMemo(() => {
    const conjunto = new Set<string>();
    temasDisponibles.forEach((tema) => {
      Object.keys(tema.variables).forEach((clave) => conjunto.add(clave));
    });
    return Array.from(conjunto);
  }, [temasDisponibles]);

  const valoresInicialesRef = useRef<Map<string, string>>(new Map());
  const inicializadoRef = useRef<boolean>(false);

  useEffect(() => {
    if (inicializadoRef.current) {
      return;
    }
    const documento = document.documentElement;
    todasLasClaves.forEach((clave) => {
      valoresInicialesRef.current.set(clave, documento.style.getPropertyValue(clave));
    });
    inicializadoRef.current = true;
  }, [todasLasClaves]);

  useEffect(() => {
    if (!temaActivo) {
      return;
    }

    const documento = document.documentElement;
    const clasesNuevas: string[] = [];

    Object.entries(temaActivo.variables).forEach(([clave, valor]) => {
      if (clave.endsWith('-clase')) {
        clasesNuevas.push(valor);
      } else {
        documento.style.setProperty(clave, valor);
      }
    });

    if (clasesNuevas.length > 0) {
      documento.classList.add(...clasesNuevas);
    }

    return () => {
      Object.entries(temaActivo.variables).forEach(([clave, valor]) => {
        if (clave.endsWith('-clase')) {
          documento.classList.remove(valor);
        } else {
          const valorOriginal = valoresInicialesRef.current.get(clave) ?? '';
          if (valorOriginal.trim().length > 0) {
            documento.style.setProperty(clave, valorOriginal);
          } else {
            documento.style.removeProperty(clave);
          }
        }
      });
    };
  }, [temaActivo]);

  const seleccionarTema = (nuevoId: string) => {
    if (temasDisponibles.some((tema) => tema.id === nuevoId)) {
      setTemaActivoId(nuevoId);
    }
  };

  return {
    temaActivo,
    temaActivoId,
    seleccionarTema,
    temasDisponibles,
  };
}
