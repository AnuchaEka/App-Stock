import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

import { ApiService } from '../../services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-confrimstock',
  templateUrl: './confrimstock.page.html',
  styleUrls: ['./confrimstock.page.scss'],
})
export class ConfrimstockPage implements OnInit {

  options:BarcodeScannerOptions;
  encodText:string='';
  encodedData:any={};
  scannedData:any={};
  resdata;

  constructor(
    public scanner:BarcodeScanner,
    private api:ApiService,
    public loadingCtrl: LoadingController,
  ) { }

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

     let userid = sessionStorage.getItem('user_id');
     
     this.api.postData({'code':data.text,'userid':userid},'stock/checkstock')
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
    await this.api.getData('stock/viewcomfrimstock')
      .subscribe(res => {
        //console.log(res);
        this.resdata = res;
        loading.dismiss();
      }, err => {
        //console.log(err);
        loading.dismiss();
      });
  }

}
