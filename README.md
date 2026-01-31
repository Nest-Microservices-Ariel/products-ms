<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


## Steps
- Install dependencies ```$ yarn install ```
- Create .env file based on .env.template
- Run ``` $ npx prisma migrate dev --name init ```
- Run ``` $ npx prisma generate ```
- Run ``` $ yarn start:dev ```

## Documentacion utilizada para sql lite
https://docs.nestjs.com/recipes/prisma
- Nota: Relacionada a las regeneracionde la base de datos para que en vs code tome los cambios
- Modificado el schema de prisma y guardado correr ``` $ npx prisma migrate dev --name "nombre de la migracio" ```
- Ejecutar ``` $ npx prisma generate ``` para que tome los nuevos cambios el servicio

## Convert to microservice
https://docs.nestjs.com/microservices/basics

## Manejo de excepciones
https://docs.nestjs.com/microservices/exception-filters