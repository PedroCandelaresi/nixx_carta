import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { CartaDigital, CategoriaCarta, ItemCarta, SubcategoriaCarta } from '@/features/carta/interfaces/carta';

type GqlItem = {
  _id: string;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  etiquetas?: string[] | null;
};

type GqlSubcategoria = {
  _id: string;
  nombre: string;
  items: GqlItem[];
};

type GqlCategoria = {
  _id: string;
  slug?: string | null;
  nombre: string;
  descripcion?: string | null;
  items: GqlItem[];
  subcategorias: GqlSubcategoria[];
};

export async function obtenerCarta(): Promise<CartaDigital> {
  // 2) Consultar backend GraphQL para obtener categorías/ítems vivos
  const gqlUrl = process.env.NIXX_GRAPHQL_URL || process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql';
  const query = `
    query CartaFront {
      carta {
        _id
        slug
        nombre
        descripcion
        items { _id nombre descripcion precio etiquetas }
        subcategorias { _id nombre items { _id nombre descripcion precio etiquetas } }
      }
    }
  `;


  const res = await fetch(gqlUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
    // Evitar caché para que refleje DB actual
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`GraphQL status ${res.status}`);
  const data = (await res.json()) as { data?: { carta: GqlCategoria[] } };
  const categoriasGql = data.data?.carta || [];

  const categorias: CategoriaCarta[] = categoriasGql.map((c) => ({
    id: (c.slug && c.slug.trim()) || c._id,
    nombre: c.nombre,
    descripcion: c.descripcion || '',
    items: (c.items || []).map((it): ItemCarta => ({
      id: it._id,
      nombre: it.nombre,
      descripcion: it.descripcion || '',
      precio: Number(it.precio) || 0,
      etiquetas: Array.isArray(it.etiquetas) ? it.etiquetas : [],
    })),
    subcategorias: (c.subcategorias || []).map((s): SubcategoriaCarta => ({
      id: s._id,
      nombre: s.nombre,
      descripcion: '',
      items: (s.items || []).map((it): ItemCarta => ({
        id: it._id,
        nombre: it.nombre,
        descripcion: it.descripcion || '',
        precio: Number(it.precio) || 0,
        etiquetas: Array.isArray(it.etiquetas) ? it.etiquetas : [],
      })),
    })),
  }));

  return {
    titulo: '',
    subtitulo: '',
    categorias,
  };
}
