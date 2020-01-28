using System;
using System.Collections.Generic;
using System.Text;

namespace CoreModels.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string Text { get; set; }
        public int UserId { get; set; }
        public int TaskId { get; set; }
        public virtual Task Task { get; set; }

        public virtual UserModel User { get; set; }


    }
}
