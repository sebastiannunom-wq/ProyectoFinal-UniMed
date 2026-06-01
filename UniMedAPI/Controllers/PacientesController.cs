using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniMedAPI.Data;
using UniMedAPI.Dtos;
using UniMedAPI.Models;

namespace UniMedAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacientesController : ControllerBase
{
    private readonly ContextoDB _contexto;

    public PacientesController(ContextoDB contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PacienteDto>>> GetPacientes()
    {
        var pacientes = await _contexto.Pacientes
            .Select(p => new PacienteDto
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Telefono = p.Telefono,
                FechaNacimiento = p.FechaNacimiento
            }).ToListAsync();

        return Ok(pacientes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PacienteDto>> GetPaciente(int id)
    {
        var paciente = await _contexto.Pacientes.FindAsync(id);

        if (paciente == null)
        {
            return NotFound();
        }

        var pacienteDto = new PacienteDto
        {
            Id = paciente.Id,
            Nombre = paciente.Nombre,
            Telefono = paciente.Telefono,
            FechaNacimiento = paciente.FechaNacimiento
        };

        return Ok(pacienteDto);
    }

    [HttpPost]
    public async Task<ActionResult<PacienteDto>> PostPaciente(PacienteDto pacienteDto)
    {
        var paciente = new Paciente
        {
            Nombre = pacienteDto.Nombre,
            Telefono = pacienteDto.Telefono,
            FechaNacimiento = pacienteDto.FechaNacimiento
        };

        _contexto.Pacientes.Add(paciente);
        await _contexto.SaveChangesAsync();

        pacienteDto.Id = paciente.Id;

        return CreatedAtAction(nameof(GetPaciente), new { id = paciente.Id }, pacienteDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPaciente(int id, PacienteDto pacienteDto)
    {
        if (id != pacienteDto.Id)
        {
            return BadRequest();
        }

        var paciente = await _contexto.Pacientes.FindAsync(id);
        if (paciente == null)
        {
            return NotFound();
        }

        paciente.Nombre = pacienteDto.Nombre;
        paciente.Telefono = pacienteDto.Telefono;
        paciente.FechaNacimiento = pacienteDto.FechaNacimiento;

        try
        {
            await _contexto.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PacienteExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePaciente(int id)
    {
        var paciente = await _contexto.Pacientes.FindAsync(id);
        if (paciente == null)
        {
            return NotFound();
        }

        _contexto.Pacientes.Remove(paciente);
        await _contexto.SaveChangesAsync();

        return NoContent();
    }

    private bool PacienteExists(int id)
    {
        return _contexto.Pacientes.Any(e => e.Id == id);
    }
}