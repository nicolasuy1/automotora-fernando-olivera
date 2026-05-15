# Fernando Olivera Vehículos — Versión de prueba

## ¿Qué incluye esta versión?

### Web pública
- **Home** con hero premium, vehículos destacados, beneficios, financiación, proceso de compra, contacto y footer
- **Catálogo** con filtros por tipo, marca, búsqueda por texto y ordenamiento
- **Fichas individuales** con todos los datos del vehículo, galería, precio y CTA de WhatsApp
- **Financiación** con detalle de opciones
- **Contacto** con ubicación, WhatsApp e Instagram
- **WhatsApp integrado** con mensajes automáticos según el vehículo
- **Diseño premium** oscuro, responsive, con animaciones y micro-interacciones

### Panel de administración (`/admin`)
- **Dashboard** con estadísticas: total, publicados, vendidos, borradores, ocultos, destacados
- **Listado de vehículos** con filtros por estado y acciones rápidas
- **Crear/editar vehículos** con formulario completo
- **Acciones**: editar, duplicar, destacar, marcar vendido, ocultar, eliminar

## ¿Cómo entrar al admin?

Ir a: **`/admin`**

No hace falta usuario ni contraseña todavía. El admin no aparece en el menú público.

## ¿Cómo cargar un vehículo?

1. Entrar a `/admin`
2. Click en **"Nuevo vehículo"**
3. Completar:
   - **Título** (ej: "Chevrolet Cruze LTZ RS")
   - **Marca** y **Modelo**
   - **Año**, **Tipo**, **Categoría**
   - **Precio** (o tildar "Consultar precio")
   - **Descripción corta**
   - **Financiación** y **Permuta**
   - **Imagen** (URL de imagen) — si no hay, se usa la imagen de showroom
   - **Estado**: Publicado / Borrador
   - **Destacar en home**: Sí / No
4. Click en **"Crear vehículo"**
5. El vehículo aparecerá en el catálogo si está publicado

## ¿Cómo marcar un vehículo como vendido?

1. Ir a `/admin`
2. En el listado de vehículos, click en el botón de **carrito** (🛒)
3. El vehículo se marca como vendido y aparecerá con badge "Vendido" en la web

## ¿Cómo destacar un vehículo en la home?

1. Ir a `/admin` → Vehículos
2. Click en el botón de **estrella** (⭐)
3. El vehículo aparecerá en la sección de destacados de la home (máximo 3-4)

## ¿Dónde se guardan los datos?

Los datos se guardan **en el navegador** (localStorage). Esto significa:
- Si borrás los datos del navegador, se pierden los cambios
- Cada navegador tiene sus propios datos
- Para producción real, se conectará con Supabase (base de datos en la nube)

## ¿Qué falta para producción?

1. **Supabase** — Conectar base de datos real
2. **Autenticación** — Login para el admin
3. **Imágenes reales** — Fotos de cada vehículo
4. **Dominio propio** — fernandoolivera.com.uy o similar
5. **Carga de imágenes** — Subir fotos directamente desde el admin
