using System.Threading.Tasks;
using Abp.Application.Services;
using ExcelTable.Authorization.Accounts.Dto;

namespace ExcelTable.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
