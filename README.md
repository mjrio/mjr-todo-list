# mjr-todo-list

## Run on Docker Desktop

1. Build todo-list-api:

    ```
    cd src/todo-list-api
    docker build -t todo-list-api .
    ```

2. Create network:
    ``` 
    docker network create todo-list-network
    ```

3. Run todo-list-db and todo-list-api:
    ```
    docker run --name todo-list-db -e POSTGRES_PASSWORD=password -dp 5432:5432 --net todo-list-network postgres
    ```
    ```
    docker run --name todo-list-api -dp 5166:5166 --net todo-list-network todo-list-api
    ```