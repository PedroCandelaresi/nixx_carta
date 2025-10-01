import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { CartaDigital } from '@/features/carta/interfaces/carta';

export async function obtenerCarta(): Promise<CartaDigital> {
  const rutaArchivo = join(process.cwd(), 'public', 'datos', 'carta.json');
  const contenido = await readFile(rutaArchivo, 'utf-8');
  return JSON.parse(contenido) as CartaDigital;
}
