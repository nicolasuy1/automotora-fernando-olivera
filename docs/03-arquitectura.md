# Arquitectura

## Estado Actual Detectado

El proyecto actual esta construido con:

- Vite.
- React 18.
- JavaScript.
- TailwindCSS.
- Framer Motion.
- Remotion para generar video de portada.
- Lucide React para iconos.

La decision actual es mantener Vite para acelerar la demo comercial y no bloquear la presentacion por una migracion tecnica.

## Stack Actual De Demo

- Vite.
- React 18.
- JavaScript.
- TailwindCSS.
- Framer Motion.
- Lenis para smooth scroll.
- GSAP solo si aporta valor real a una interaccion especifica.
- Remotion para piezas visuales/render dinamico.
- Supabase en fase futura.
- Cloudinary o storage externo en fase futura.

## Rutas Objetivo

- `/` - Homepage premium.
- `/catalogo` - Catalogo de vehiculos.
- `/catalogo/[slug]` - Ficha individual.
- `/financiacion` - Financiacion, entrega y permuta.
- `/clientes` - Entregas, testimonios y reviews.
- `/contacto` - WhatsApp, ubicacion, horarios y mapa.
- `/admin` - Panel privado futuro.

## Estructura Objetivo

```txt
/docs
/prompts
/src
  /app
  /components
  /data
  /lib
  /styles
/public
  /images
    /vehicles
    /brand
    /backgrounds
```

## Modelo de Datos Inicial

Vehiculo:

- id
- slug
- titulo
- marca
- modelo
- anio
- kilometros
- precio
- moneda
- categoria
- combustible
- transmision
- estado
- descripcion
- features
- tags
- imagenes
- financiacion
- destacado
- disponible

Categoria:

- compactos
- suv
- utilitarios
- sedanes
- motos
- oportunidades

## Dependencias Faltantes Para Fases Futuras

Para una version productiva mas avanzada podrian sumarse:

- `next`
- `typescript`
- `@types/react`
- `@types/react-dom`
- `eslint`
- `eslint-config-next`
- `lenis` o `@studio-freight/lenis`
- `gsap` si se decide usarlo
- `clsx`
- `tailwind-merge`
- `class-variance-authority` si se formaliza un sistema de componentes
- `@supabase/supabase-js` en fase futura
- SDK de Cloudinary o integracion por API en fase futura

## Estrategia Actual

1. Mantener Vite para velocidad de demo.
2. Crear rutas SPA navegables.
3. Separar componentes, datos, motion y helpers.
4. Crear catalogo y fichas mock sin backend.
5. Preparar futuro admin sin implementarlo aun.
6. Recién evaluar Next.js cuando la demo se convierta en producto contratado.

## Principios Tecnicos

- Mobile-first.
- Performance antes que efectos pesados.
- Animaciones con degradacion elegante.
- Datos desacoplados de componentes.
- Imagenes optimizadas.
- CTAs medibles.
- Arquitectura lista para CRM, SEO y catalogo dinamico.
