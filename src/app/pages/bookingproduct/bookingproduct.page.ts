import { Component, OnInit , ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController,IonInfiniteScroll,AlertController,ToastController,ModalController  } from '@ionic/angular';
import { ImageViewerComponent } from '../../component/image-viewer/image-viewer.component';

@Component({
  selector: 'app-bookingproduct',
  templateUrl: './bookingproduct.page.html',
  styleUrls: ['./bookingproduct.page.scss'],
})
export class BookingproductPage implements OnInit {

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
    await this.api.getData(`stock/stocklist?page=${this.page}`)
      .subscribe(res => {
        this.items = res;
        loading.dismiss();
      }, err => {
        this.api.showMiddlewareAlert(err)
        loading.dismiss();
      });
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

    await this.api.getData(`stock/stocklist?page=${this.page}`)
      .subscribe(res => {
             
        this.items = this.items.concat(res)
        event.target.complete();
 
      }, err => {
 
        this.api.showMiddlewareAlert(err)
        
      });

      //console.log(event);


  }


async alertLocation(pid,status,qtyall) {
  
  const changeLocation = await this.alertCtrl.create({
    header: 'จำนวนสินค้า',
    message: 'โปรดระบุจำนวนสินค้าที่ต้องการ',
    mode:'ios',
    inputs: [
      {
        name: 'qty',
        placeholder: '',
        type: 'number',
        min:1,
        value: '1'
      },
    ],
    buttons: [
      {
        text: 'ยกเลิก',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'ตกลง',
        handler: async (data) => {
         // console.log('Change clicked', data);
          this.yourqty = data.qty;
    

          if(data.qty=="" || data.qty==0){

            const toast = await this.toastCtrl.create({
              message: 'กรุณากรอกตัวเลขด้วยค่ะ!',
              duration: 3000,
              position: 'top',
              closeButtonText: 'ตกลง',
              showCloseButton: true,
              color:"dark"
            });
            toast.present();

          }else if(this.yourqty > parseInt(qtyall)){

            const toast = await this.toastCtrl.create({
              message: 'จำนวนเบิกมากกว่าในสต๊อกค่ะ!',
              duration: 3000,
              position: 'top',
              closeButtonText: 'ตกลง',
              showCloseButton: true,
              color:"dark"
            });
            toast.present();
          }else{

            let userid = this.user.u_id;

            this.api.postData({'qty':this.yourqty,'userid':userid,'proid':pid,'status':status},'booking/save')
            .subscribe(res => {
                //let id = res['status'];
                console.log(res);
                
                if(res.status==1){
                 
                  this.api.presentToast(res.message);

                }else{
                  if(res.status==0){
                    this.api.presentToast(res.message);
                  }
                
                }

                //this.getData();

              }, (err) => {
              
                this.api.showMiddlewareAlert(err)
              });

          }
          

          
        }
      }
    ]
  });
  changeLocation.present();
}


}
