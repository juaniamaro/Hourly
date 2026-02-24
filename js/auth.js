const SUPABASE_URL = 'https://pfbfpifwzuicwztepvwh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYmZwaWZ3enVpY3d6dGVwdndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MTk4OTcsImV4cCI6MjA4NDQ5NTg5N30.7At1iAHw0DTsx0qe_J_IsQy7E-JXc0G2UB41MMD9xRM';

// Crear cliente Supabase
const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// LOGIN usando función RPC login_trabajador
async function login(email, password){
const { data, error } = await supabaseClient.rpc('login_trabajador', {
  email_input: email,
  password_input: password
});

  console.log('Login RPC data:', data, 'error:', error);

 // Login correcto
if (error || !data || data.error) {
  alert(data?.error || 'Credenciales incorrectas');
  return;
}

// Guardar correctamente
sessionStorage.setItem('user', JSON.stringify(data));
window.location.href = 'dashboard.html';
}
