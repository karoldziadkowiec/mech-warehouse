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

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users
                .Include(u => u.Address)
                .Include(u => u.Position)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task UpdateUser(User user)
        {
            var existingUser = await _context.Users
                .Include(p => p.Address)
                .Include(u => u.Position)
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            if (existingUser != null)
            {
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.PhoneNumber = user.PhoneNumber;
                existingUser.Address.City = user.Address.City;
                existingUser.Address.Street = user.Address.Street;
                existingUser.Position.Name = user.Position.Name;
            }
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(string userEmail)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
