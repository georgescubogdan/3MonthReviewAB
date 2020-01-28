import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UpdateTimestampService } from '../../services/update-timestamp.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  activeButton = true;
  userId: number;
  stateForm = new FormGroup({
  title: new FormControl('', Validators.required),
  id:  new FormControl('') ,
  });
  id: number;
  public onSubmitState() {
    this.stateForm.markAsDirty();
    if (this.stateForm.valid) {
      const data = {
        stateId: this.stateForm.value.id,
        title: this.stateForm.value.title,
        tasks: null
      };
      this.activeButton = false;
      if (data.stateId === 0) {
        this.tasksService.addState(data).then(
          c => {
            this.activeModal.close('Success');
            this.updateTimestampService.updateTimestampDates();
            this.toastrService.success('', 'Statusul a fost adaugata cu succes!');
            this.activeButton = true;

          })
          .catch(fail => {
            this.toastrService.error('', 'Statusul nu a putut fi adaugata!');
          });
      } else {
        this.tasksService.editState(data).then(
        c => {
          this.toastrService.success('', 'Statusul a fost editat cu succes!!');
          this.updateTimestampService.updateTimestampFormulas();
          this.activeModal.close('Success');
        })
        .catch(fail => {
          this.toastrService.error('', 'Statusul nu a putut fi editat!!');

        });
      }
    } else {
      const data = {
       // creeaza data
      };
      this.toastrService.error('', 'Datele nu sunt valide!!');
      this.stateForm.markAsTouched();
      this.stateForm.markAsDirty();
    }
  }
  constructor(public tasksService: TasksService,
              public activeModal: NgbActiveModal,
              public toastrService: ToastrService,
              public updateTimestampService: UpdateTimestampService) { }

  ngOnInit() {
    this.activeButton = true;
  }

}
