using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExcelTable.Models
{
    public class CostCenterModel : Entity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CostCenterID { get; set; }

        public string Name { get; set; }
        public string CoArea { get; set; }
        public string CostCenterCode { get; set; }
        public string ccOwner { get; set; }
        public int Id => CostCenterID;

        public bool IsTransient()
        {
            return Id == default;
        }
    }
}



