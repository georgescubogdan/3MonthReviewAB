using System;
using System.Collections.Generic;
using System.Text;

namespace CoreModels.Models
{
    public class State
    {
        public int StateId { get; set; }
        public string Title { get; set; }

        public  ICollection<Task> Tasks { get; set; }

       

    }
}
