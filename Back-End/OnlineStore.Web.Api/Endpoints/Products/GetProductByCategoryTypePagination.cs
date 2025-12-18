using Application.Abstractions.Messaging;
using Application.Products.GetByCategoryPagination;
using Domain.Categories;
using Microsoft.AspNetCore.Mvc;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Products;

internal sealed class GetProductByCategoryTypePagination : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("api/products/{categoryId:int}", Handler)
            .WithTags(Tags.Products)
            .WithName("GetProductByCategoryTypePagination")
            .RequireAuthorization();
    }
    
    private async Task<IResult> Handler(
        int categoryId,
        [FromQuery] int page,
        [FromQuery] int size,
        IQueryHandler<GetProductByCategoryTypePaginationQuery, List<ProductResponse>> handler,
        CancellationToken cancellationToken)
    {
        Dictionary<string, string[]> validationErrors = new();
        
        if (categoryId <= 0 || categoryId > CategoryTypes.LastCategoryTypeValue)
        {
            validationErrors.Add(key: "categoryId", value: [ $"Category ID '{categoryId}' does not exist." ]);
        }

        if (page <= 0)
        {
            validationErrors.Add(key: "page", value: [ "Page must be greater than zero." ]);
        }

        if (size is <= 0 or > 100)
        {
            validationErrors.Add(key: "size", value: [ "Size must be between 1 and 100." ]);
        }

        if (validationErrors.Count is not 0)
        {
            HttpValidationProblemDetails problemDetails = new(validationErrors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Validation Error",
                Detail = "One or more validation errors occurred.",
                Instance = "GetProductByCategoryTypePagination",
                Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            };
            
            return Results.Problem(problemDetails);
        }

        GetProductByCategoryTypePaginationQuery query = new(
            CategoryType: (byte)categoryId,
            PageNumber: page,
            PageSize: size);

        Result<List<ProductResponse>> result =
            await handler.Handle(query, cancellationToken);

        return result.Match(Results.Ok, CustomResults.Problem);
    }
}