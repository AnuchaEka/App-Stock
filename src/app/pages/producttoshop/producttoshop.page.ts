import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

import { ApiService } from '../../services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-producttoshop',
  templateUrl: './producttoshop.page.html',
  styleUrls: ['./producttoshop.page.scss'],
})
export class ProducttoshopPage implements OnInit {

 
  options:BarcodeScannerOptions;
  encodText:string='';
  encodedData:any={};
  scannedData:any={};
  resdata;

  userProfile;
  user;

  constructor(
    public scanner:BarcodeScanner,
    private api:ApiService,
    public loadingCtrl: LoadingController,
    ) { 

      this.userProfile =this.api.getStore();
      this.user = this.userProfile.data;

  }

  ngOnInit() {
    this.getData();
  }

  doRefresh(event) {
    //console.log('Begin async operation');
    setTimeout(() => {
     // console.log('Async operation has ended');
     this.getData()
     event.target.complete();
    }, 2000);
  }

 scan(){
    this.options={
      prompt:'สแกนรหัส QR หรือบาร์โค้ดของคุณ'
    };
  this.scanner.scan(this.options).then((data)=>{
    this.scannedData=data;

    let userid = this.user.u_id;
     
     this.api.postData({'code':data.text,'userid':userid},'stock/gotostockshop')
    .subscribe(res => {
        //let id = res['status'];
        if(res.status==1){
          this.getData();

        }else{
          if(res.status==0){
            this.api.presentToast(res.message);
          }
         
        }

        //this.getData();

      }, (err) => {
       
        this.api.showMiddlewareAlert(err)
      });


  },(err)=>{
    console.log('Error : ',err)
  });
  
  }

    async getData() {
    
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
    });

    await loading.present();
    await this.api.getData('stock/showstockshop')
      .subscribe(res => {
        //console.log(res);
        this.resdata = res;
        loading.dismiss();
      }, err => {
        //console.log(err);
        this.api.showMiddlewareAlert(err)
        loading.dismiss();
      });
  }

}
