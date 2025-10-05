import Image from 'next/image';

interface EncabezadoCartaProps {
  titulo: string;
  subtitulo: string;
}

export function EncabezadoCarta({ titulo, subtitulo }: EncabezadoCartaProps) {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <div className="relative flex w-full items-center justify-center overflow-hidden py-2 sm:py-3">
        <div
          className="relative flex items-center justify-center"
          style={{
            height: 'clamp(110px, 12vh, 200px)',
            width: 'clamp(200px, 65vw, 420px)',
          }}
        >
          <Image
            src="/logo_big.svg"
            alt={titulo}
            width={280}
            height={120}
            priority
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <p className="font-cuerpo max-w-2xl text-[0.60rem] tracking-[0.08em] text-[var(--color-texto)]/70 sm:text-base sm:leading-relaxed whitespace-nowrap">
        {subtitulo}
      </p>
    </header>
  );
}
