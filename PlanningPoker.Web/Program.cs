using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace PlanningPoker.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Console.WriteLine(Assembly.GetEntryAssembly());
            // Assembly.GetEntryAssembly()?.GetTypes().Distinct().ToList().ForEach(t => Console.WriteLine(t.Name));
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
