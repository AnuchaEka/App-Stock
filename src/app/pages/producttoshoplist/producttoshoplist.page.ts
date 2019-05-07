import { Component, OnInit , ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController,IonInfiniteScroll,MenuController,AlertController,ToastController,ModalController  } from '@ionic/angular';
import { ImageViewerComponent } from '../../component/image-viewer/image-viewer.component';

@Component({
  selector: 'app-producttoshoplist',
  templateUrl: './producttoshoplist.page.html',
  styleUrls: ['./producttoshoplist.page.scss'],
})
export class ProducttoshoplistPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  items =[];
  userProfile;
  user; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingController: LoadingController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalController: ModalController
   ) { 

    this.userProfile =this.api.getStore();
    this.user = this.userProfile.data;

   }


   ngOnInit() {
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

    await loading.present();
    await this.api.getData(`stock/bookinglist`)
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

   

async getPage(bkgID) {
  
  this.router.navigate([`producttoshop/${bkgID}`]);

}

}

