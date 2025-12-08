using System.Reflection;
using Application;
using Infrastructure;
using Web.Api;
using Web.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//builder.Services.AddSwaggerGenWithAuth(); // It will enable Swagger.
builder.Services
    .AddApplication()
    .AddPresentation()
    .AddInfrastructure(builder.Configuration);

builder.Services.AddEndpoints(Assembly.GetExecutingAssembly());

var app = builder.Build();

app.MapEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler();
app.UseAuthentication();
app.UseAuthorization();

await app.RunAsync();

// Required for functional and integration tests to work.
namespace Web.Api
{
    public partial class Program;
}