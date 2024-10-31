using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExcelTable.CostCenter.Dto
{
    public class CostCenterDto
    {
        public int CostCenterID { get; set; }

        public string Name { get; set; }
        public string CoArea { get; set; }
        public string CostCenterCode { get; set; }
        public string ccOwner { get; set; }

    }
}
