# ruedapinchá

Este proyecto sirve de demostración del kit de desarrollo Vercel AI. Consiste en sugerir la presión de los neumáticos utilizando la IA.
De esta forma nos ahorramos el tener que almacenar los datos de los vehículos y todas sus variantes y obtenemos presiones prácticamente idénticas a las definida en el manual de usuario (o al menos de los vehículos que he probado)

## Uso


Para acceder es necesario disponer de la URL, Api Key y modelo a emplear que sea compatible con el proveedor @ai-sdk/openai. Nada más cargar la aplicación nos va a solicitar estos datos, aunque por defecto recomienda usar el proveedor groq y el modelo llama-3.1-70b-versatile ya que es el que proporciona mejor información de los probados.

Una vez introducidos los datos y pulsar en guardar se muestra una barra de búsqueda dónde introducir los datos del vehículo y en algunos vehículos es capaz de discernir entre carga ligera o pesada. Ahí al buscar el vehículo nos aparecen las presiones del eje delantero y trasero. Por defecto aparecen en la unidad psi, pero se puede cambiar a bares o kilopascales (y se queda guardada la opción en el localStorage)

## URL demo

https://ruedapincha.vercel.app/

## TODO

* Crear tests
