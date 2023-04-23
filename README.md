Geração da migration Products:
npm run typeorm migration:create -- -n CreateProducts

Execução do ambiente Dev
npm run dev

Criação container postgres
docker run -d --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Toda chamada que vai utilizar o BD utilizar o await




