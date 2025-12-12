using Application.Abstractions.Messaging;
using Application.Authentication.DTOs;

namespace Application.Users.LoginByEmailAndPassword;

public sealed record LoginUserCommand(string Email, string Password) : ICommand<TokenDto>;