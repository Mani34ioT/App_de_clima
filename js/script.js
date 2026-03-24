/*Clase App_clima: Gestiona la lógica, API y DOM (Requisito POO)*/
class WeatherApp {
    constructor() {
        this.urlBase = "https://www.7timer.info/bin/api.pl?";
        this.lugares = [
            { id: 1, nombre: "Limache", lat: -33.01, lon: -71.26, img: "Assets/img/valle.jpg" },
            { id: 2, nombre: "Valparaíso", lat: -33.04, lon: -71.61, img: "Assets/img/playa.jpg" },
            { id: 3, nombre: "Viña del Mar", lat: -33.02, lon: -71.55, img: "Assets/img/playa.jpg" },
            { id: 4, nombre: "Concón", lat: -32.92, lon: -71.51, img: "Assets/img/duna.jpg" },
            { id: 5, nombre: "Quilpué", lat: -33.05, lon: -71.44, img: "Assets/img/bosque.jpg" }
        ];
    }

    // Consumo de API externa con Async/Await 
    async obtenerClima(lat, lon) {
        try {
            const response = await fetch(`${this.urlBase}lon=${lon}&lat=${lat}&product=civil&output=json`);
            if (!response.ok) throw new Error("Error de red");
            return await response.json();
        } catch (error) {
            this.mostrarError("Error al conectar con el servidor.");
            return null;
        }
    }

    // Lógica de Alertas de Clima 
    analizarDatos(datos) {
        const actual = datos.dataseries[0];
        const temp = actual.temp2m;
        let alerta = "☀️ Clima Estable";
        if (temp > 25) alerta = "🔥 Alerta: Calor Elevado";
        if (temp < 12) alerta = "❄️ Alerta: Frío Intenso";
        return { temp, alerta };
    }

    // Renderizado del Home
    async renderizarHome() {
        const contenedor = document.getElementById('lista-lugares');
        if (!contenedor) return;
        
        let htmlFinal = "";
        for (const lugar of this.lugares) {
            const data = await this.obtenerClima(lugar.lat, lugar.lon);
            if (data) {
                const info = this.analizarDatos(data);
                htmlFinal += `
                    <div class="card">
                        <img src="${lugar.img}" alt="${lugar.nombre}" class="card-img-top">
                        <div class="card-body">
                            <h3>${lugar.nombre}</h3>
                            <p class="temp-text">${info.temp}°C</p>
                            <span class="badge-alerta">${info.alerta}</span>
                            <button onclick="miApp.verDetalle(${lugar.id})" class="btn-primary">Ver Detalles</button>
                        </div>
                    </div>`;
            }
        }
        contenedor.innerHTML = htmlFinal;
    }

    // Renderizado de Vista de Detalle
    async verDetalle(id) {
        document.getElementById('home-view').style.display = 'none';
        document.getElementById('detail-view').style.display = 'block';
        const lugar = this.lugares.find(l => l.id === id);
        const contenedor = document.getElementById('detalle-contenido');
        contenedor.innerHTML = "<p>Cargando clima real...</p>";
        
        const data = await this.obtenerClima(lugar.lat, lugar.lon);
        if (data) {
            const info = this.analizarDatos(data);
            contenedor.innerHTML = `
                <div class="detalle-container">
                    <img src="${lugar.img}" class="img-detalle" style="width:100%; border-radius:10px;">
                    <div class="info-box">
                        <h2>${lugar.nombre}</h2>
                        <p><strong>Temperatura:</strong> ${info.temp}°C</p>
                        <p><strong>Estado:</strong> ${info.alerta}</p>
                        <p><strong>Sugerencia:</strong> ${info.temp > 25 ? 'Usa bloqueador solar.' : 'Lleva un abrigo liviano.'}</p>
                        <button onclick="miApp.mostrarHome()" class="btn-primary">Volver al Inicio</button>
                    </div>
                </div>`;
        }
    }

    mostrarHome() {
        document.getElementById('home-view').style.display = 'block';
        document.getElementById('detail-view').style.display = 'none';
    }

    mostrarError(msg) {
        const c = document.getElementById('lista-lugares');
        if (c) c.innerHTML = `<p class="error-msg">${msg}</p>`;
    }
}

// Inicialización de la clase principal
const miApp = new WeatherApp();
miApp.renderizarHome();