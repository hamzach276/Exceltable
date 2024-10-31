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
    public class GLAccountsModel : Entity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ChargeAccountID { get; set; }

        public string CompanyCode { get; set; }
        public string GLAccount { get; set; }
        public string ShortText { get; set; }
        public string LongText { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public int Id => ChargeAccountID;

        public bool IsTransient()
        {
            return Id == default;
        }
    }
}
