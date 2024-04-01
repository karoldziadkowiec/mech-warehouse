using mech_warehouse.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace mech_warehouse.WebAPI.DataLayer
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Position> Positions { get; set; }
    }
}
