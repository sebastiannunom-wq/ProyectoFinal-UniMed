using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UniMedAPI.Models;

public class CitaMedica
{
    [Key]
    public int Id { get; set; }

    [Required]
    public DateTime FechaHora { get; set; }

    [Required]
    [StringLength(200)]
    public string Diagnostico { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Tratamiento { get; set; } = string.Empty;

    
    [Required]
    public int PacienteId { get; set; }
    [ForeignKey("PacienteId")]
    public Paciente? Paciente { get; set; }

    
    [Required]
    public int MedicoId { get; set; }
    [ForeignKey("MedicoId")]
    public Medico? Medico { get; set; }
}