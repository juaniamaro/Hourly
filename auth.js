const supabaseUrl = 'https://TU_PROYECTO.supabase.co';
const supabaseKey = 'TU_PUBLIC_ANON_KEY';

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

