# Supabase Setup — Fernando Olivera Vehículos

## Tabla sugerida: `vehicles`

```sql
CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL,
  category TEXT,
  type TEXT,
  price_usd NUMERIC,
  price_visible BOOLEAN DEFAULT true,
  ask_price BOOLEAN DEFAULT false,
  mileage INT,
  fuel TEXT,
  transmission TEXT,
  color TEXT,
  engine TEXT,
  doors INT,
  short_description TEXT,
  long_description TEXT,
  highlights TEXT[] DEFAULT '{}',
  equipment TEXT[] DEFAULT '{}',
  financing_text TEXT DEFAULT 'Financiación flexible',
  accepts_trade BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'sold', 'hidden')),
  featured BOOLEAN DEFAULT false,
  main_image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  image_alt TEXT,
  internal_notes TEXT,
  visual TEXT DEFAULT 'compact',
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for public queries
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_featured ON vehicles(featured) WHERE status = 'published';
CREATE INDEX idx_vehicles_slug ON vehicles(slug);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

## Variables de entorno

Crear en Vercel y en `.env.local`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

## Migración desde localStorage

1. Instalar Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Crear `src/lib/supabase.js`:
   ```js
   import { createClient } from '@supabase/supabase-js';

   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   );
   ```

3. Actualizar `src/services/vehicleService.js`:
   - Cambiar las funciones de `localStorage.getItem/setItem` por queries a Supabase
   - Las funciones ya tienen la interfaz correcta (`getPublishedVehicles`, `createVehicle`, etc.)
   - Solo hay que cambiar la implementación interna de cada función
   - Convertir funciones sync a async y actualizar componentes con `useEffect` + `useState`

4. Migrar datos actuales:
   - Exportar JSON de localStorage
   - Insertar en tabla vehicles de Supabase
   - Verificar slugs únicos

## Row Level Security (RLS)

```sql
-- Cualquiera puede leer vehículos publicados
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published" ON vehicles
  FOR SELECT USING (status = 'published');

-- Admin puede hacer todo (requiere auth)
CREATE POLICY "Admin full access" ON vehicles
  FOR ALL USING (auth.role() = 'authenticated');
```

## Storage para imágenes

1. Crear bucket `vehicle-images` en Supabase Storage
2. Subir imágenes desde el admin
3. Generar URLs públicas
4. Actualizar `main_image_url` y `gallery_urls` con las URLs del bucket
