# Proyecto InfoGuaguas
## Integrantes

- Juan Francisco Almeida Santana
- Ibaute Vega Gil
- Andrés Barroso Soriano

Grupo 44_6 de prácticas de laboratorio de Programación Web y Móvil (ULPGC | EII 2025/26)

## Descripción

InfoGuaguas es un sitio web pensado para los usuarios de transporte público en 
Las Palmas de Gran Canaria, orientado al servicio de Guaguas Municipales, con el fin
de que exista una web simple y fácil de utilizar, donde se encuentre toda la información
necesaria para todo usuario de Guaguas Municipales, incluyendo servicios personalizados para
cada Usuario, de forma que se ajuste a sus necesidades.

Los usuarios que accedan al sitio web podrán obtener información sobre las diferentes líneas y
paradas en servicio, además de poder acceder a información sobre los bonos disponibles y
un apartado de noticias relevantes al servicio. Todos los usuarios registrados pueden acceder
a la misma información pero de una forma más personalizada.


## Mockups (para todos los dispositivos) y Storyboard
En la carpeta /mockups existe un documento pdf con todos los mockups y diferentes storyboards.
[Acceso al documento](./mockups/Mockups%20y%20Storyboard.pdf).

Se han creado diferentes mockups adaptados a las dimensiones de diferentes dispositivos, todos ellos se encuentran en la
carpeta /mockups/responsive/, siguiendo el siguiente [enlace](https://github.com/kikoalmtana/PWM/tree/sprint-2/mockups/responsive).

## Páginas HTML

En esta sección se listan las diferentes páginas implementadas en HTML a partir 
de los diferentes mockups realizados previamente

- **index.html** <==> 0-main.png
- **/html/lines.html** <==> 1.0-lines-page.png
- **/html/line-info.html** <==> 1.1-lines-info.png
- **/html/stops.html** <==> 2-stops.png
- **/html/news.html** <==> 3.0-news-page.png
- **/html/new.html** <==> 3.1-new-page.png
- **/html/select-pass.html** <==> 4.0-select-pass-page.png
- **/html/pass-info.html** <==> 4.1-pass-info.png
- **/html/about-us.html** <==> 5-about-us-page.png
- **/html/login.html** <==> 6.0-login-page.png
- **/html/register.html** <==> 6.1-create-account-page.png
- **/html/user-info.html** <==> 6.2.0-user-info-page.png
- **/html/user-edit.html** <==> 6.2.1-user-settings-page.png
- **/html/add-pass.html** <==> 6.2.2-add-pass-page.png

Nota: index.html es la página principal del sitio web (homepage)

## Aspectos responsive

Para todas las páginas HTML se han implementado mediante Media Queries los diferentes diseños elaborados con Figma y representados
en los diferentes mockups para diseños responsive. 

Un cambio que se realiza en todas las páginas es en el header, que se contrae de forma que se crea una vista limpia del header
dejando sólamente el logo y un desplegable con todos los enlaces que se encontraban en él previamente. Además de eso, algunas páginas sufren cambios más significativos que otras:

En general todas las páginas adaptan la disposición de sus elementos y el tamaño de sus textos a las dimensiones de la pantalla

## Carga de templates

Todas las páginas del proyecto utilizan carga de templates (como mínimo cargan el header y el footer del sitio web, que es igual
para todas las páginas). La carga de templates se realiza utilizando el script /js/templateLoader.js

## Carga de datos

La carga de datos se realiza en los diferentes ficheros .js creados para cada página, donde se maneja la carga de los datos desde la API (usando un JSON-server)
y la incrustación de los mismos en la página respetando los estilos aplicados en las mismas

Las páginas que tienen carga de datos desde la API son:

- Homepage (index.html)
- Página de noticias (news.html)
- Página de información sobre una noticia (new.html)
- Página de líneas (lines.html)
- Página con información de una línea (line-info.html)
- Página de información de usuario (user-info.html)
- Página de información de un bono (pass-info.html)

## Validación de formularios

Para la validación de formularios se utilizan tanto validaciones HTML5 como validaciones custom:

Validaciones HTML5:

- valueMissing (required)
- tooShort (minlenght)
- tooLong (maxlenght)
- typeMismatch (type)
- patternMismatch (pattern)

Validaciones custom (funciones implementadas con JavaScript):

- Validación de coincidencia entre campos
- Validación de DNI

## Ubicación del contenido JSON

Para cargar los datos se ha implementado un fichero db.json el cual contiene toda la información a cargar, ordenada como una base de datos.
Para cargar los datos se despliega un fake-server utilizando JSON server que escucha por el puerto 3000. La especificación y comando de lanzamiento
del servidor se encuentra en el fichero package.json.

Para lanzar servidor (teniendo instalado Node.js y pudiendo utilizar npm) se ejecuta el comando "npm run api" de forma que se despliega
el contenido del JSON en un servidor local alojado en la direccion "http://localhost:3000/"

El servidor cuenta con los siguientes endpoints:
- http://localhost:3000/usuarios
- http://localhost:3000/lineas
- http://localhost:3000/paradas
- http://localhost:3000/noticias
- http://localhost:3000/avisos-de-linea
