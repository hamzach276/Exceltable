using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using ExcelTable.Configuration.Dto;

namespace ExcelTable.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ExcelTableAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
