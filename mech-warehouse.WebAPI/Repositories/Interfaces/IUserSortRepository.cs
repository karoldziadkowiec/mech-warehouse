using mech_warehouse.WebAPI.Models.Entities;

namespace mech_warehouse.WebAPI.Repositories.Interfaces
{
    public interface IUserSortRepository
    {
        Task<IEnumerable<User>> SortByLastName();
        Task<IEnumerable<User>> SortByEmail();
        Task<IEnumerable<User>> SortByCity();
    }
}
