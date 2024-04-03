using mech_warehouse.WebAPI.Models.Entities;

namespace mech_warehouse.WebAPI.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IQueryable<User>> GetAllUsers();
        Task<User> GetUserByEmail(string email);
    }
}
