import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { UserResponse } from 'src/app/models/response/user-response.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from 'src/app/components/delete-user-dialog/delete-user-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  data: MatTableDataSource<UserResponse> =
    new MatTableDataSource<UserResponse>();
  isLoading: boolean = true;

  private usersReloadSubscription: Subscription;

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
  ) {
    this.usersReloadSubscription = this.userService.reloadUsers$.subscribe(
      () => {
        this.fetchUsers();
      },
    );
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  ngOnDestroy(): void {
    this.usersReloadSubscription.unsubscribe();
  }

  fetchUsers() {
    this.isLoading = true;
    this.userService
      .getUsers()
      .then((res) => {
        this.data.data = res;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  onDelete(user: UserResponse) {
    this.dialog.open(DeleteUserDialogComponent, {
      data: {
        user: user,
      },
    });
  }
}
