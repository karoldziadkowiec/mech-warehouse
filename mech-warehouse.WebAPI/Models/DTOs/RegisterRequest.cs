using System.ComponentModel.DataAnnotations;

namespace mech_warehouse.WebAPI.Models.DTOs
{
    public class RegisterRequest
    {
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public string? Position { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? Street { get; set; }
    }
}
