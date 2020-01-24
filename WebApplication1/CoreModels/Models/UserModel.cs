using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CoreModels.Models
{
  public class UserModel : IdentityUser<int>
  {
    public virtual ICollection<UserTasksModel> UserTasks { get; set; }
    [Required, StringLength(20)]
    public string FirstName { get; set; }

    [Required, StringLength(20)]
    public string LastName { get; set; }

    [NotMapped]
    public string FullName { get { return $"{FirstName} {LastName}"; } }
  }
}
