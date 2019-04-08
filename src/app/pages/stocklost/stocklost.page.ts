import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
@Component({
  selector: 'app-stocklost',
  templateUrl: './stocklost.page.html',
  styleUrls: ['./stocklost.page.scss'],
})
export class StocklostPage implements OnInit {

   item: any;
   id: number;

  constructor(
   private navParams: NavParams,
   private modalCtrl: ModalController
    ) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
