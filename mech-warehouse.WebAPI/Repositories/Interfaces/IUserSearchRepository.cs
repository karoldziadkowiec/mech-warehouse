using mech_warehouse.WebAPI.Models.Entities;

namespace mech_warehouse.WebAPI.Repositories.Interfaces
{
    public interface IUserSearchRepository
    {
        Task<IEnumerable<User>> SearchUsers(string searchTerm);
        Task<IEnumerable<User>> SearchUsersPartial(string searchTerm);
    }
}
