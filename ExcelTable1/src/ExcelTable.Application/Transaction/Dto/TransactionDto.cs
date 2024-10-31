using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExcelTable.Transaction.Dto
{
    public class TransactionDto
    {
        public int TransactionID { get; set; }
        public DateTime Date { get; set; }

        public int ChargeAccountID { get; set; }
        public Decimal Amount { get; set; }
        public int CostCenterID { get; set; }
        public string ProfitCenter { get; set; }
     
    }
}
