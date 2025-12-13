using System.Text;
using Application.Abstractions.Authentication;
using Application.Repository;
using Dapper;
using Infrastructure.Authentication;
using Infrastructure.Database;
using Infrastructure.Database.Categories;
using Infrastructure.Database.DapperSqlMapperTypeHandler;
using Infrastructure.Database.Products;
using Infrastructure.Database.RefreshTokens;
using Infrastructure.Database.Users;
using Infrastructure.Time;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SharedKernel;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        => services
            .AddDapperTypeHandlers()
            .AddServices()
            .AddAuthenticationInternal(configuration)
            .AddAuthorizationInternal();

    private static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddSingleton<ISqlDataAccess, SqlDataAccess>();
        services.AddSingleton<IUserRepository, UserRepository>();
        services.AddSingleton<IRefreshTokenRepository, RefreshTokenRepository>();
        services.AddSingleton<IProductRepository, ProductRepository>();
        services.AddSingleton<ICategoryRepository, CategoryRepository>();
        
        return services;
    }

    private static IServiceCollection AddDapperTypeHandlers(this IServiceCollection services)
    {
        SqlMapper.AddTypeHandler(new DateOnlyTypeHandler());
        SqlMapper.AddTypeHandler(new UserIdTypeHandler());
        SqlMapper.AddTypeHandler(new RefreshTokenIdTypeHandler());
        
        return services;
    }

    private static IServiceCollection AddAuthenticationInternal(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]!)),
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuerSigningKey = true,
                    };
                });

        services.AddHttpContextAccessor();
        services.AddScoped<IUserContext, UserContext>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<ITokenProvider, TokenProvider>();
        services.AddScoped<IRefreshTokenProvider, RefreshTokenProvider>();
        services.AddScoped<IAuthService, AuthService>();
        
        return services;
    }
    
    private const string UserAccessPermission = "users:access"; 

    private static IServiceCollection AddAuthorizationInternal(this IServiceCollection services)
    {
        services.AddAuthorization(options =>
        {
            options.AddPolicy(UserAccessPermission, policy =>
            {
                policy.RequireClaim("permission", UserAccessPermission);
            });
        });
        
        return services;
    }
}