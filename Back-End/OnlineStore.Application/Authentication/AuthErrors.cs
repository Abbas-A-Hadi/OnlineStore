using Application.Authentication.DTOs;
using SharedKernel;

namespace Application.Authentication;

public static class AuthErrors
{
    public static Error RefreshTokenCreationProblem(RefreshTokenDto refreshTokenDto)
        => Error.Problem("RefreshToken.CreationProblem",
            $"The refresh token = '{refreshTokenDto.RefreshToken}' with user id = '{refreshTokenDto.UserId}' had problem with creation");
}