// 1. Modelo de Datos con Rutas de Imágenes
const lugares = [
    {
        id: 1,
        nombre: "Playa del Viento",
        imagen: "Assets/img/playa.jpg", // Ruta según tu estructura
        tempActual: 22,
        estadoActual: "Soleado",
        pronosticoSemanal: [
            { dia: "Lunes", min: 18, max: 24, estado: "Soleado" },
            { dia: "Martes", min: 17, max: 23, estado: "Nublado" },
            { dia: "Miércoles", min: 15, max: 20, estado: "Lluvioso" },
            { dia: "Jueves", min: 19, max: 25, estado: "Soleado" },
            { dia: "Viernes", min: 20, max: 26, estado: "Soleado" },
            { dia: "Sábado", min: 18, max: 22, estado: "Nublado" },
            { dia: "Domingo", min: 16, max: 21, estado: "Lluvioso" }
        ]
    },
    {
        id: 2,
        nombre: "Montaña Nevada",
        imagen: "Assets/img/montaña.jpg",
        tempActual: 5,
        estadoActual: "Nieve",
        pronosticoSemanal: [
            { dia: "Lunes", min: -2, max: 4, estado: "Nublado" },
            { dia: "Martes", min: -5, max: 2, estado: "Lluvioso" },
            { dia: "Miércoles", min: -8, max: 0, estado: "Lluvioso" },
            { dia: "Jueves", min: -3, max: 3, estado: "Nublado" },
            { dia: "Viernes", min: -1, max: 5, estado: "Soleado" },
            { dia: "Sábado", min: 0, max: 6, estado: "Soleado" },
            { dia: "Domingo", min: -2, max: 4, estado: "Nublado" }
        ]
    },
    {
        id: 3,
        nombre: "Valle Central",
        imagen: "Assets/img/valle.jpg",
        tempActual: 28,
        estadoActual: "Despejado",
        pronosticoSemanal: [
            { dia: "Lunes", min: 20, max: 30, estado: "Soleado" },
            { dia: "Martes", min: 22, max: 32, estado: "Soleado" },
            { dia: "Miércoles", min: 21, max: 31, estado: "Soleado" },
            { dia: "Jueves", min: 23, max: 33, estado: "Soleado" },
            { dia: "Viernes", min: 20, max: 28, estado: "Nublado" },
            { dia: "Sábado", min: 19, max: 27, estado: "Nublado" },
            { dia: "Domingo", min: 21, max: 30, estado: "Soleado" }
        ]
    },
    {
        id: 4,
        nombre: "Bosque Húmedo",
        imagen: "Assets/img/bosque.jpg",
        tempActual: 15,
        estadoActual: "Lluvia",
        pronosticoSemanal: [
            { dia: "Lunes", min: 12, max: 18, estado: "Lluvioso" },
            { dia: "Martes", min: 11, max: 17, estado: "Lluvioso" },
            { dia: "Miércoles", min: 10, max: 16, estado: "Lluvioso" },
            { dia: "Jueves", min: 13, max: 19, estado: "Nublado" },
            { dia: "Viernes", min: 12, max: 18, estado: "Lluvioso" },
            { dia: "Sábado", min: 14, max: 20, estado: "Soleado" },
            { dia: "Domingo", min: 11, max: 17, estado: "Lluvioso" }
        ]
    },
    {
        id: 5,
        nombre: "Duna Dorada",
        imagen: "Assets/img/duna.jpg",
        tempActual: 32,
        estadoActual: "Soleado",
        pronosticoSemanal: [
            { dia: "Lunes", min: 25, max: 38, estado: "Soleado" },
            { dia: "Martes", min: 26, max: 39, estado: "Soleado" },
            { dia: "Miércoles", min: 24, max: 37, estado: "Soleado" },
            { dia: "Jueves", min: 25, max: 38, estado: "Soleado" },
            { dia: "Viernes", min: 27, max: 40, estado: "Soleado" },
            { dia: "Sábado", min: 26, max: 39, estado: "Soleado" },
            { dia: "Domingo", min: 25, max: 38, estado: "Soleado" }
        ]
    }
];

// 2. Función para buscar lugar por ID
function obtenerLugarPorId(id) {
    return lugares.find(l => l.id === id);
}

// 3. Función para calcular estadísticas
function calcularEstadisticas(pronostico) {
    if (!pronostico || pronostico.length === 0) return null;
    let sumaTemp = 0;
    let minSemanal = pronostico[0].min;
    let maxSemanal = pronostico[0].max;
    let conteoClima = { Soleado: 0, Nublado: 0, Lluvioso: 0 };

    for (let dia of pronostico) {
        sumaTemp += (dia.min + dia.max) / 2;
        if (dia.min < minSemanal) minSemanal = dia.min;
        if (dia.max > maxSemanal) maxSemanal = dia.max;
        if (conteoClima[dia.estado] !== undefined) conteoClima[dia.estado]++;
    }

    const promedio = (sumaTemp / pronostico.length).toFixed(1);
    let resumen = "Semana con clima variado.";
    if (conteoClima.Soleado >= 4) resumen = "Semana mayormente soleada.";
    else if (conteoClima.Lluvioso >= 3) resumen = "Semana fría con varias lluvias.";

    return { minSemanal, maxAbs: maxSemanal, promedio, resumen, conteoClima };
}

// 4. Modificación: Renderizar Home con imágenes en miniatura
function renderizarHome() {
    const contenedor = document.getElementById('lista-lugares');
    contenedor.innerHTML = ""; 

    lugares.forEach(lugar => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${lugar.imagen}" alt="${lugar.nombre}" class="card-img">
            <h3>${lugar.nombre}</h3>
            <p>Actual: ${lugar.tempActual}°C - ${lugar.estadoActual}</p>
            <button onclick="verDetalle(${lugar.id})">Ver Pronóstico</button>
        `;
        contenedor.appendChild(card);
    });
}

// 5. Modificación: Vista de Detalle con Imagen Principal
function verDetalle(id) {
    const lugar = obtenerLugarPorId(id);
    const stats = calcularEstadisticas(lugar.pronosticoSemanal);
    
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';

    const contenido = document.getElementById('detalle-contenido');
    contenido.innerHTML = `
        <h2>${lugar.nombre}</h2>
        <img src="${lugar.imagen}" alt="${lugar.nombre}" class="detail-img">
        <div class="stats-box">
            <h3>Estadísticas Semanales</h3>
            <p>Mínima: ${stats.minSemanal}°C | Máxima: ${stats.maxAbs}°C</p>
            <p>Promedio: ${stats.promedio}°C</p>
            <p>Días Soleados: ${stats.conteoClima.Soleado} | Lluviosos: ${stats.conteoClima.Lluvioso}</p>
            <p><strong>Resumen:</strong> ${stats.resumen}</p>
        </div>
    `;
}

function mostrarHome() {
    document.getElementById('home-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
}

renderizarHome();