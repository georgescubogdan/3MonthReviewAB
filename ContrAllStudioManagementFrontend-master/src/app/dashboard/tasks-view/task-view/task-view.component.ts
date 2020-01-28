import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { CommentsService } from '../comments.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../tasks.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  // crtTask: Task;
  tasks: Task[];
  totalTasks: number;
  profActiv: boolean;
  comments: Comment[];
  task: Task;
  id: number;

  constructor(public commentsService: CommentsService, public tasksService: TasksService,
              private modalService: NgbModal, private toastrService: ToastrService) {
    this.commentsService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      tasks.forEach(t => {
         if (t.taskId === this.task.taskId) {
          this.task.comments = t.comments;
         }
       }
         );

    }
    );
    this.commentsService.total$.subscribe(totalTasks => {
      this.totalTasks = totalTasks;
    });
    this.profActiv = false;
  }
  openEditTask(task: Task) {
    const modalRef = this.modalService.open(TaskComponent, {centered: true, windowClass: 'my-modal'});
    modalRef.componentInstance.name = 'task';
    modalRef.componentInstance.task = task;
    modalRef.result.then(
      async () => {
                    this.tasksService.fetchData(); },
            () => {  });
  }
  deleteTask(id: number) {
    if (confirm('Esti sigur ca vrei sa stergi acest task?')) {
      this.tasksService.deleteTask(id)
        .then(
          res => {
            // this.updateTimestampService.updateTimestampFormulas();
            this.toastrService.success('', 'Taskul a fost sters!!');
            this.tasksService.fetchData();
        })
        .catch(
          fail => {
            this.toastrService.error('', 'Taskul nu a putut fi sters!');
        });
     }
  }

  ngOnInit() {
  }

}
