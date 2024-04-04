using mech_warehouse.WebAPI.DataLayer;
using mech_warehouse.WebAPI.Models.Entities;
using mech_warehouse.WebAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace mech_warehouse.WebAPI.Repositories.Classes
{
    public class UserSortRepository : IUserSortRepository
    {
        private readonly AppDbContext _context;

        public UserSortRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> SortByLastName()
            => await _context.Users
            .Include(u => u.Address)
            .Include(u => u.Position)
            .OrderBy(u => u.LastName).ToListAsync();

        public async Task<IEnumerable<User>> SortByEmail()
            => await _context.Users
            .Include(u => u.Address)
            .Include(u => u.Position)
            .OrderBy(u => u.Email).ToListAsync();

        public async Task<IEnumerable<User>> SortByCity()
            => await _context.Users
            .Include(u => u.Address)
            .Include(u => u.Position)
            .OrderBy(u => u.Address.City).ToListAsync();
    }
}
