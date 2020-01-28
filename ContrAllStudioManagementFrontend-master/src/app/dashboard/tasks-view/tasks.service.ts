import { Injectable, QueryList, ViewChildren } from '@angular/core';
import { Task } from './task';
import { SortDirection, SortableDirective } from '../directives/sortable.directive';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { tap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { States } from './states';

interface SearchResult {
  states: States[];
  total: number;
}
interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _states$ = new BehaviorSubject<States[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http: HttpClient, private serviceAuth: AuthService) {
    this.fetchData();
  }

  public async fetchData() {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      switchMap(() => this._search()),
      tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._states$.next(result.states);
        this._total$.next(result.total);
      });

    this._search$.next();
    }


    get states$() { return this._states$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }

    private _set(patch: Partial<State>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }


    private async getStates(): Promise<States[]> {
      return await this.http.get<States[]>(environment.statesApiUrl, {responseType: 'json'}).toPromise();
    }

    public async changeTask(task: Task): Promise<Task> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = task;
      return this.http.put<Task>(environment.taskApiUrl + '/' + body.taskId, body, {responseType: 'json', headers}).toPromise();
    }

    public async addState(body: States): Promise<States> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<States>(environment.statesApiUrl, body, {responseType: 'json', headers}).toPromise();
    }

    public async deleteState(id: number): Promise<States> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.delete<States>(environment.statesApiUrl + '/' + id, {responseType: 'json', headers}).toPromise();
    }
    public async editState(body: States): Promise<States> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<States>(environment.statesApiUrl + '/' + body.stateId, body, {responseType: 'json', headers}).toPromise();
    }
    public async addTask(body: Task): Promise<Task> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<Task>(environment.taskApiUrl, body, {responseType: 'json', headers}).toPromise();
    }
    public async editTask(body: Task): Promise<Task> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<Task>(environment.taskApiUrl + '/' + body.taskId, body, {responseType: 'json', headers}).toPromise();
    }
    public async deleteTask(id: number): Promise<Task> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.delete<Task>(environment.taskApiUrl + '/' + id, {responseType: 'json', headers}).toPromise();
    }


    private async _search(): Promise<SearchResult> {
      // const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
      const dbStates = await this.getStates();
      const states = dbStates;
      const total = states.length;
      return {states, total};
    }
}
