using System.ComponentModel.DataAnnotations;
using System.Net;

namespace mech_warehouse.WebAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(20)]
        public string FirstName { get; set; }
        [MaxLength(30)]
        public string LastName { get; set; }
        public Address Address { get; set; }
    }
}