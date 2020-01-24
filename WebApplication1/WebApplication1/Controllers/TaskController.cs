using CoreDatabase;
using CoreModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TaskController
  {
    private readonly DatabaseContext _context;
    public TaskController(DatabaseContext context)
    {
      _context = context;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks()
    { 
      return await _context.TaskModels.ToListAsync();
    }


    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskModel>> GetTasks(int id)
    {
      var tasks = await _context.TaskModels.FindAsync(id);

      if (tasks == null)
      {
        return NotFound();
      }

      return tasks;
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTasks(int id, TaskModel tasks)
    {
      if (id != tasks.TaskId)
      {
        return BadRequest();
      }

      _context.Entry(tasks).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!TasksExists(id))
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

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<TaskModel>> PostTask(TaskModel task)
    {
      _context.TaskModels.Add(task);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetCTask", new { id = task.TaskId }, task);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult<TaskModel>> DeleteTask(int id)
    {
      var task = await _context.TaskModels.FindAsync(id);
      if (task == null)
      {
        return NotFound();
      }

      _context.TaskModels.Remove(task);
      await _context.SaveChangesAsync();

      return task;
    }

    private bool TasksExists(int id)
    {
      return _context.TaskModels.Any(e => e.TaskId == id);
    }
  }

}
}
