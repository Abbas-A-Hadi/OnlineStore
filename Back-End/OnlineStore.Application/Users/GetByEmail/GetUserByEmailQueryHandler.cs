using Application.Abstractions.Authentication;
using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.Users;
using SharedKernel;

namespace Application.Users.GetByEmail;

internal sealed class GetUserByEmailQueryHandler(IUserRepository userRepository, IUserContext userContext) 
    : IQueryHandler<GetUserByEmailQuery, UserResponse>
{
    public async Task<Result<UserResponse>> Handle(GetUserByEmailQuery query, CancellationToken cancellationToken)
    {
        User? user = await userRepository.GetUserByEmailAsync(query.Email, cancellationToken);

        if (user is null)
        {
            return Result.Failure<UserResponse>(UserErrors.NotFoundByEmail);
        }

        if (user.Id.Value != userContext.UserId)
        {
            return Result.Failure<UserResponse>(UserErrors.Unauthorized());
        }

        return new UserResponse()
        {
            UserId = user.Id.Value,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
        };
    }
}