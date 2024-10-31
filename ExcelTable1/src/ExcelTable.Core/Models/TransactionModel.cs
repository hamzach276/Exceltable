using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExcelTable.Models
{
    public class TransactionModel:Entity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TransactionID { get; set; }
        public DateTime Date { get; set; }

        public int ChargeAccountID { get; set; }
        public Decimal Amount { get; set; }
        public int CostCenterID { get; set; }
        public string ProfitCenter { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime ModifiedAt { get; set; } = DateTime.Now;
        public int Id => TransactionID;

        public bool IsTransient()
        {
            return Id == default;
        }
    }
}
