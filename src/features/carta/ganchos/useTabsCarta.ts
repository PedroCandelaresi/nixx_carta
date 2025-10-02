'use client';

import { useState } from 'react';

interface OpcionesTabs {
  categoriasIds: string[];
  inicial?: string;
}

interface ResultadoTabs {
  activo: string;
  seleccionar: (nuevoId: string) => void;
}

export function useTabsCarta({ categoriasIds, inicial }: OpcionesTabs): ResultadoTabs {
  const idInicial = inicial !== undefined
    ? inicial
    : categoriasIds[0] ?? '';

  const [activo, setActivo] = useState<string>(idInicial);

  const seleccionar = (nuevoId: string) => {
    if (categoriasIds.includes(nuevoId)) {
      setActivo(nuevoId);
    }
  };

  return { activo, seleccionar };
}
