using Abp.Application.Services;
using ExcelTable.MultiTenancy.Dto;

namespace ExcelTable.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

