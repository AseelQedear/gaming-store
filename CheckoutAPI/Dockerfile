# Use official .NET SDK image to build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the app and publish
COPY . ./
RUN dotnet publish -c Release -o out

# Final image: use ASP.NET runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out ./

# Expose port
EXPOSE 80

# Run app
ENTRYPOINT ["dotnet", "CheckoutAPI.dll"]
