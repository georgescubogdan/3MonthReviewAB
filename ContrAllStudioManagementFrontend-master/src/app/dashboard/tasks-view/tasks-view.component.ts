import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import { States } from './states';
import { TasksService } from './tasks.service';
import { state } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateComponent } from './state/state.component';
import { ToastrService } from 'ngx-toastr';
import { TaskComponent } from './task/task.component';
import { TaskViewComponent } from './task-view/task-view.component';


@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css']
})
export class TasksViewComponent implements OnInit {
  connectedTo = [];
  totalStates: number;
  profActiv: boolean;
  states: States[];
  t: Task;

  constructor(public tasksService: TasksService, private modalService: NgbModal, private toastrService: ToastrService) {
    this.tasksService.states$.subscribe(states => {
      this.states = states;
      states.forEach(s => this.connectedTo.push(s.title));

    });
    this.tasksService.total$.subscribe(totalStates => {
      this.totalStates = totalStates;
    });
    this.profActiv = false;
   }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  changeTaskState(task: Task, id: number) {
    console.log('intra');
    task.stateId = id;
    this.tasksService.changeTask(task);
  }

  openStateAdd(id: number) {
    const modalRef = this.modalService.open(StateComponent, {centered: true, windowClass: 'my-modal'});
    modalRef.componentInstance.name = 'state';
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      async () => {
        this.tasksService.fetchData(); },
        () => {});
  }
  openTaskAdd(id: number) {
    const data = {
      taskId: 0,
      stateId: id,
      title: '',
      description: '',
      comments: null
    };
    const modalRef = this.modalService.open(TaskComponent, {centered: true, windowClass: 'my-modal'});
    modalRef.componentInstance.name = 'task';
    modalRef.componentInstance.task = data;
    modalRef.result.then(
      async () => {
        this.tasksService.fetchData(); },
        () => {});
  }


  openEditState(id: number) {
    const modalRef = this.modalService.open(StateComponent, {centered: true, windowClass: 'my-modal'});
    modalRef.componentInstance.name = 'state';
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      async () => {
                    this.tasksService.fetchData(); },
            () => {  });
  }
 
  openTask(task: Task) {
    const modalRef = this.modalService.open(TaskViewComponent, {centered: true, windowClass: 'my-modal'});
    modalRef.componentInstance.name = 'task';
    modalRef.componentInstance.task = task;
    modalRef.result.then(
      async () => {
                    this.tasksService.fetchData(); },
            () => {  });
  }

  deleteState(id: number) {
    if (confirm('Esti sigur ca vrei sa stergi acest status?')) {
      this.tasksService.deleteState(id)
        .then(
          res => {
            // this.updateTimestampService.updateTimestampFormulas();
            this.toastrService.success('', 'Statusul a fost sters!!');
            this.tasksService.fetchData();
        })
        .catch(
          fail => {
            this.toastrService.error('', 'Statusul nu a putut fi sters!');
        });
     }
  }

  ngOnInit() {
  }

}
