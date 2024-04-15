using mech_warehouse.WebAPI.DataLayer;
using mech_warehouse.WebAPI.Models.Entities;
using mech_warehouse.WebAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace mech_warehouse.WebAPI.Repositories.Classes
{
    public class UserSearchRepository : IUserSearchRepository
    {
        private readonly AppDbContext _context;

        public UserSearchRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> SearchUsers(string searchTerm)
        {
            return await Task.FromResult(_context.Users
                .Include(u => u.Address)
                .Include(u => u.Position)
                .Where(u => u.FirstName == searchTerm || u.LastName == searchTerm));
        }

        public async Task<IEnumerable<User>> SearchUsersPartial(string searchTerm)
        {
            return await _context.Users
                .Include(u => u.Address)
                .Include(u => u.Position)
                .Where(u => u.FirstName.Contains(searchTerm) || u.LastName.Contains(searchTerm))
                .ToListAsync();
        }
    }
}
