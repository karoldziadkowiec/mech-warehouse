using System.ComponentModel.DataAnnotations;

namespace mech_warehouse.WebAPI.Models.DTOs
{
    public class LoginRequest
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
