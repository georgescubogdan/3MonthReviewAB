using System;
using System.Collections.Generic;
using System.Text;

namespace CoreModels.Models
{
    public class UserTaskModel
    {
        public int TaskId { get; set; }
        public Task Task { get; set; }
        public int UserId { get; set; }
        public UserModel User { get; set; }
    }
}
