
using mech_warehouse.WebAPI.Models;

namespace mech_warehouse.WebAPI.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IQueryable<User>> GetAllUsers();
        Task<User> GetUserById(int userId);
    }
}
