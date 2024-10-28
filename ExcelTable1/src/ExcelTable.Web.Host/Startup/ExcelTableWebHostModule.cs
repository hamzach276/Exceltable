using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ExcelTable.Configuration;

namespace ExcelTable.Web.Host.Startup
{
    [DependsOn(
       typeof(ExcelTableWebCoreModule))]
    public class ExcelTableWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ExcelTableWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ExcelTableWebHostModule).GetAssembly());
        }
    }
}
