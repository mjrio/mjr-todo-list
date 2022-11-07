using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;

public class ReportsClient : IReportsClient
{
    private readonly HttpClient _httpClient;

    public ReportsClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<string>> GetReport(IEnumerable<Todo> todos)
    {
        var response = await _httpClient.PostAsJsonAsync("/reports", todos);
        var responseString = await response.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<IEnumerable<string>>(responseString);

        return result;
    }
}