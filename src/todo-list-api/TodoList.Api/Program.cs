using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors()
                .AddDbContext<TodoListContext>(options => options.UseInMemoryDatabase("TodoListInMemory"));

var app = builder.Build();

app.UseCors(builder => builder.AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowAnyOrigin());

app.MapGet("/", () => "Hello, World!");

app.MapGet("/todos", async (TodoListContext context) =>
{
    var todos = await context.Todos.ToListAsync();

    return todos;
});

app.MapGet("/todos/{id}", async (int id, TodoListContext context) =>
{
    var todo = await context.Todos.FindAsync(id);

    return todo is not null ? Results.Ok(todo) : Results.NotFound();
});

app.MapPost("/todos", async (Todo todo, TodoListContext context) =>
{
    context.Todos.Add(todo);
    await context.SaveChangesAsync();

    return Results.Created($"/todos/{todo.Id}", todo);
});

app.MapPut("/todos/{id}", async (int id, Todo todo, TodoListContext context) =>
{
    var existingTodo = await context.Todos.FindAsync(id);

    if (existingTodo is null)
    {
        return Results.NotFound();
    }

    existingTodo.Description = todo.Description;
    existingTodo.IsDone = todo.IsDone;
    await context.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/todos/{id}", async (int id, TodoListContext context) =>
{
    var todo = await context.Todos.FindAsync(id);

    if (todo is not null)
    {
        context.Todos.Remove(todo);
        await context.SaveChangesAsync();

        return Results.Ok(todo);
    }

    return Results.NotFound();
});

app.Run();