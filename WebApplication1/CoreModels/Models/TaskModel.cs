using System;
using System.Collections.Generic;
using System.Text;

namespace CoreModels.Models
{
  public class TaskModel
  {
    public int TaskId { get; set; }
    public int UserId { get; set; }
    public string Description { get; set; }
    public string Title { get; set; }
    public int Status { get; set; }
    public virtual ICollection<UserTasksModel> UserTasks { get; set; }
  }
}
