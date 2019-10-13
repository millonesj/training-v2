# Training-v2

## Como correr el proyecto:

```
git clone https://github.com/Krowdy/training-v2.git
cd training-v2

npm install
npm run start
```
I can use `npm run start` or
```
node index.js
```
if you have installed nodemon in global mode run ` nodemon index.js`

## Tecnologias que usaremos:

- Express
- MongoDB
- Passport
- Hapi 

## Docs 

### Primera clase:

- ¿Qué es exactamente un API? :

https://medium.com/@perrysetgo/what-exactly-is-an-api-69f36968a41f

- Verbos(GET, POST, PUT, etc), HTTP, URLS, API REST explicado con ejemplos:

https://code.tutsplus.com/tutorials/a-beginners-guide-to-http-and-rest--net-16340


- Por que es importante validar nuestros datos:

https://www.quora.com/Why-is-data-validation-important



### Segunda clase:
- https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec 
- https://www.syslog-ng.com/community/b/blog/posts/why-logging-is-important
- https://www.youtube.com/watch?v=o9hT7v0OLJc


## Retos:

### Semana 1:

Hacer las routas CRUD para el resource 'users'. El usuario debe tener los campos `name`, `id`, `nickname`. 
Tener en cuenta que ahora los productos deberan tener un campo `owner`. 
Hacer la lógica correspondiente para validar que los productos tengan un owner al crearlos, que solo el mismo owner pueda modificar el producto y que solo el mismo owner pueda eliminar su producto.
