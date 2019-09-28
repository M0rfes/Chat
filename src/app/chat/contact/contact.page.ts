import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit, OnDestroy {
  users: User[];
  lastId = '';
  sub: Subscription;
  sub2: Subscription;
  constructor(private userS: UserService) {}
  loadUsers(): Observable<User[]> {
    return this.userS.getAll();
  }
  ngOnInit() {
    this.sub2 = this.loadUsers().subscribe(users => {
      if (users.length === 0) {
        return 0;
      } else {
        this.lastId = users[users.length - 1].uid;
        this.users = users;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
