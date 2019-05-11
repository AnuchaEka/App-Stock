import { Component, OnInit , ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController,IonInfiniteScroll,AlertController,ToastController,ModalController  } from '@ionic/angular';
import { ImageViewerComponent } from '../../component/image-viewer/image-viewer.component';

@Component({
  selector: 'app-productdepleted',
  templateUrl: './productdepleted.page.html',
  styleUrls: ['./productdepleted.page.scss'],
})
export class ProductdepletedPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

 items =[];
 page=1;
 yourqty:number;

 userProfile;
 user;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalController: ModalController
   ) { 

    this.userProfile =this.api.getStore();
    this.user = this.userProfile.data;

   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getstock()
 
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
    await this.api.getData(`productdepleted/stocklist?page=${this.page}`)
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




  async loadData(event?) {

    this.page++;

    await this.api.getData(`productdepleted/stocklist?page=${this.page}`)
      .subscribe(res => {
             
        this.items = this.items.concat(res)
        event.target.complete();
 
      }, err => {
 
        this.api.showMiddlewareAlert(err)
        
      });

      //console.log(event);


  }




}

