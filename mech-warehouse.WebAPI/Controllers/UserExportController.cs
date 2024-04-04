using mech_warehouse.WebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mech_warehouse.WebAPI.Controllers
{
    [Route("api/users")]
    [Authorize]
    [ApiController]
    public class UserExportController : ControllerBase
    {
        private readonly IUserExportService _userExportService;

        public UserExportController(IUserExportService userExportService)
        {
            _userExportService = userExportService;
        }

        // GET: /api/users/csv
        [HttpGet("csv")]
        public async Task<IActionResult> GetUsersCsvFile()
        {
            try
            {
                var csvBytes = await _userExportService.GetUsersCsvBytes();
                return File(csvBytes, "application/octet-stream", "Users.csv");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
