using Application.Abstractions.Messaging;
using Application.Authentication.DTOs;

namespace Application.Users.LoginByRefreshToken;

public sealed record LoginUserByRefreshTokenCommand(string RefreshToken) 
    : ICommand<TokenDto>;