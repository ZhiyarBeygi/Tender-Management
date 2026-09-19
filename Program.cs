using Microsoft.Data.SqlClient;
using TenderManagement.Repositories;
using TenderManagement.Repositories.Interfaces;
using TenderManagement.Services;
using TenderManagement.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<SqlConnection>(sp =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();
    return new SqlConnection(
        configuration.GetConnectionString("DefaultConnection")
    );
});

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
