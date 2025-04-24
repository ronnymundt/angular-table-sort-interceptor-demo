import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { IReqresInDto, IUserData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = 'https://reqres.in/api/users';

  private getUsers(): Observable<IUserData[]> {
    return this.httpClient
      .get<IReqresInDto>(`${this.url}`)
      .pipe(map((response) => response.data));
  }

  sortBy$ = new BehaviorSubject<{ key: string; asc: boolean }>({
    key: 'id',
    asc: true,
  });

  userList$ = combineLatest([this.getUsers(), this.sortBy$]).pipe(
    map(([data, sort]) => {
      return [...data].sort(
        (a, b) =>
          (a[sort.key as keyof IUserData] < b[sort.key as keyof IUserData] ? 1 : -1) * (sort.asc ? -1 : 1),
      );
    }),
  );
}
