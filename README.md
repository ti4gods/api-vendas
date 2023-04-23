### Comandos

Execução do ambiente Dev
```sh
$ npm run dev
```

Geração da migration Products
```sh
npm run typeorm migration:create -- -n CreateProducts
```

Executando as migrações
```sh
npm run typeorm migration:run
```

Criação container postgres
```sh
docker run -d --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Iniciar container Postgres
```sh
docker start postgres
```

---
### Anotações
- Toda chamada que vai utilizar o BD utilizar o await




