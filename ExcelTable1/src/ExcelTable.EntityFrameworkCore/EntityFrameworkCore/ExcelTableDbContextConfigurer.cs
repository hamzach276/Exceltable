using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ExcelTable.EntityFrameworkCore
{
    public static class ExcelTableDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ExcelTableDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ExcelTableDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
