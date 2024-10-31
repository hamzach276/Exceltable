using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExcelTable.Transaction.Dto
{
    public class GetTransactionDto
    {
        public int TransactionID { get; set; }
        public DateTime Date { get; set; }

        public int ChargeAccountID { get; set; }
        public Decimal Amount { get; set; }
        public int CostCenterID { get; set; }
        public string ProfitCenter { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }

        public string GLAccount { get; set; }
        public string GLName { get; set; }
        public string CenterCodeName { get; set; }
        public string CostCenterCode { get; set; }
        public string ccOwner { get; set; }
    }
}
