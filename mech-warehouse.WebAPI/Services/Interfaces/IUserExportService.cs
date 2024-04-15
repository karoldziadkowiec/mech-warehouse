namespace mech_warehouse.WebAPI.Services.Interfaces
{
    public interface IUserExportService
    {
        Task<byte[]> GetUsersCsvBytes();
    }
}
