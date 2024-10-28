using System.Threading.Tasks;
using Abp.Application.Services;
using ExcelTable.Sessions.Dto;

namespace ExcelTable.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
