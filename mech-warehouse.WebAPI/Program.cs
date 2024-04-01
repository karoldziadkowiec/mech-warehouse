
using mech_warehouse.WebAPI.DataLayer;
using mech_warehouse.WebAPI.Repositories.Classes;
using mech_warehouse.WebAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace mech_warehouse.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Database connection
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("connectionString")));
            // Dependency Injection
            builder.Services.AddScoped<IUserRepository, UserRepository>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseAuthentication();

            app.MapControllers();

            app.Run();
        }
    }
}
