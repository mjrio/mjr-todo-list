using Microsoft.EntityFrameworkCore;

namespace TodoList.Api;

public class TodoListContext : DbContext
{
    public TodoListContext(DbContextOptions<TodoListContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Todo> Todos { get; set; }
}