const formateadorPesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatearDinero(valor: number): string {
  return formateadorPesos.format(valor);
}
