import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { DashboardRouterModule } from './router/dashboard-router.module';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule, NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SortableDirective } from './directives/sortable.directive';
import {AccordionModule} from 'ngx-accordion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthGuardService} from '../guards/auth-guard.service';


@NgModule({
  declarations: [

    SortableDirective,


  ],
  imports: [
    BrowserModule,
    CommonModule,
    DashboardRouterModule,
    RouterModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule,
    NgbModule
  ],
  entryComponents: [
  ],
  providers: [
    DecimalPipe,
    AuthGuardService,
  ]
})
export class DashboardModule { }
