using System.ComponentModel.DataAnnotations;

namespace mech_warehouse.WebAPI.Models.Entities
{
    public class Position
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(20)]
        public string Name { get; set; }
    }
}
