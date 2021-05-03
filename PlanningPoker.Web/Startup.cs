using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace PlanningPoker.Web
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddRazorPages();
            services.AddSpaStaticFiles(cfg =>
            {
                cfg.RootPath = "ClientApp";
            });
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                endpoints.MapRazorPages();
                endpoints.MapHub<GameController.GameHub>("/game/hub");
            });
            app.Use(next => context =>
            {
                var meta = context.GetEndpoint()?.Metadata;

                ControllerActionDescriptor actionDescriptor =
                    (ControllerActionDescriptor) meta?.SingleOrDefault(o => o is ControllerActionDescriptor);

                string text = actionDescriptor?.AttributeRouteInfo?.Template;
                string text2 = actionDescriptor?.AttributeRouteInfo?.Name;
                string actionName = actionDescriptor?.ActionName;
                string controllerName = actionDescriptor?.ControllerName;
                int? num = actionDescriptor?.AttributeRouteInfo?.Order;
                string method = context.Request.Method;
                PathString path = context.Request.Path;
                string text3 = string.Empty;
                if (context.GetRouteData().Values.TryGetValue("area", out var value))
                {
                    text3 = "area:" + value?.ToString();
                }

                string text4 = ((text == null) ? "" : ("Template = " + text));
                string text6 = ((!num.HasValue) ? "" : $"Order = {num}");
                string text7 = ((method == "GET") ? "" : (method ?? ""));
                Console.WriteLine($"{text7} {path} {text3} {text6} {text4} " + controllerName + "." +
                                  actionName + " " + text2 );

                return next(context);
                // return Task.CompletedTask;
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                // if (env.IsDevelopment())
                // {
                //     spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                // }
            });
            app.Use(next => async context =>
            {
                var url = context.Request.GetDisplayUrl();
                await context.Response.WriteAsync($"url: {url}");
                await next(context);
            });

        }
    }

}
