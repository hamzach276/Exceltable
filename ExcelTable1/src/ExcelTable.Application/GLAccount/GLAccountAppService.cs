using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using ExcelTable.GLAccount.Dto;
using ExcelTable.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ExcelTable.GLAccount
{
    public class GLAccountAppService : ExcelTableAppServiceBase
    {
        private readonly IDapperRepository<GLAccountsModel> _glAccountDapperRepository;
        //private readonly IRepository<GLAccountsModel> _glAccountRepository;
        public GLAccountAppService(IDapperRepository<Models.GLAccountsModel> glAccountDapperRepository, IRepository<GLAccountsModel> glAccountRepository)
        {
            _glAccountDapperRepository = glAccountDapperRepository;
            //_glAccountRepository = glAccountRepository;
        }

        public async Task<IEnumerable<GLAccountDto>> GetAllAsync()
        {
            var sql = "SELECT * FROM GLAccounts";
      
            return await _glAccountDapperRepository.QueryAsync<GLAccountDto>(sql);
        }
      


        public async Task CreateAsync(GLAccountDto input)
        {
            var sql = "INSERT INTO GLAccounts (CompanyCode, GLAccount, ShortText, LongText, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, IsActive) " +
                      "VALUES (@CompanyCode, @GLAccount, @ShortText, @LongText, @CreatedBy, @CreatedDate, @ModifiedBy, @ModifiedDate, @IsActive)";
            await _glAccountDapperRepository.ExecuteAsync(sql, input);
        }

        public async Task UpdateAsync(GLAccountDto input)
        {
            var sql = "UPDATE GLAccounts SET CompanyCode = @CompanyCode, GLAccount = @GLAccount, ShortText = @ShortText, LongText = @LongText, " +
                      "CreatedBy = @CreatedBy, CreatedDate = @CreatedDate, ModifiedBy = @ModifiedBy, ModifiedDate = @ModifiedDate, IsActive = @IsActive " +
                      "WHERE ChargeAccountID = @ChargeAccountID";
            await _glAccountDapperRepository.ExecuteAsync(sql, input);
        }

        public async Task DeleteAsync(int id)
        {
            var sql = "DELETE FROM GLAccounts WHERE ChargeAccountID = @Id";
            await _glAccountDapperRepository.ExecuteAsync(sql, new { Id = id });
        }
    }

}
