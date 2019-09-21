import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private modalCon: ModalController) {}

  ngOnInit() {}
  closeModal() {
    this.modalCon.dismiss();
  }
}
