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

## Lista de requisitos funcionales

- Se debe poder acceder a información sobre líneas (horarios, paradas,...) desde la web
- Se debe poder acceder a información sobre paradas (próximas Guaguas,...) desde la web
- Debe existir un apartado de noticias para el usuario
- Se debe poder acceder a información sobre bonos (saldo, viajes realizados...) desde la web
- Debe existir la posibilidad de registrarse e iniciar sesión
- Los usuarios registrados deben poder configurar su cuenta y ver información personalizada (sus bonos disponibles, ...)

## Mockups y Storyboard
En la carpeta /mockups existe un documento pdf con todos los mockups y diferentes storyboards
[Acceso al documento](./mockups/Mockups%20y%20Storyboard.pdf)
## Páginas HTML

En esta sección se listan las diferentes páginas implementadas en HTML a partir 
de los diferentes mockups realizados previamente

- **index.html** <==> 0-main.png
- **/html/lines.html** <==> 1.0-lines-page.png
- **().html** <==> 1.1-lines-info.png
- **/html/stops.html** <==> 2-stops.png
- **/html/news.html** <==> 3.0-news-page.png
- **/html/new.html** <==> 3.1-new-page.png
- **().html** <==> 4.0-select-pass-page.png
- **().html** <==> 4.1-pass-info.png
- **/html/about-us.html** <==> 5-about-us-page.png
- **/html/login.html** <==> 6.0-login-page.png
- **/html/register.html** <==> 6.1-create-account-page.png
- **/html/user-info.html** <==> 6.2.0-user-info-page.png
- **/html/user-edit.html** <==> 6.2.1-user-settings-page.png
- **().html** <==> 6.2.2-add-pass-page.png

Nota: index.html es la página principal del sitio web (homepage)

## Templates

Para los diferentes elementos HTML que se repetían en diferentes páginas se ha optado por
realizar diferentes templates, se localizan todos en el directorio /templates del proyecto

- **aside.html** ==> elemento decorativo para páginas con formularios 
- **footer.html** ==> footer de casi todas las páginas del sitio web
- **header.html** ==> header de casi todas las páginas del sitio web
- **line-button.html** ==> botón de acceso a la información de una línea
- **line-warnings.html** ==> tarjeta que contiene un aviso sobre una línea
- **pass-info.html** ==> elemento que contiene una imagen e información sobre un bono
- **preview-new.html** ==> elemento con una imagen, título y resumen de una noticia