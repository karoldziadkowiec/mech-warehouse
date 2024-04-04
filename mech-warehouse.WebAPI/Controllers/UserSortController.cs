using mech_warehouse.WebAPI.Models.Entities;
using mech_warehouse.WebAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mech_warehouse.WebAPI.Controllers
{
    [Route("api/users/sort")]
    [Authorize]
    [ApiController]
    public class UserSortController : ControllerBase
    {
        private readonly IUserSortRepository _userSortRepository;

        public UserSortController(IUserSortRepository userSortRepository)
        {
            _userSortRepository = userSortRepository;
        }

        // GET: /api/users/sort/last-name
        [HttpGet("last-name")]
        public async Task<ActionResult<IEnumerable<User>>> SortByLastName()
        {
            try
            {
                var sortedUsers = await _userSortRepository.SortByLastName();
                return Ok(sortedUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving users: {ex.Message}");
            }
        }

        // GET: /api/users/sort/email
        [HttpGet("email")]
        public async Task<ActionResult<IEnumerable<User>>> SortByEmail()
        {
            try
            {
                var sortedUsers = await _userSortRepository.SortByEmail();
                return Ok(sortedUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving users: {ex.Message}");
            }
        }

        // GET: /api/users/sort/city
        [HttpGet("city")]
        public async Task<ActionResult<IEnumerable<User>>> SortByCity()
        {
            try
            {
                var sortedUsers = await _userSortRepository.SortByCity();
                return Ok(sortedUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving users: {ex.Message}");
            }
        }
    }
}
