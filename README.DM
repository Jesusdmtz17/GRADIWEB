# Gradiweb Page By Jesus Martinez

Pagina web desarrollada con HTML5, Vanilla JS y CSS3, se consume los recursos provenientes de la api de un producto suministrado por GradiWeb.
Se contruye la estructura principal de la pagina en HTML5, luego se procese a agregar la información del producto con la información obtenida de la api y se construyen todos los metodos necesarios para simular el proceso de compra de un producto.
Se agregó un popup notification para mostrar el contenido resumido de la variación seleccionada del producto al agregarlo al carro o a la lista de favoritos.

Este desarrollo se puede optimizar codificando directamente en las secciones del tema en shopify utilizando el lenguaje liquid para montar toda la información de manera directa.



Observaciones:
Intenté agregar la propiedad srcset a las imagenes principales del carrusel de imagenes del producto 
pero noté que las imagenes que vienen desde la api del producto no tienen un tamaño adecuado para mostrar
una pantalla retina, intenté agregar el filtro de imagenes de shopify para hacer que en pantallas normales
la imagen se viera de 600px de ancho y el una pantalla retina al doble del tamaño para que no se viera mal anajo el ejemplo
`srcset="${image.replace('.jpg','_600x.jpg')} 1x, ${image.replace('.jpg','_1200x.jpg')} 2x"`
este codigo se puede usar en la funcion "initializeImages" del objeto GradiWebApp siempre y cuando las imagenes cumplan con un tamaño apropiado.

Se utilizó Flickity para la construcción de los sliders para las imagenes del producto
## Installation

Al ser un proyecto escrito con lenguajes no compilados no es necesario instalar complementos antes de su ejecución.
    
## Run Locally

Para correr el proyecto de manera local solo es necesario ingregar a la raiz del proyecto y ubicar el archivo index.html luego abrir el mismo con el navegador de su preferencia.

Se debe tener acceso a internet para poder consumir los recursos de la api suministrada por GradiWeb y cargar la tipografia agregadad al proyecto.
## Support

Para recibir soporte, enviar un email a jesusdmtz17@gmail.com

