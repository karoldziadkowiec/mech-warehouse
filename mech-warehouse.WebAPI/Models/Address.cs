using System.ComponentModel.DataAnnotations;

namespace mech_warehouse.WebAPI.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(20)]
        public string City { get; set; }
        [MaxLength(30)]
        public string Street { get; set; }
    }
}
