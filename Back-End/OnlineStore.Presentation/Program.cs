using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.IdentityModel.Tokens;
using Presentation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            IssuerSigningKey = new SymmetricSecurityKey(builder.Configuration["Jwt:Key"]!.Select(c =>  Convert.ToByte(c)).ToArray()),
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidateAudience = true,
        };
    });

builder.Services.AddSingleton<TokenGenerator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapPost("/login", (LoginRequest request, TokenGenerator tokenGenerator) =>
{
    return new
    {
        access_token = tokenGenerator.GenerateToken(Guid.NewGuid(), request.Email),
        
    };
});

app.MapGet("/messages", () =>
    {
        return new
        {
            message = "Hello World, you are authorized",
        };
    })
    .RequireAuthorization()
    .WithName("HelloWorld");

app.Run();