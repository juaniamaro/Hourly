

const SUPABASE_URL =
    'TU_SUPABASE_URL';


const SUPABASE_ANON_KEY =
    'TU_SUPABASE_ANON_KEY';


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
