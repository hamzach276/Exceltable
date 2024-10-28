using System.ComponentModel.DataAnnotations;

namespace ExcelTable.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}