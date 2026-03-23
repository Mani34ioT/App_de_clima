# App de Clima - Módulo 4: Lógica y Estadísticas

Temática
Ruta de las Playas de Chile.

### Modelado de Datos
Los datos están organizados en un arreglo de objetos llamado `lugares`. Cada objeto contiene:
- `id`, `nombre`, `tempActual` y `estadoActual`.
- `pronostico Semanal`: Un arreglo de 7 objetos con `dia`, `min`, `max` y `estado`.

### Lógica de Estadísticas
La aplicación calcula dinámicamente:
1. Temperaturas: Mínima absoluta, máxima absoluta y el promedio térmico de los 7 días.
2. Conteo: Cantidad de días según su estado (Soleado, Nublado, Lluvioso).
3. Resumen Inteligente: Mediante condicionales, genera un mensaje personalizado basado en la predominancia del clima.

Repositorio
[Enlace a tu GitHub aquí]