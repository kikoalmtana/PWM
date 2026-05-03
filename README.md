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


## Estructura del proyecto web
Nuestro proyecto web se divide en las siguientes carpetas:
- /components
  -  Donde se situan los antiguos templates y los CRUD para firebase
- /guards
  - Para establecer las rutas protegidas
- /models
  - Modelos para establecer los atributos de los distintos CRUD
- /pages
  - Las páginas principales del proyecto web
- /services
  - Los servicios tanto para los CRUD como para la autentificación
## Estructuras de los datos en Firebase

En la base de datos de Firebase alamacenamos 5 colecciones con varios atributos en cada una:

- lineas
  - horarios
  - numero
  - paradas
  - primera_salida
  - segunda_salida
- new
  - author
  - content
  - date
  - description
  - image
  - title
- pass
  - caducidad
  - codigo
  - dni
  - idUsuario
  - saldo
  - tipoBono
  - viajesRealizados
- stop
  - guaguas_en_camino
  - identificador_parada
  - nombre_parada
- users
  - displayName
  - email
  - role
  - uid