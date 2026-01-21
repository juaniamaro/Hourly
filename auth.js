const supabaseUrl = 'https://pfbfpifwzuicwztepvwh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYmZwaWZ3enVpY3d6dGVwdndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MTk4OTcsImV4cCI6MjA4NDQ5NTg5N30.7At1iAHw0DTsx0qe_J_IsQy7E-JXc0G2UB41MMD9xRM';

const supabase = supabaseJs.createClient(
  supabaseUrl,
  supabaseKey
);

/* LOGIN */
async function login(email, password){
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if(error){
    alert('Credenciales incorrectas');
    return;
  }

  // Login correcto → dashboard
  window.location.href = 'dashboard.html';
}

/* PROTEGER PÁGINAS */
async function checkSession(){
  const { data:{ session } } = await supabase.auth.getSession();

  if(!session){
    window.location.href = 'index.html';
  }
}

