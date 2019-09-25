import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { FileUploadService } from '../service/file-upload.service';

import { User } from '../models/user.model';
import { ChannelService } from '../service/channel.service';
import { Channel } from '../models/channel.model';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.page.html',
  styleUrls: ['./create-channel.page.scss'],
})
export class CreateChannelPage implements OnInit, OnDestroy {
  @Input() new: boolean;
  @Input() channel?: Channel;
  @Input() user: User;
  form: FormGroup;
  photoURL: string;
  file: File;
  sub: Subscription;

  constructor(
    private modalCon: ModalController,
    private asf: AngularFirestore,
    private formB: FormBuilder,
    private channelS: ChannelService,
    private LoadingCon: LoadingController,
    private fileUploadS: FileUploadService,
  ) {}

  ngOnInit(): void {
    this.photoURL = this.channel
      ? this.channel.photoURL
      : 'https://source.unsplash.com/random';
    const nameVal = [
      [Validators.required, Validators.minLength(5), Validators.maxLength(25)],
      // [NicknameValidator.nickname(this.asf, this.user, this.new)],
    ];
    if (this.new) {
      this.form = this.formB.group({
        name: ['', ...nameVal],
        description: [''],
      });
    } else {
      this.form = this.formB.group({
        name: ['', ...nameVal],
        description: [''],
      });
    }
  }

  onPreview(uri: string) {
    this.photoURL = uri;
  }
  onFile(file: File) {
    this.file = file;
  }
  async closeModal() {
    const modal = await this.modalCon.getTop();
    modal.dismiss();
  }
  private submit(channel: Channel) {
    if (this.new) {
      return this.channelS.createChannel(channel);
    } else {
      this.channelS.updateChannel(this.channel.id, channel);
      return new Promise(res => res(null));
    }
  }
  async onSubmit() {
    const path = `channel/${this.name.value}`;
    const loading = await this.LoadingCon.create({
      message: 'creating',
      duration: 2000,
    });
    loading.present();
    if (this.file) {
      this.sub = this.fileUploadS
        .upload(path, this.file)
        .subscribe(async photoURL => {
          const newChannel = new Channel(
            this.name.value,
            this.description.value,
            this.user.uid,
            photoURL,
          );
          await this.submit(newChannel);
          await loading.dismiss();
          await this.closeModal();
        });
    } else {
      const newChannel = new Channel(
        this.name.value,
        this.description.value,
        this.user.uid,
        this.photoURL,
      );
      await this.submit(newChannel);
      await loading.dismiss();
      await this.closeModal();
    }
  }

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get profileForm() {
    return this.form;
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}