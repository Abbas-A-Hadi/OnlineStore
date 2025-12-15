export type RegisterUserResponse = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    accessToken: string;
    refreshToken: string;
}
/*
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDQ0IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA0NCIsImV4cCI6MTc2NTc2MjU5MiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJkMGVlMGY2OS00MjEwLTRkYzAtYmFlZi1jNzlkMzFjNDRiYzEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0MkB0ZXN0LmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJwZXJtaXNzaW9uIjoidXNlcnM6YWNjZXNzIiwiaWF0IjoxNzY1NzYxOTkyLCJuYmYiOjE3NjU3NjE5OTJ9.Uc4L97OHIA7i97KHn_SPX6RHmk7i25IXS97jC0NH6jY"
    dateOfBirth: "2000-11-22"
    email: "test2@test.com"
    firstName: "test2"
    lastName: "test2"
    refreshToken: "ARhQE+1Vt5xs/W5XATGtb5DauCjayqz8pF3ZttPh3nU="
    userId: "d0ee0f69-4210-4dc0-baef-c79d31c44bc1"
*/