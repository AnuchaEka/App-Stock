import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-stocklost',
  templateUrl: './stocklost.page.html',
  styleUrls: ['./stocklost.page.scss'],
})
export class StocklostPage implements OnInit {

   item: any;
   id: number;
   resdata;

  constructor(
   public navParams: NavParams,
   private modalCtrl: ModalController,
   private api:ApiService

    ) { 

      this.item = navParams.get('item');
      this.id = navParams.get('id');
    }

  ngOnInit() {
   //console.log(this.item);
   //console.log(this.id);
   this.getData();
  }

    
   async getData(){

    await this.api.postData({'id':this.id,'refid':this.item.refif},'stock/getstocklist')
      .subscribe(res => {
        this.resdata = res.resultData;
       
       // console.log(res);
        }, (err) => {

          this.api.showMiddlewareAlert(err)
        });

  }

  close() {
    this.modalCtrl.dismiss();
  }

}
