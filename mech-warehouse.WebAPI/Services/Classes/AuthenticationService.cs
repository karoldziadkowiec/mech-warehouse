using mech_warehouse.WebAPI.Models.DTOs;
using mech_warehouse.WebAPI.Models.Entities;
using mech_warehouse.WebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace mech_warehouse.WebAPI.Services.Classes
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AuthenticationService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> Register(RegisterRequest request)
        {
            var userByEmail = await _userManager.FindByEmailAsync(request.Email);
            if (userByEmail != null)
            {
                throw new ArgumentException($"User with email {request.Email} already exists.");
            }

            Address address = new Address { City = request.City, Street = request.Street };
            Position position = new Position { Name = request.Position };

            User user = new User
            {
                UserName = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Address = address,
                Position = position,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                throw new ArgumentException($"Unable to register user {request.Email} errors: {GetErrorsText(result.Errors)}");
            }

            return await Login(new LoginRequest { Email = request.Email, Password = request.Password });
        }

        public async Task<string> Login(LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Email);

            if (user is null || !await _userManager.CheckPasswordAsync(user, request.Password))
            {
                throw new ArgumentException($"Unable to authenticate user {request.Email}");
            }

            var authClaims = new List<Claim>
            {
                new(ClaimTypes.Name, user.FirstName),
                new(ClaimTypes.Email, user.Email),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = GetToken(authClaims);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private JwtSecurityToken GetToken(IEnumerable<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            return token;
        }

        private string GetErrorsText(IEnumerable<IdentityError> errors)
        {
            return string.Join(", ", errors.Select(error => error.Description).ToArray());
        }
    }
}
