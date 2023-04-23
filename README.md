### Comandos

Geração da migration Products
```sh
npm run typeorm migration:create -- -n CreateProducts
```

Execução do ambiente Dev
```sh
$ npm run dev
```

Criação container postgres
```sh
docker run -d --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
---
### Anotações
- Toda chamada que vai utilizar o BD utilizar o await




