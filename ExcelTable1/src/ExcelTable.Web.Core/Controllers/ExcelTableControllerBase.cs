using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ExcelTable.Controllers
{
    public abstract class ExcelTableControllerBase: AbpController
    {
        protected ExcelTableControllerBase()
        {
            LocalizationSourceName = ExcelTableConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
