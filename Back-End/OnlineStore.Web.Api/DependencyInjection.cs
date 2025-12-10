using Web.Api.Infrastructure;

namespace Web.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        //services.AddSwaggerGen(); // If i need to see the documentation of my APIs.

        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();

        string myLocalServerAddressHttps = "https://localhost:7044";
        string myLocalServerAddressHttp = "http://localhost:5145";
        
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",policy =>
                {
                    policy.WithOrigins(myLocalServerAddressHttps, myLocalServerAddressHttp)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                }
            );
        });
        
        return services;
    }
}