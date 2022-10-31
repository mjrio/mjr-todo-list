# mjr-todo-list

## Run on Docker Desktop

1. Build todo-list-api and todo-list-app:

    ```
    cd src/todo-list-api
    docker build -t todo-list-api .
    ```

    ```
    cd src/todo-list-app
    docker build -t todo-list-app .
    ```

2. Create network:
    ``` 
    docker network create todo-list-network
    ```

3. Run todo-list-db, todo-list-api and todo-list-app:
    ```
    docker run --name todo-list-db -e POSTGRES_PASSWORD=password -dp 5432:5432 --net todo-list-network postgres
    ```
    ```
    docker run --name todo-list-api -dp 5166:5166 --net todo-list-network todo-list-api
    ```
    ```
    docker run --name todo-list-app -dp 8080:80 --net todo-list-network todo-list-app
    ```