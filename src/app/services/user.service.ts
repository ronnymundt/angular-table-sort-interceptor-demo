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

  userList$ = combineLatest([
    this.getUsers(),
    this.sortBy$
  ]).pipe(
    map(([data, sort]) => {
      return [...data].sort((a, b) => {
        const aValue = a[sort.key as keyof IUserData];
        const bValue = b[sort.key as keyof IUserData];

        if (aValue === bValue) return 0;

        if (sort.asc) {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }),
  );
}
