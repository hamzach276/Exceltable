using Abp.Authorization;
using ExcelTable.Authorization.Roles;
using ExcelTable.Authorization.Users;

namespace ExcelTable.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
