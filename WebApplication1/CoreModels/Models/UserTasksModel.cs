using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace CoreModels.Models
{
  public class UserTasksModel
  {
    public int TaskId { get; set; }
    public virtual TaskModel Task { get; set; }
    public int UserId { get; set; }
    public virtual UserModel UserModel { get; set;}
  }
}
