using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace UniMedAPI.Data;

public class ContextoDBFabrica : IDesignTimeDbContextFactory<ContextoDB>
{
    public ContextoDB CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ContextoDB>();
        
        optionsBuilder.UseSqlServer("Server=DESKTOP-SKD3024;Database=UniMedDB;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true");

        return new ContextoDB(optionsBuilder.Options);
    }
}