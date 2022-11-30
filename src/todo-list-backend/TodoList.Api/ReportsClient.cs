using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;

namespace TodoList.Api;

public class ReportsClient : IReportsClient
{
    private readonly HttpClient _httpClient;

    public ReportsClient(IConfiguration configuration)
    {
        _httpClient = new HttpClient { BaseAddress = new Uri(configuration["Reports:Address"]) };
    }

    public async Task<IEnumerable<string>> GetReport(IEnumerable<Todo> todos)
    {
        var response = await _httpClient.PostAsJsonAsync("/reports", todos);
        var responseString = await response.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<IEnumerable<string>>(responseString);

        return result;
    }
}