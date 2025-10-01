import { clasesFuentes, familiasFuentes, variablesFuentes } from '@/ui/tipografia/nixxFuentes';

export interface TemaCarta {
  id: string;
  nombre: string;
  descripcion: string;
  variables: Record<string, string>;
}

const {
  adobeErnie,
  aileron,
} = variablesFuentes;

const {
  adobeErnie: claseAdobeErnie,
  aileron: claseAileron,
} = clasesFuentes;

const {
  adobeErnie: familiaAdobeErnie,
  aileron: familiaAileron,
} = familiasFuentes;

export const temasCarta: TemaCarta[] = [
  {
    id: 'nixx-unico',
    nombre: 'Nixx Night',
    descripcion: 'Carta nocturna con tipografías personalizadas.',
    variables: {
      '--color-fondo': '#771515',
      '--color-texto': '#fbe9e7',
      '--color-destacado': '#f4c2b7',
      '--color-destacado-secundario': '#c77979',
      '--color-resaltado': '#441111',
      '--color-subrayado': '#aa4e4e',
      '--color-brillo': 'rgba(244, 194, 183, 0.35)',
      '--glow-superior-color': 'rgba(244, 194, 183, 0.22)',
      '--glow-inferior-color': 'rgba(170, 78, 78, 0.25)',
      '--halo-superior-color': 'rgba(244, 194, 183, 0.28)',
      '--halo-inferior-color': 'rgba(170, 78, 78, 0.2)',
      '--capa-cristal-desde': 'rgba(40, 6, 6, 0.88)',
      '--capa-cristal-hasta': 'rgba(22, 0, 0, 0.94)',
      '--capa-cristal-borde': 'rgba(244, 194, 183, 0.16)',
      '--capa-cristal-sombra': 'rgba(0, 0, 0, 0.6)',
      '--font-titulos': familiaAdobeErnie,
      '--font-cuerpo': familiaAileron,
      '--font-detalle': familiaAileron,
      '--font-titulos-clase': claseAdobeErnie,
      '--font-cuerpo-clase': claseAileron,
      '--font-detalle-clase': claseAileron,
    },
  },
];
