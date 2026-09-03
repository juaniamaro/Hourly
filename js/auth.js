

const SUPABASE_URL =
    'https://zcaoypeekzadnrlslzey.supabase.co';


const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYW95cGVla3phZG5ybHNsemV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2Nzg0MzgsImV4cCI6MjEwMzI1NDQzOH0.jhRakMwqe8_0BduUf2IryXZrMkkZa3AprWocr-cAs_E';


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


async function login(
    email,
    password
) {

    const button =
        document.getElementById(
            'loginButton'
        );


    const message =
        document.getElementById(
            'loginMessage'
        );


    try {

        button.disabled = true;

        button.textContent =
            'Iniciando sesión...';


        message.textContent = '';


        const {
            data,
            error
        } =
            await supabaseClient.auth
                .signInWithPassword({

                    email: email,

                    password: password

                });


        if (error) {

            throw error;

        }


        console.log(
            'Usuario autenticado:',
            data.user
        );


        window.location.href =
            'pages/dashboard.html';


    } catch (error) {

        console.error(
            'Error de login:',
            error
        );


        message.textContent =
            'Correo o contraseña incorrectos.';


        button.disabled = false;

        button.textContent =
            'Iniciar sesión';

    }

}
