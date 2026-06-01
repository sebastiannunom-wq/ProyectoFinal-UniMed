using System.ComponentModel.DataAnnotations;

namespace UniMedAPI.Dtos;

public class CitaMedicaDto
{
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

    [Required]
    public int MedicoId { get; set; }
}