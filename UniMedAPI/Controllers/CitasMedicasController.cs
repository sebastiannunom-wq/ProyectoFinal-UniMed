using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniMedAPI.Data;
using UniMedAPI.Dtos;
using UniMedAPI.Models;

namespace UniMedAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CitasMedicasController : ControllerBase
{
    private readonly ContextoDB _contexto;

    public CitasMedicasController(ContextoDB contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CitaMedicaInfoDto>>> GetCitasMedicas()
    {
        var citas = await _contexto.CitasMedicas
            .Include(c => c.Paciente)
            .Include(c => c.Medico)
            .Select(c => new CitaMedicaInfoDto
            {
                Id = c.Id,
                FechaHora = c.FechaHora,
                Diagnostico = c.Diagnostico,
                Tratamiento = c.Tratamiento,
                PacienteId = c.PacienteId,
                PacienteNombre = c.Paciente != null ? c.Paciente.Nombre : "Sin Paciente",
                MedicoId = c.MedicoId,
                MedicoNombre = c.Medico != null ? c.Medico.Nombre : "Sin Médico",
                MedicoEspecialidad = c.Medico != null ? c.Medico.Especialidad : ""
            }).ToListAsync();

        return Ok(citas);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CitaMedicaInfoDto>> GetCitaMedica(int id)
    {
        var cita = await _contexto.CitasMedicas
            .Include(c => c.Paciente)
            .Include(c => c.Medico)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (cita == null)
        {
            return NotFound();
        }

        var citaDto = new CitaMedicaInfoDto
        {
            Id = cita.Id,
            FechaHora = cita.FechaHora,
            Diagnostico = cita.Diagnostico,
            Tratamiento = cita.Tratamiento,
            PacienteId = cita.PacienteId,
            PacienteNombre = cita.Paciente != null ? cita.Paciente.Nombre : "Sin Paciente",
            MedicoId = cita.MedicoId,
            MedicoNombre = cita.Medico != null ? cita.Medico.Nombre : "Sin Médico",
            MedicoEspecialidad = cita.Medico != null ? cita.Medico.Especialidad : ""
        };

        return Ok(citaDto);
    }

    [HttpPost]
    public async Task<ActionResult<CitaMedicaDto>> PostCitaMedica(CitaMedicaDto citaDto)
    {
        var existePaciente = await _contexto.Pacientes.AnyAsync(p => p.Id == citaDto.PacienteId);
        var existeMedico = await _contexto.Medicos.AnyAsync(m => m.Id == citaDto.MedicoId);

        if (!existePaciente || !existeMedico)
        {
            return BadRequest("El PacienteId o el MedicoId especificado no existe.");
        }

        var cita = new CitaMedica
        {
            FechaHora = citaDto.FechaHora,
            Diagnostico = citaDto.Diagnostico,
            Tratamiento = citaDto.Tratamiento,
            PacienteId = citaDto.PacienteId,
            MedicoId = citaDto.MedicoId
        };

        _contexto.CitasMedicas.Add(cita);
        await _contexto.SaveChangesAsync();

        citaDto.Id = cita.Id;

        return CreatedAtAction(nameof(GetCitaMedica), new { id = cita.Id }, citaDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutCitaMedica(int id, CitaMedicaDto citaDto)
    {
        if (id != citaDto.Id)
        {
            return BadRequest();
        }

        var cita = await _contexto.CitasMedicas.FindAsync(id);
        if (cita == null)
        {
            return NotFound();
        }

        var existePaciente = await _contexto.Pacientes.AnyAsync(p => p.Id == citaDto.PacienteId);
        var existeMedico = await _contexto.Medicos.AnyAsync(m => m.Id == citaDto.MedicoId);

        if (!existePaciente || !existeMedico)
        {
            return BadRequest("El PacienteId o el MedicoId especificado no existe.");
        }

        cita.FechaHora = citaDto.FechaHora;
        cita.Diagnostico = citaDto.Diagnostico;
        cita.Tratamiento = citaDto.Tratamiento;
        cita.PacienteId = citaDto.PacienteId;
        cita.MedicoId = citaDto.MedicoId;

        try
        {
            await _contexto.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CitaExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCitaMedica(int id)
    {
        var cita = await _contexto.CitasMedicas.FindAsync(id);
        if (cita == null)
        {
            return NotFound();
        }

        _contexto.CitasMedicas.Remove(cita);
        await _contexto.SaveChangesAsync();

        return NoContent();
    }

    private bool CitaExists(int id)
    {
        return _contexto.CitasMedicas.Any(e => e.Id == id);
    }
}