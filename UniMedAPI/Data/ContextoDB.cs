using Microsoft.EntityFrameworkCore;
using UniMedAPI.Models;

namespace UniMedAPI.Data;

public class ContextoDB : DbContext
{
    public ContextoDB(DbContextOptions<ContextoDB> options) : base(options)
    {
    }

    public DbSet<Paciente> Pacientes { get; set; }
    public DbSet<Medico> Medicos { get; set; }
    public DbSet<CitaMedica> CitasMedicas { get; set; }
}