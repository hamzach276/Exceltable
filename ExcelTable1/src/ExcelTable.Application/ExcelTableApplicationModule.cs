using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ExcelTable.Authorization;

namespace ExcelTable
{
    [DependsOn(
        typeof(ExcelTableCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class ExcelTableApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ExcelTableAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ExcelTableApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
