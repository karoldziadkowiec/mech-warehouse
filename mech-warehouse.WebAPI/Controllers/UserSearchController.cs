using mech_warehouse.WebAPI.Models.Entities;
using mech_warehouse.WebAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mech_warehouse.WebAPI.Controllers
{
    [Route("api/users/search")]
    [Authorize]
    [ApiController]
    public class UserSearchController : ControllerBase
    {
        private readonly IUserSearchRepository _userSearchRepository;

        public UserSearchController(IUserSearchRepository userSearchRepository)
        {
            _userSearchRepository = userSearchRepository;
        }

        // GET: /api/users/search/:searchTerm
        [HttpGet("{searchTerm}")]
        public async Task<ActionResult<IEnumerable<User>>> SearchUsers(string searchTerm)
        {
            try
            {
                var searchedUsers = await _userSearchRepository.SearchUsers(searchTerm);
                if (searchedUsers == null)
                {
                    return NotFound();
                }

                return Ok(searchedUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: /api/users/partial/:searchTerm
        [HttpGet("partial/{searchTerm}")]
        public async Task<ActionResult<IEnumerable<User>>> SearchUsersPartial(string searchTerm)
        {
            try
            {
                var searchedUsers = await _userSearchRepository.SearchUsersPartial(searchTerm);
                if (searchedUsers == null)
                {
                    return NotFound();
                }

                return Ok(searchedUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
