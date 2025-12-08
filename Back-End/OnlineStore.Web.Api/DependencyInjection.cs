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
        
        return services;
    }
}