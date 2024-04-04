using ClosedXML.Excel;
using mech_warehouse.WebAPI.DataLayer;
using mech_warehouse.WebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace mech_warehouse.WebAPI.Services.Classes
{
    public class UserExportService : IUserExportService
    {
        private readonly AppDbContext _context;

        public UserExportService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<byte[]> GetUsersCsvBytes()
        {
            var users = await _context.Users
                .Include(u => u.Address)
                .Include(u => u.Position)
                .ToListAsync();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Users");

                worksheet.Cell(1, 1).Value = "First name";
                worksheet.Cell(1, 2).Value = "Last name";
                worksheet.Cell(1, 3).Value = "E-mail";
                worksheet.Cell(1, 4).Value = "Phone number";
                worksheet.Cell(1, 5).Value = "City";
                worksheet.Cell(1, 6).Value = "Street";
                worksheet.Cell(1, 7).Value = "Position";

                var row = 2;
                foreach (var user in users)
                {
                    worksheet.Cell(row, 1).Value = user.FirstName;
                    worksheet.Cell(row, 2).Value = user.LastName;
                    worksheet.Cell(row, 3).Value = user.Email;
                    worksheet.Cell(row, 4).Value = user.PhoneNumber;

                    if (user.Address != null)
                    {
                        worksheet.Cell(row, 5).Value = user.Address.City;
                        worksheet.Cell(row, 6).Value = user.Address.Street;
                    }

                    if (user.Position != null)
                    {
                        worksheet.Cell(row, 5).Value = user.Position.Name;
                    }
                    row++;
                }

                using (var memoryStream = new MemoryStream())
                {
                    workbook.SaveAs(memoryStream);
                    memoryStream.Position = 0;
                    return memoryStream.ToArray();
                }
            }
        }
    }
}
