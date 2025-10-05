export interface ItemCarta {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  etiquetas: string[];
}

export interface SubcategoriaCarta {
  id: string;
  nombre: string;
  descripcion: string;
  items: ItemCarta[];
}

export interface CategoriaCarta {
  id: string;
  nombre: string;
  descripcion: string;
  items?: ItemCarta[];
  subcategorias?: SubcategoriaCarta[];
}

export interface CartaDigital {
  titulo: string;
  subtitulo: string;
  categorias: CategoriaCarta[];
}
