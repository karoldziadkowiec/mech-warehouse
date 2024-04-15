using mech_warehouse.WebAPI.DataLayer;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mech_warehouse.Tests.Repositories
{
    public class UserExportServiceTests
    {
        private DbContextOptions<AppDbContext> GetDbContextOptions(string dbName)
        {
            return new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;
        }


    }
}
