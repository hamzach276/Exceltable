using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ExcelTable.Authorization.Roles;
using ExcelTable.Authorization.Users;
using ExcelTable.MultiTenancy;

namespace ExcelTable.EntityFrameworkCore
{
    public class ExcelTableDbContext : AbpZeroDbContext<Tenant, Role, User, ExcelTableDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public ExcelTableDbContext(DbContextOptions<ExcelTableDbContext> options)
            : base(options)
        {
        }
    }
}
