using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ExcelTable.Authorization.Roles;
using ExcelTable.Authorization.Users;
using ExcelTable.MultiTenancy;

using ExcelTable.Models; // Assuming the correct namespace is 'Models' instead of 'Entities'
namespace ExcelTable.EntityFrameworkCore
{
    public class ExcelTableDbContext : AbpZeroDbContext<Tenant, Role, User, ExcelTableDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public virtual DbSet<GLAccountsModel> GLAccounts { get; set; }
        public virtual DbSet<CostCenterModel> CostCenter { get; set; }
        public virtual DbSet<TransactionModel> Transactions { get; set; }
        public ExcelTableDbContext(DbContextOptions<ExcelTableDbContext> options)
            : base(options)
        {
        }
    }
}
