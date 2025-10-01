export const paletaNixx = {
  fondoProfundo: "#1F0001",
  borgonaOscuro: "#421216",
  borgonaIntenso: "#5D161A",
  acentoCarmesí: "#832124",
  cobreSuave: "#71574F",
  marfilSuave: "#F4EDE4",
} as const;

export type ClavePaletaNixx = keyof typeof paletaNixx;

export function obtenerColorNixx(clave: ClavePaletaNixx): string {
  return paletaNixx[clave];
}
