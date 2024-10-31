using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using ExcelTable.CostCenter.Dto;
using ExcelTable.GLAccount.Dto;
using ExcelTable.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExcelTable.CostCenter
{
    public class CostCenterAppService : ExcelTableAppServiceBase
    {
        private readonly IDapperRepository<CostCenterModel> _costCenterDapperRepository;
        public CostCenterAppService(IDapperRepository<CostCenterModel> costCenterDapperRepository)
        {
            _costCenterDapperRepository = costCenterDapperRepository;
        }

        public async Task<IEnumerable<CostCenterDto>> GetAllAsync()
        {
            var sql = "SELECT * FROM CostCenter";
            return await _costCenterDapperRepository.QueryAsync<CostCenterDto>(sql);
        }

        public async Task<CostCenterDto> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM CostCenter WHERE CostCenterID = @Id";
            return (await _costCenterDapperRepository.QueryAsync<CostCenterDto>(sql, new { Id = id })).FirstOrDefault();
        }

        public async Task CreateAsync(CostCenterDto input)
        {
            var sql = "INSERT INTO CostCenter (Name, CoArea, CostCenterCode, ccOwner) VALUES (@Name, @CoArea, @CostCenterCode, @ccOwner)";
            await _costCenterDapperRepository.ExecuteAsync(sql, input);
        }

        public async Task UpdateAsync(CostCenterDto input)
        {
            var sql = "UPDATE CostCenter SET Name = @Name, CoArea = @CoArea, CostCenterCode = @CostCenterCode, ccOwner = @ccOwner WHERE CostCenterID = @CostCenterID";
            await _costCenterDapperRepository.ExecuteAsync(sql, input);
        }

        public async Task DeleteAsync(int id)
        {
            var sql = "DELETE FROM CostCenter WHERE CostCenterID = @Id";
            await _costCenterDapperRepository.ExecuteAsync(sql, new { Id = id });
        }
    }
   
    }

