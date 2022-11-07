# mjr-todo-list

## Architecture

![Todo List Architecture](docs/todo-list-architecture.png)

## Getting started

### Run on Docker Desktop

1. Build todo-list-reports-api, todo-list-api and todo-list-app:

    ```
    docker build -t todo-list-reports-api ./src/todo-list-backend/TodoList.Reports.Api
    ```

    ```
    docker build -t todo-list-api ./src/todo-list-backend/TodoList.Api
    ```

    ```
    docker build -t todo-list-app ./src/todo-list-frontend
    ```

2. Create network:

    ``` 
    docker network create todo-list-network
    ```

3. Create volume:

   ```
   docker volume create todo-list-db-volume
   ```

3. Run todo-list-db, todo-list-reports-api, todo-list-api and todo-list-app:

    ```
    docker run --name todo-list-db -e POSTGRES_PASSWORD=password -e PGDATA=/var/lib/postgresql/data/pgdata -v todo-list-db-volume:/var/lib/postgresql/data -dp 5432:5432 --net todo-list-network postgres:15.0-alpine
    ```

    ```
    docker run --name todo-list-reports-api -dp 5218:5218 --net todo-list-network todo-list-reports-api
    ```

    ```
    docker run --name todo-list-api -e Reports__Address=http://todo-list-reports-api:5218 -dp 5166:5166 --net todo-list-network todo-list-api
    ```

    ```
    docker run --name todo-list-app -dp 8080:80 --net todo-list-network todo-list-app
    ```