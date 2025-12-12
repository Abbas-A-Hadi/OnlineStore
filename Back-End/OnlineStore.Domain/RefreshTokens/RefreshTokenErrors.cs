using SharedKernel;

namespace Domain.RefreshTokens;

public static class RefreshTokenErrors
{
    public static Error UpdateFailure(Guid refreshTokenId, string token) => Error.Failure(
        "RefreshTokens.UpdateFailure",
        $"RefreshToken with id = '{refreshTokenId}' and token = '{token}' had not updated");
    
    public static Error CreationFailure(string token) => Error.Failure(
        "RefreshTokens.UpdateFailure",
        $"RefreshToken with token = '{token}' had not created");
    
    public static Error NotFound(Guid refreshTokenId) => Error.NotFound(
        "RefreshTokens.NotFound",
        $"RefreshToken with id = '{refreshTokenId}' was not found");
    
    public static Error NotFound(string token) => Error.NotFound(
        "RefreshTokens.NotFound",
        $"RefreshToken with token = '{token}' was not found");

    public static Error DeletionFailure(Guid userId) => Error.Failure(
        "RefreshTokens.DeletionFailure",
        $"RefreshToken for user with id = '{userId}' was not deleted");
}