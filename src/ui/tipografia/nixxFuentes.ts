import localFont from 'next/font/local';

export const adobeHandwritingErnie = localFont({
  src: [
    {
      path: '../../../public/fuentes/AdobeHandwriting-Ernie/AdobeHandwriting-Ernie.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fuentes/AdobeHandwriting-Ernie/AdobeHandwriting-Ernie.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fuentes/AdobeHandwriting-Ernie/AdobeHandwriting-Ernie.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--fuente-adobe-ernie',
});

export const perandorySemiCondensed = localFont({
  src: [
    {
      path: '../../../public/fuentes/Perandory/PerandorySemiCondensed.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  style: 'normal',
  display: 'swap',
  variable: '--fuente-perandory',
});

export const aileronRegular = localFont({
  src: [
    {
      path: '../../../public/fuentes/Aileron/Aileron-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fuentes/Aileron/Aileron-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fuentes/Aileron/Aileron-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fuentes/Aileron/Aileron-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--fuente-aileron',
});

export const helloParisRegular = localFont({
  src: [
    {
      path: '../../../public/fuentes/Hello Paris-Font/Hello Paris Sans Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fuentes/Hello Paris-Font/Hello Paris Sans Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fuentes/Hello Paris-Font/Hello Paris Sans Light.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--fuente-hello-paris',
});

export const newIconScriptRegular = localFont({
  src: [
    {
      path: '../../../public/fuentes/NewIconScriptRegular/New-Icon-Script.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--fuente-new-icon',
});

export const fuentesRegistradas = [
  adobeHandwritingErnie,
  perandorySemiCondensed,
  aileronRegular,
  helloParisRegular,
  newIconScriptRegular,
];

export const variablesFuentes = {
  adobeErnie: '--fuente-adobe-ernie',
  perandory: '--fuente-perandory',
  aileron: '--fuente-aileron',
  helloParis: '--fuente-hello-paris',
  newIcon: '--fuente-new-icon',
} as const;

export const clasesFuentes = {
  adobeErnie: adobeHandwritingErnie.className,
  perandory: perandorySemiCondensed.className,
  aileron: aileronRegular.className,
  helloParis: helloParisRegular.className,
  newIcon: newIconScriptRegular.className,
} as const;

export const familiasFuentes = {
  adobeErnie: adobeHandwritingErnie.style.fontFamily,
  perandory: perandorySemiCondensed.style.fontFamily,
  aileron: aileronRegular.style.fontFamily,
  helloParis: helloParisRegular.style.fontFamily,
  newIcon: newIconScriptRegular.style.fontFamily,
} as const;
