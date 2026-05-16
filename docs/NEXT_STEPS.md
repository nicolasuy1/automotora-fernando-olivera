# Próximos pasos — Fernando Olivera Vehículos

## Fase 2: Base de datos y autenticación

### Conectar Supabase
- Crear proyecto en supabase.com
- Ejecutar SQL de `docs/SUPABASE_SETUP.md`
- Configurar variables de entorno en Vercel
- Migrar `vehicleService.js` de localStorage a Supabase
- Migrar datos existentes

### Autenticación para admin
- Implementar login con Supabase Auth
- Proteger rutas `/admin` con middleware
- Login simple con email/password para Fernando

### Carga de imágenes
- Configurar Supabase Storage
- Subir imágenes directamente desde el formulario del admin
- Generar thumbnails automáticos
- Reemplazar URLs manuales por upload

## Fase 3: Mejoras de contenido

### Fotos reales del stock
- Sesión fotográfica de vehículos disponibles
- Mínimo 3-4 fotos por vehículo (exterior, interior, detalles)
- Reemplazar showroom-premium.jpeg por fotos reales

### Dominio propio
- Registrar dominio (fernandoolivera.com.uy u opción similar)
- Configurar DNS en Vercel
- Actualizar meta tags y Open Graph

## Fase 4: Marketing y visibilidad

### SEO local
- Google Business Profile
- Meta tags por página
- Schema markup para vehículos
- Sitemap.xml

### Google Maps
- Integrar mapa de ubicación en la sección de contacto
- Marcar showroom en Ciudad del Plata

### Analytics
- Google Analytics o similar
- Tracking de clicks en WhatsApp
- Tracking de vehículos más vistos
- Métricas de conversión

### Redes sociales
- Compartir vehículos en Instagram/Facebook
- Open Graph images por vehículo
- Link en bio de Instagram

## Fase 5: Funcionalidades avanzadas

### Gestión de consultas
- Guardar consultas de WhatsApp por vehículo
- Dashboard de consultas más frecuentes
- Historial de contactos

### Notificaciones
- Alerta cuando se agrega un vehículo nuevo
- Aviso cuando un vehículo está por X días sin consultas
- Email/WhatsApp de seguimiento

### Optimización
- Compresión de imágenes automática
- CDN para assets
- Cache headers
- Performance audit

## Backlog de ideas
- Calculadora de cuotas online
- Comparador de vehículos
- Alertas de nuevos vehículos por tipo
- Integración con MercadoLibre
- Blog con consejos de compra
- Sección de entregas realizadas (con fotos reales)
