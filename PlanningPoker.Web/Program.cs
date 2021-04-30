using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

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
