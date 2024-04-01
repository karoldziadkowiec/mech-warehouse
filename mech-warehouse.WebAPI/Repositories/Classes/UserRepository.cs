using mech_warehouse.WebAPI.DataLayer;
using mech_warehouse.WebAPI.Models;
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
                .OrderBy(u => u.LastName));
        }

        public async Task<User> GetUserById(int userId)
        {
            return await _context.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
