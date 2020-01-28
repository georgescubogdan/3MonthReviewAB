import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdateTimestampService } from '../../services/update-timestamp.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  activeButton = true;
  taskForm = new FormGroup({
  title: new FormControl('', Validators.required),
  taskId:  new FormControl('') ,
  description: new FormControl('', Validators.required),
  stateId:  new FormControl('') ,
  userId:  new FormControl('') ,
  priority:  new FormControl('') ,
  });
  task: Task;
  public onSubmitTask() {
    this.taskForm.markAsDirty();
    if (this.taskForm.valid) {
      const data = {
        taskId: this.taskForm.value.taskId,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        stateId: this.task.stateId,
        userId: this.task.userId,
        priority: this.task.priority,
        comments: this.task.comments
      };
      this.activeButton = false;
      if (data.taskId === 0) {
        this.tasksService.addTask(data).then(
          c => {
            this.activeModal.close('Success');
            this.updateTimestampService.updateTimestampDates();
            this.toastrService.success('', 'Taskul a fost adaugata cu succes!');
            this.activeButton = true;

          })
          .catch(fail => {
            this.toastrService.error('', 'Taskul nu a putut fi adaugata!');
          });
      } else {
        this.tasksService.editTask(data).then(
        c => {
          this.toastrService.success('', 'Taskul a fost editat cu succes!!');
          this.updateTimestampService.updateTimestampFormulas();
          this.activeModal.close('Success');
        })
        .catch(fail => {
          this.toastrService.error('', 'Taskul nu a putut fi editat!!');

        });
      }
    } else {
      const data = {
       // creeaza data
      };
      this.toastrService.error('', 'Datele nu sunt valide!!');
      this.taskForm.markAsTouched();
      this.taskForm.markAsDirty();
    }
  }
  constructor( public tasksService: TasksService,
               public activeModal: NgbActiveModal,
               public toastrService: ToastrService,
               public updateTimestampService: UpdateTimestampService) { }

  ngOnInit() {
    this.activeButton = true;
  }

}
