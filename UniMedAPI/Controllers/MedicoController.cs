using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniMedAPI.Data;
using UniMedAPI.Dtos;
using UniMedAPI.Models;

namespace UniMedAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicosController : ControllerBase
{
    private readonly ContextoDB _contexto;

    public MedicosController(ContextoDB contexto)
    {
        _contexto = contexto;
    }

    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MedicoDto>>> GetMedicos()
    {
        var medicos = await _contexto.Medicos
            .Select(m => new MedicoDto
            {
                Id = m.Id,
                Nombre = m.Nombre,
                Especialidad = m.Especialidad,
                Telefono = m.Telefono
            }).ToListAsync();

        return Ok(medicos);
    }

    
    [HttpGet("{id}")]
    public async Task<ActionResult<MedicoDto>> GetMedico(int id)
    {
        var medico = await _contexto.Medicos.FindAsync(id);

        if (medico == null)
        {
            return NotFound();
        }

        var medicoDto = new MedicoDto
        {
            Id = medico.Id,
            Nombre = medico.Nombre,
            Especialidad = medico.Especialidad,
            Telefono = medico.Telefono
        };

        return Ok(medicoDto);
    }

    
    [HttpPost]
    public async Task<ActionResult<MedicoDto>> PostMedico(MedicoDto medicoDto)
    {
        var medico = new Medico
        {
            Nombre = medicoDto.Nombre,
            Especialidad = medicoDto.Especialidad,
            Telefono = medicoDto.Telefono
        };

        _contexto.Medicos.Add(medico);
        await _contexto.SaveChangesAsync();

        medicoDto.Id = medico.Id;

        return CreatedAtAction(nameof(GetMedico), new { id = medico.Id }, medicoDto);
    }

    
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMedico(int id, MedicoDto medicoDto)
    {
        if (id != medicoDto.Id)
        {
            return BadRequest();
        }

        var medico = await _contexto.Medicos.FindAsync(id);
        if (medico == null)
        {
            return NotFound();
        }

        medico.Nombre = medicoDto.Nombre;
        medico.Especialidad = medicoDto.Especialidad;
        medico.Telefono = medicoDto.Telefono;

        try
        {
            await _contexto.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MedicoExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMedico(int id)
    {
        var medico = await _contexto.Medicos.FindAsync(id);
        if (medico == null)
        {
            return NotFound();
        }

        _contexto.Medicos.Remove(medico);
        await _contexto.SaveChangesAsync();

        return NoContent();
    }

    private bool MedicoExists(int id)
    {
        return _contexto.Medicos.Any(e => e.Id == id);
    }
}