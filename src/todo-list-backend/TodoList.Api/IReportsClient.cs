using System.Collections.Generic;
using System.Threading.Tasks;

namespace TodoList.Api;

public interface IReportsClient
{
    Task<IEnumerable<string>> GetReport(IEnumerable<Todo> todos);
}
