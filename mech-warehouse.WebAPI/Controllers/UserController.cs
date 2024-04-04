using DocumentFormat.OpenXml.Spreadsheet;
using mech_warehouse.WebAPI.Models.Entities;
using mech_warehouse.WebAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mech_warehouse.WebAPI.Controllers
{
    [Route("api")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: /api/users
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userRepository.GetAllUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving users: {ex.Message}");
            }
        }

        // GET: api/user
        [HttpGet("user")]
        public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: /api/users/:id
        [HttpPut("users/{userId}")]
        public async Task<IActionResult> UpdatePatient(User user, string userEmail)
        {
            try
            {
                var existingUser = await _userRepository.GetUserByEmail(userEmail);
                if (existingUser == null)
                {
                    return NotFound($"User {userEmail} not found");
                }

                await _userRepository.UpdateUser(user);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error updating user: {ex.Message}");
            }
        }

        // DELETE: /api/users/:id
        [HttpDelete("users/{userId}")]
        public async Task<IActionResult> DeletePatient(string userEmail)
        {
            try
            {
                var existingUser = await _userRepository.GetUserByEmail(userEmail);
                if (existingUser == null)
                {
                    return NotFound($"User {userEmail} not found");
                }

                await _userRepository.DeleteUser(userEmail);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error removing patient: {ex.Message}");
            }
        }
    }
}
