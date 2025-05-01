# STAGE 1: Build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy just the .csproj file and restore dependencies
COPY CheckoutAPI/*.csproj ./  
RUN dotnet restore

# Copy the rest of the source code
COPY CheckoutAPI/. ./
RUN dotnet publish -c Release -o out

# STAGE 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out .

# Expose port 80
EXPOSE 80

ENTRYPOINT ["dotnet", "CheckoutAPI.dll"]  # Replace with your DLL name
