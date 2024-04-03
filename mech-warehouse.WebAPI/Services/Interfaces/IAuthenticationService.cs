using mech_warehouse.WebAPI.Models.DTOs;
using mech_warehouse.WebAPI.Models.Entities;

namespace mech_warehouse.WebAPI.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<bool> Register(RegisterRequest request);
        Task<string> Login(LoginRequest request);
    }
}
