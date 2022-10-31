using Microsoft.EntityFrameworkCore;

public class TodoListContext : DbContext
{
    public TodoListContext(DbContextOptions<TodoListContext> options) : base(options)
    {
        Database.EnsureCreatedAsync();
    }

    public DbSet<Todo> Todos { get; set; }
}
