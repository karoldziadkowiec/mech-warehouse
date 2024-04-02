using mech_warehouse.WebAPI.Models.DTOs;

namespace mech_warehouse.WebAPI.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<string> Register(RegisterRequest request);
        Task<string> Login(LoginRequest request);
    }
}
