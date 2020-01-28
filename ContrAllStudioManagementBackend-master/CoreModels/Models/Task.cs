using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CoreModels.Models
{
     public class Task
    {

        [Key]
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public  int StateId { get; set; }
        public int UserId { get; set; }
        public int Priority { get; set; }
        public virtual ICollection<UserTaskModel> UserTaskModels { get; set; }
        public virtual State State { get; set; }

        public ICollection<Comment> Comments { get; set; }



    }
}
