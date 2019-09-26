import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { CreateChannelPage } from 'src/app/create-channel/create-channel.page';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { Subscription, Observable } from 'rxjs';
import { Channel } from 'src/app/models/channel.model';
import { ChannelService } from 'src/app/service/channel.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit, OnDestroy {
  user: User;
  channel: Channel;
  channels: Channel[] = [];
  lastId = '';
  sub: Subscription;
  sub2: Subscription;
  constructor(
    public authS: AuthService,
    private modalCon: ModalController,
    private userS: UserService,
    private channelS: ChannelService,
  ) {}

  ngOnInit() {
    this.userS.user$.subscribe(user => (this.user = user));
    this.loadChannels().subscribe(channels => {
      if (channels.length === 0) {
        return 0;
      } else {
        this.lastId = channels[channels.length - 1].id;
        this.channels = channels;
      }
    });
  }
  loadChannels() {
    return this.channelS.get(this.lastId);
  }
  async onCreateNew() {
    const modal = await this.modalCon.create({
      id: 'newChannel',
      component: CreateChannelPage,
      componentProps: {
        new: true,
        user: this.user,
      },
    });
    await modal.present();
  }
  loadData({ target }: { target: IonInfiniteScroll }) {
    this.sub = this.loadChannels().subscribe(channels => {
      target.complete();
      if (channels.length === 0) {
        target.disabled = true;
      } else {
        this.channels = [...this.channels, ...channels];
      }
    });
  }
  ngOnDestroy(): void {
    this.channels = [];
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
