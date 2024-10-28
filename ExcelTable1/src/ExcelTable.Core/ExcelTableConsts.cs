using ExcelTable.Debugging;

namespace ExcelTable
{
    public class ExcelTableConsts
    {
        public const string LocalizationSourceName = "ExcelTable";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "af4f338427464515bebde8a905112bb6";
    }
}
