FROM mcr.microsoft.com/dotnet/sdk:6.0 AS publish
WORKDIR /src
COPY TodoList.Reports.Api.csproj TodoList.Reports.Api/
RUN dotnet restore TodoList.Reports.Api/TodoList.Reports.Api.csproj
COPY . TodoList.Reports.Api/
WORKDIR /src/TodoList.Reports.Api
RUN dotnet publish TodoList.Reports.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 5218
ENTRYPOINT ["dotnet", "TodoList.Reports.Api.dll"]