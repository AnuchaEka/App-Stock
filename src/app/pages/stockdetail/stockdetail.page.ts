import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController,  NavController, ModalController} from '@ionic/angular';

import { StocklostPage } from './../stocklost/stocklost.page';

@Component({
  selector: 'app-stockdetail',
  templateUrl: './stockdetail.page.html',
  styleUrls: ['./stockdetail.page.scss'],
})
export class StockdetailPage implements OnInit {

  name;
  resdata;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingController: LoadingController,
    public modal: ModalController,
    public navCtrl: NavController
  ) { 

    this.name = this.route.snapshot.paramMap.get('name');
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    // console.log(this.name);
     
  }

  ionViewWillEnter() {
    this.getData()
  }


  doRefresh(event) {
    //console.log('Begin async operation');
    setTimeout(() => {
     // console.log('Async operation has ended');
     //this.getstock()
     event.target.complete();
    }, 2000);
  }


  async getData(){

    await this.api.getDataById('stock/getwarehouse',this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.resdata = res;
        //console.log(res);
        }, (err) => {

          this.api.presentToast('ไม่พบสัญญาณ internet หรือไม่สามารถติดต่อ server ได้');
        });


    // this.api.getOne('getwarehouse',this.value.p_id)
    // .then((data:any) => {
    //   this.resdata = data;
    //  // console.log(this.resdata);
    // });
  }



  async open(item,id){
    const modal = await this.modal.create({
      component: StocklostPage,
      componentProps: { item: item,id:id }
    });
    return await modal.present();
  }



  
}
