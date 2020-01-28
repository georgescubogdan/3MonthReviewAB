import { Injectable, ViewChildren, QueryList } from '@angular/core';
import { SortDirection, SortableDirective } from '../directives/sortable.directive';
import { Task } from './task';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  tasks: Task[];
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
export class CommentsService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tasks$ = new BehaviorSubject<Task[]>([]);
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
        this._tasks$.next(result.tasks);
        this._total$.next(result.total);
      });

    this._search$.next();
    }


    get tasks$() { return this._tasks$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }

    private _set(patch: Partial<State>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }
    private async getTasks(): Promise<Task[]> {
      return await this.http.get<Task[]>(environment.taskApiUrl, {responseType: 'json'}).toPromise();
    }

    private async _search(): Promise<SearchResult> {
      // const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
      const dbTasks = await this.getTasks();
      const tasks = dbTasks;
      const total = tasks.length;
      return {tasks, total};
    }

}
