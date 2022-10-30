using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TodoListContext>(options => options.UseInMemoryDatabase("TodoListInMemory"));

var app = builder.Build();

app.MapGet("/todos", async (TodoListContext context) =>
{
    var todos = await context.Todos.ToListAsync();

    return todos;
});

app.MapGet("/todos/{id}", async (int id, TodoListContext context) =>
{
    var todo = await context.Todos.FindAsync(id);

    return todo != null ? Results.Ok(todo) : Results.NotFound();
});

app.MapPost("/todos", async (Todo todo, TodoListContext context) =>
{
    context.Todos.Add(todo);
    await context.SaveChangesAsync();

    return Results.Created($"/todos/{todo.Id}", todo);
});

app.MapDelete("/todos/{id}", async (int id, TodoListContext context) =>
{
    var todo = await context.Todos.FindAsync(id);

    if (todo != null)
    {
        context.Todos.Remove(todo);
        await context.SaveChangesAsync();

        return Results.Ok(todo);
    }

    return Results.NotFound();
});

app.Run();