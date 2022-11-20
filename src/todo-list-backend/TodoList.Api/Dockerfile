FROM mcr.microsoft.com/dotnet/sdk:6.0 AS publish
WORKDIR /src
COPY TodoList.Api.csproj TodoList.Api/
RUN dotnet restore TodoList.Api/TodoList.Api.csproj
COPY . TodoList.Api/
WORKDIR /src/TodoList.Api
RUN dotnet publish TodoList.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 5166
ENTRYPOINT ["dotnet", "TodoList.Api.dll"]