import { Component, inject } from '@angular/core';
import { SortOrderIndicatorPipe } from '../../pipes';
import { UserService } from '../../services';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [ AsyncPipe, SortOrderIndicatorPipe],
})
export class UserListComponent {
  private readonly userService = inject(UserService);
  userList$ = this.userService.userList$;
  sortOrder$ = this.userService.sortBy$;

  onSortClick(key: string) {
    const current = this.userService.sortBy$.value;
    this.userService.sortBy$.next({
      key,
      asc: current.key === key ? !current.asc : true,
    });
  }
}
