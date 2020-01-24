import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../guards/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'home',
        canActivate: [AuthGuardService],
        pathMatch: 'full',
      },
      {
        path: 'home',
        canActivate: [AuthGuardService],
        component: HomeComponent,
      },
      {
        path: '**',
        canActivate: [AuthGuardService],
        redirectTo: 'home',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouterModule { }
