

function getTheme() {

    const hour = new Date().getHours();



    if (hour >= 6 && hour < 12) {

        return {

            bg: '#D6A000',

            colors: [
                '#FFF0A6',
                '#FCF1BB',
                '#FCFADC'
            ]

        };

    }


    if (hour >= 12 && hour < 20) {

        return {

            bg: '#5A0F14',

            colors: [
                '#FF4D6D',
                '#C9184A',
                '#FF758F'
            ]

        };

    }



    return {

        bg: '#1B003B',

        colors: [
            '#8E2DE2',
            '#C33764',
            '#5F0F99'
        ]

    };

}


const theme = getTheme();

document.body.style.background = theme.bg;

const colors = theme.colors;




function updateClock() {

    const now = new Date();


    const date = now.toLocaleDateString(
        'es-ES',
        {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        }
    );


    const time = now.toLocaleTimeString(
        'es-ES'
    );


    document.getElementById('clock')
        .textContent =
        `${date} · ${time}`;

}


setInterval(
    updateClock,
    1000
);

updateClock();



function updateClockO() {

    const seconds =
        new Date().getSeconds();


    const hand =
        document.getElementById('secHand');


    hand.setAttribute(
        'transform',
        `rotate(${seconds * 6})`
    );

}


setInterval(
    updateClockO,
    1000
);

updateClockO();



const canvas =
    document.getElementById('bg');


const ctx =
    canvas.getContext('2d');


let width;
let height;



function resizeCanvas() {

    width =
        canvas.width =
        window.innerWidth;


    height =
        canvas.height =
        window.innerHeight;

}


window.addEventListener(
    'resize',
    resizeCanvas
);


resizeCanvas();



class Wave {

    constructor(
        frequency,
        amplitude,
        phase
    ) {

        this.frequency =
            frequency;

        this.amplitude =
            amplitude;

        this.phase =
            phase;

    }

}


const waves = [

    new Wave(
        0.008,
        25,
        0
    ),

    new Wave(
        0.01,
        30,
        50
    ),

    new Wave(
        0.012,
        20,
        100
    )

];



function drawWaves(time) {

    ctx.globalAlpha = 0.25;


    waves.forEach(
        wave => {

            ctx.beginPath();


            for (
                let x = 0;
                x < width;
                x++
            ) {

                const y =
                    height * 0.85 +

                    Math.sin(
                        x * wave.frequency +
                        time * 0.002 +
                        wave.phase
                    ) *
                    wave.amplitude;


                if (x === 0) {

                    ctx.moveTo(
                        x,
                        y
                    );

                } else {

                    ctx.lineTo(
                        x,
                        y
                    );

                }

            }


            ctx.lineTo(
                width,
                height
            );


            ctx.lineTo(
                0,
                height
            );


            ctx.closePath();


            ctx.fillStyle =
                colors[0] + '33';


            ctx.fill();

        }
    );


    ctx.globalAlpha = 1;

}


function animate(time) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    drawWaves(time);


    requestAnimationFrame(
        animate
    );

}


requestAnimationFrame(
    animate
);



async function getWeather() {

    const weatherElement =
        document.getElementById(
            'weather'
        );




    if (!navigator.geolocation) {

        weatherElement.innerHTML =
            '📍 La geolocalización no está disponible';

        return;

    }



    navigator.geolocation.getCurrentPosition(

        async function (position) {

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            try {

                const weatherResponse =
                    await fetch(

                        `https://api.open-meteo.com/v1/forecast` +

                        `?latitude=${latitude}` +

                        `&longitude=${longitude}` +

                        `&current=temperature_2m,apparent_temperature,weather_code` +

                        `&timezone=auto`

                    );


                const weatherData =
                    await weatherResponse.json();


                const temperature =
                    Math.round(
                        weatherData.current
                            .temperature_2m
                    );


                const feelsLike =
                    Math.round(
                        weatherData.current
                            .apparent_temperature
                    );


                const weatherCode =
                    weatherData.current
                        .weather_code;


                const weatherText =
                    getWeatherText(
                        weatherCode
                    );


                let locationName =
                    'Ubicación detectada';


                try {

                    const locationResponse =
                        await fetch(

                            `https://geocoding-api.open-meteo.com/v1/reverse` +

                            `?latitude=${latitude}` +

                            `&longitude=${longitude}` +

                            `&language=es`

                        );


                    const locationData =
                        await locationResponse.json();


                    if (
                        locationData &&
                        locationData.results &&
                        locationData.results.length > 0
                    ) {

                        const place =
                            locationData.results[0];


                        locationName =
                            place.name ||
                            place.admin1 ||
                            'Ubicación detectada';

                    }

                } catch (error) {

                    console.log(
                        'No se pudo obtener el nombre de la ciudad',
                        error
                    );

                }


  

                weatherElement.innerHTML = `

                    <div class="location">
                        📍 ${locationName}
                    </div>

                    <div>
                        ${weatherText} · ${temperature} °C
                    </div>

                    <div class="weather-feels-like">
                        Sensación ${feelsLike} °C
                    </div>

                `;


            } catch (error) {

                console.error(
                    'Error obteniendo el tiempo:',
                    error
                );


                weatherElement.textContent =
                    '🌤️ No se ha podido obtener el tiempo';

            }

        },



        function (error) {

            console.error(
                'Error de geolocalización:',
                error
            );


            if (error.code === 1) {

                weatherElement.innerHTML =
                    '📍 Permiso de ubicación rechazado';

            }


            else if (error.code === 2) {

                weatherElement.innerHTML =
                    '📍 No se pudo determinar tu ubicación';

            }


            else if (error.code === 3) {

                weatherElement.innerHTML =
                    '📍 Tiempo de espera agotado';

            }


            else {

                weatherElement.innerHTML =
                    '📍 No se pudo detectar la ubicación';

            }

        },



        {

            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 300000

        }

    );

}



function getWeatherText(code) {

    if (code === 0) {

        return '☀️ Despejado';

    }


    if ([1, 2, 3].includes(code)) {

        return '⛅ Parcialmente nublado';

    }


    if ([45, 48].includes(code)) {

        return '🌫️ Niebla';

    }


    if (
        [51, 53, 55, 56, 57]
            .includes(code)
    ) {

        return '🌦️ Llovizna';

    }


    if (
        [61, 63, 65, 66, 67]
            .includes(code)
    ) {

        return '🌧️ Lluvia';

    }


    if (
        [71, 73, 75, 77]
            .includes(code)
    ) {

        return '❄️ Nieve';

    }


    if (
        [80, 81, 82]
            .includes(code)
    ) {

        return '🌦️ Chubascos';

    }


    if (
        [95, 96, 99]
            .includes(code)
    ) {

        return '⛈️ Tormenta';

    }


    return '🌤️ Tiempo variable';

}




const loginForm =
    document.getElementById(
        'loginForm'
    );


loginForm.addEventListener(
    'submit',
    function (event) {

        event.preventDefault();


        const email =
            document.getElementById(
                'email'
            )
            .value
            .trim();


        const password =
            document.getElementById(
                'password'
            )
            .value;


        if (!email || !password) {

            showLoginMessage(
                'Introduce el correo y la contraseña.'
            );

            return;

        }


        login(
            email,
            password
        );

    }
);



function showLoginMessage(message) {

    const element =
        document.getElementById(
            'loginMessage'
        );


    element.textContent =
        message;

}


getWeather();
