using GumAndHealth.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
namespace GumAndHealth.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ClassesController(MyDbContext db)
        {
            _db = db;
        }
        ///////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("GetAllClasses")]
        public IActionResult GetAllClasses()
        {
            var classes = _db.ClassServices.ToList();
            if (classes == null) { return NotFound("There is no classes"); }
            return Ok(classes);
        }

        ///////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("GetClassByID")]
        public IActionResult GetClassByID(int id)
        {
            var classes = _db.ClassServices.Where( x => x.Id == id).FirstOrDefault();
            if (classes == null) { return NotFound("There is no classes"); }
            return Ok(classes);
        }
        ///////////////////////////////////////////////////////////////////////////////////////

    }
}
