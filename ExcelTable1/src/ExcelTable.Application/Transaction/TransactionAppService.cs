using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using ExcelTable.GLAccount.Dto;
using ExcelTable.Models;
using ExcelTable.Transaction.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExcelTable.Transaction
{
    public class TransactionAppService : ExcelTableAppServiceBase
    {
        private readonly IDapperRepository<TransactionModel> _transactionDapperRepository;
        public TransactionAppService(IDapperRepository<Models.TransactionModel> transactionDapperRepository)
        {
            _transactionDapperRepository = transactionDapperRepository;
        }

        public async Task<IEnumerable<GetTransactionDto>> GetAllAsync()
        {
            var sql = "SELECT t.*, gl.GLAccount, gl.ShortText as GLName , cc.Name as CenterCodeName, cc.CostCenterCode, cc.ccOwner FROM Transactions t inner join GLAccounts gl on gl.ChargeAccountId =t.ChargeAccountId inner join  CostCenter cc on cc.CostCenterID=t.CostCenterID";
            return await _transactionDapperRepository.QueryAsync<GetTransactionDto>(sql);
        }

        public async Task<GLAccountDto> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM Transactions WHERE TransactionID = @Id";
            return (await _transactionDapperRepository.QueryAsync<GLAccountDto>(sql, new { Id = id })).FirstOrDefault();
        }

        public async Task CreateAsync(TransactionModel transaction)
        {
            var sql = "INSERT INTO Transactions (Date, ChargeAccountID, Amount, CostCenterID, ProfitCenter, CreatedAt, ModifiedAt) " +
                      "VALUES (@Date, @ChargeAccountID, @Amount, @CostCenterID, @ProfitCenter, @CreatedAt, @ModifiedAt)";
            await _transactionDapperRepository.ExecuteAsync(sql, transaction);
        }

        public async Task UpdateAsync(TransactionModel transaction)
        {
            var sql = "UPDATE Transactions SET Date = @Date, ChargeAccountID = @ChargeAccountID, Amount = @Amount, " +
                      "CostCenterID = @CostCenterID, ProfitCenter = @ProfitCenter, CreatedAt = @CreatedAt, ModifiedAt = @ModifiedAt " +
                      "WHERE TransactionID = @TransactionID";
            await _transactionDapperRepository.ExecuteAsync(sql, transaction);
        }

        public async Task DeleteAsync(int id)
        {
            var sql = "DELETE FROM Transactions WHERE TransactionID = @Id";
            await _transactionDapperRepository.ExecuteAsync(sql, new { Id = id });
        }
    }
}
