import { Component, OnInit , ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController,IonInfiniteScroll,MenuController ,ModalController } from '@ionic/angular';
import { ImageViewerComponent } from '../../component/image-viewer/image-viewer.component';


@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.page.html',
  styleUrls: ['./stocklist.page.scss'],
})
export class StocklistPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

 items =[];
 page=1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingController: LoadingController,
    public menuCtrl: MenuController,
    public modalController: ModalController
   ) { 

   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getstock()
    this.menuCtrl.enable(true);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getstock()
      event.target.complete();
     }, 2000);
  }


  async getstock() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    this.page=1;

    await loading.present();
    await this.api.getData(`stock/stocklist?page=${this.page}`)
      .subscribe(res => {
        this.items = res;
        loading.dismiss();
      }, err => {
        this.api.showMiddlewareAlert(err)
        loading.dismiss();
      });
  }


  async viewImage(src: string, title: string = '') {
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        imgSource: src,
        imgTitle: title,
      },
      cssClass: 'modal-fullscreen',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

  

   
  async getItems(ev) {
  
    var val = ev.target.value;

    if (val && val.trim() != '') {

      return  await this.api.getDataById('stock/stocklist',val)
      .subscribe(res => {
        this.items = res;
        //console.log(res);
        }, (err) => {

          this.api.showMiddlewareAlert(err)
        });

    }else{
      this.getstock();
    }


  }

  async getDetail(id,name){
   // console.log(id);
    this.router.navigate(['stockdetail/'+id+'/'+name]);

  }



  async loadData(event?) {

    this.page++;

    await this.api.getData(`stock/stocklist?page=${this.page}`)
      .subscribe(res => {
             
        this.items = this.items.concat(res)
        event.target.complete();
 
      }, err => {
 
        this.api.showMiddlewareAlert(err)
        
      });

      //console.log(event);


  }




}
