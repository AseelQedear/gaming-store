# Build stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app

COPY --from=build /app/out ./
COPY --from=build /app/checkoutapi.db ./checkoutapi.db

EXPOSE 80
ENTRYPOINT ["dotnet", "CheckoutAPI.dll"]
