const {createClient} = supabase
console.log(supabase)

const supabaseUrl = 'https://cmwulbrptuavdtjnrrth.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtd3VsYnJwdHVhdmR0am5ycnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwODI3NzMsImV4cCI6MjA1NDY1ODc3M30.n0mMYYZc28Oc4pFgZsRRSVy1yE5lDil8kdnOfscA2Uc'
const supabaseClient = createClient(supabaseUrl, supabaseKey)


window.supabase = supabaseClient 