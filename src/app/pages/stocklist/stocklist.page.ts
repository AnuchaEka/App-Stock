import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.page.html',
  styleUrls: ['./stocklist.page.scss'],
})
export class StocklistPage implements OnInit {
 items;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingController: LoadingController,
    private photoViewer: PhotoViewer
   ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getstock()
  }

  doRefresh(event) {
    //console.log('Begin async operation');
    setTimeout(() => {
     // console.log('Async operation has ended');
     this.getstock()
     event.target.complete();
    }, 2000);
  }

  async getstock() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getData('stock/stocklist')
      .subscribe(res => {
       // console.log(res);
        this.items = res;
        loading.dismiss();
      }, err => {
       // console.log(err);
        loading.dismiss();
      });
  }

  zoom(img){
    this.photoViewer.show(img);
  }

  


 
  async getItems(ev) {
  
    var val = ev.target.value;

    if (val && val.trim() != '') {

      return  await this.api.getDataById('stock/stocklist',val)
      .subscribe(res => {
        this.items = res;
        //console.log(res);
        }, (err) => {

          this.api.presentToast('ไม่พบสัญญาณ internet หรือไม่สามารถติดต่อ server ได้');
        });

    }else{
      this.getstock();
    }


  }

  async getDetail(id,name){
   // console.log(id);
    this.router.navigate(['stockdetail/'+id+'/'+name]);

  }


}
