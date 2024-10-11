using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GumAndHealth.Server.Models;

namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassServicesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ClassServicesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/ClassServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassService>>> GetClassServices()
        {
            return await _context.ClassServices.ToListAsync();
        }

        // GET: api/ClassServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassService>> GetClassService(long id)
        {
            var classService = await _context.ClassServices.FindAsync(id);

            if (classService == null)
            {
                return NotFound();
            }

            return classService;
        }

        // PUT: api/ClassServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassService(long id, ClassService classService)
        {
            if (id != classService.Id)
            {
                return BadRequest();
            }

            _context.Entry(classService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassServiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ClassServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClassService>> PostClassService(ClassService classService)
        {
            _context.ClassServices.Add(classService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClassService", new { id = classService.Id }, classService);
        }

        // DELETE: api/ClassServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassService(long id)
        {
            var classService = await _context.ClassServices.FindAsync(id);
            if (classService == null)
            {
                return NotFound();
            }

            _context.ClassServices.Remove(classService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClassServiceExists(long id)
        {
            return _context.ClassServices.Any(e => e.Id == id);
        }
    }
}
