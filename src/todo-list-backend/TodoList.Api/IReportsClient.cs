using System.Collections.Generic;
using System.Threading.Tasks;

public interface IReportsClient
{
    Task<IEnumerable<string>> GetReport(IEnumerable<Todo> todos);
}
