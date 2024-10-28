FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/ExcelTable.Web.Host/ExcelTable.Web.Host.csproj", "src/ExcelTable.Web.Host/"]
COPY ["src/ExcelTable.Web.Core/ExcelTable.Web.Core.csproj", "src/ExcelTable.Web.Core/"]
COPY ["src/ExcelTable.Application/ExcelTable.Application.csproj", "src/ExcelTable.Application/"]
COPY ["src/ExcelTable.Core/ExcelTable.Core.csproj", "src/ExcelTable.Core/"]
COPY ["src/ExcelTable.EntityFrameworkCore/ExcelTable.EntityFrameworkCore.csproj", "src/ExcelTable.EntityFrameworkCore/"]
WORKDIR "/src/src/ExcelTable.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/ExcelTable.Web.Host", "src/ExcelTable.Web.Host"]
COPY ["src/ExcelTable.Web.Core", "src/ExcelTable.Web.Core"]
COPY ["src/ExcelTable.Application", "src/ExcelTable.Application"]
COPY ["src/ExcelTable.Core", "src/ExcelTable.Core"]
COPY ["src/ExcelTable.EntityFrameworkCore", "src/ExcelTable.EntityFrameworkCore"]
WORKDIR "/src/src/ExcelTable.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "ExcelTable.Web.Host.dll"]
