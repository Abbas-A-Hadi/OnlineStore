using Application.Abstractions.Messaging;
using Application.Products.GetAll;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Products;

internal sealed class GetAll : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("products/", async (
                IQueryHandler<GetAllProductsQuery, List<ProductResponse>> handler,
                CancellationToken cancellationToken) =>
            {
                Result<List<ProductResponse>> result =
                    await handler.Handle(query: new GetAllProductsQuery(), cancellationToken);

                return result.Match(Results.Ok, CustomResults.Problem);
            })
            .WithTags(Tags.Products)
            .WithName("GetAllProducts")
            //.RequireAuthorization()
            ;
    }
}