using System.ComponentModel.DataAnnotations;

namespace UniMedAPI.Dtos;

public class PacienteDto
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [StringLength(20)]
    public string Telefono { get; set; } = string.Empty;

    [Required]
    public DateTime FechaNacimiento { get; set; }
}