using Application.Abstractions.Messaging;

namespace Application.Users.RevokeRefreshTokens;

public sealed record RevokeRefreshTokensCommand(Guid UserId) : ICommand;