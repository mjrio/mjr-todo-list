using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using TodoList.Reports.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer()
                .AddSwaggerGen();

var app = builder.Build();

app.UseSwagger()
   .UseSwaggerUI();

app.MapGet("/", () => "Hello, World!");

app.MapPost("/reports", (List<Todo> todos) =>
{
    var report = todos.Select(t => $"To do \"{t.Description}\" is {(t.IsDone ? "done!" : "not done yet.")}");

    return Results.Ok(report);
});

app.Run();
