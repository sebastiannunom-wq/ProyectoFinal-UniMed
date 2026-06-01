namespace UniMedAPI.Dtos;

public class CitaMedicaInfoDto
{
    public int Id { get; set; }
    public DateTime FechaHora { get; set; }
    public string Diagnostico { get; set; } = string.Empty;
    public string Tratamiento { get; set; } = string.Empty;
    
    public int PacienteId { get; set; }
    public string PacienteNombre { get; set; } = string.Empty;
    
    public int MedicoId { get; set; }
    public string MedicoNombre { get; set; } = string.Empty;
    public string MedicoEspecialidad { get; set; } = string.Empty;
}