using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(onlife.Startup))]
namespace onlife
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
