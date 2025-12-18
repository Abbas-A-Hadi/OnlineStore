using Application.Abstractions.Messaging;
using Application.Products.GetById;
using Domain.Products;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Products;

internal sealed class GetById : IEndpoint
{   
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("api/products/{Id:int}", async (
                int productId,
                IQueryHandler<GetProductByIdQuery, ProductResponse> handler,
                CancellationToken cancellationToken) =>
            {
                GetProductByIdQuery query = new(productId);

                Result<ProductResponse> result = await handler.Handle(query, cancellationToken);

                return result.Match(Results.Ok, CustomResults.Problem);
            })
            .WithTags(Tags.Products)
            .WithName("GetProductById");
    }
}