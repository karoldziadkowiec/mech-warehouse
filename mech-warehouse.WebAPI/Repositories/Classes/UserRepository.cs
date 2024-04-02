using mech_warehouse.WebAPI.DataLayer;
using mech_warehouse.WebAPI.Models.Entities;
using mech_warehouse.WebAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace mech_warehouse.WebAPI.Repositories.Classes
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IQueryable<User>> GetAllUsers()
        {
            return await Task.FromResult(_context.Users
                .Include(u => u.Address)
                .Include(u => u.Position)
                .OrderBy(u => u.LastName));
        }
    }
}
