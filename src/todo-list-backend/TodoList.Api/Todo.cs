using System;

namespace TodoList.Api;

public class Todo
{
    public int Id { get; set; }
    public string Description { get; set; }
    public bool IsDone { get; set; }
    public DateTime CreatedOn { get; set; }
}