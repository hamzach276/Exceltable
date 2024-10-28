using System.Threading.Tasks;
using ExcelTable.Configuration.Dto;

namespace ExcelTable.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
