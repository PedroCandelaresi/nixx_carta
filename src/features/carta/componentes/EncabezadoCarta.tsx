import { familiasFuentes } from '@/ui/tipografia/nixxFuentes';

interface EncabezadoCartaProps {
  titulo: string;
  subtitulo: string;
}

export function EncabezadoCarta({ titulo, subtitulo }: EncabezadoCartaProps) {
  const [principal, ...resto] = titulo.split(' ');
  const secundario = resto.join(' ').trim() || 'Night';
  const principalNormalizado = principal
    ? principal.charAt(0).toUpperCase() + principal.slice(1).toLowerCase()
    : 'Nixx';
  const secundarioNormalizado = secundario.toLowerCase();

  const familiaHelloParis = familiasFuentes.helloParis;
  const familiaAdobeErnie = familiasFuentes.adobeErnie;

  return (
    <header className="flex flex-col gap-5 text-left">
      <div className="relative inline-block">
        <span
          className="block text-[4.05rem] font-normal text-[#f4ede4] leading-[0.64] sm:text-[5.25rem]"
          style={{ fontFamily: familiaHelloParis, letterSpacing: '0.05em' }}
        >
          {principalNormalizado}
        </span>
        <span
          className="pointer-events-none absolute z-10 lowercase text-[#1f0001] drop-shadow-[0_12px_20px_rgba(0,0,0,0.38)]"
          style={{
            fontFamily: familiaAdobeErnie,
            fontSize: '2.4rem',
            bottom: '-1.8rem',
            left: '12%',
            transform: 'translateX(-45%)',
            letterSpacing: '0.08em',
          }}
        >
          {secundarioNormalizado}
        </span>
      </div>
      <p className="font-cuerpo max-w-2xl text-sm leading-relaxed text-[var(--color-texto)]/70 sm:text-base">
        {subtitulo}
      </p>
    </header>
  );
}
