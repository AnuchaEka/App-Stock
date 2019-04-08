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
   public navParams: NavParams,
   private modalCtrl: ModalController
    ) { 

      this.item = navParams.get('item');
      this.id = navParams.get('id');
    }

  ngOnInit() {
    console.log(this.item);
    console.log(this.id);
    
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
