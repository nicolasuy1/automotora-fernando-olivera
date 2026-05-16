import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mynxdchrmrdhbheqwdpi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bnhkY2hybXJkaGJoZXF3ZHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4OTc4MzYsImV4cCI6MjA5NDQ3MzgzNn0.o4r7W0aqb2XJfkA34BXcQ7ISVMfV5IrX6bivRc7WgDo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
