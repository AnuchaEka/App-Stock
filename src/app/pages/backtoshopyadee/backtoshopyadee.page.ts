import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController} from '@ionic/angular';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-backtoshopyadee',
  templateUrl: './backtoshopyadee.page.html',
  styleUrls: ['./backtoshopyadee.page.scss'],
})
export class BacktoshopyadeePage implements OnInit {


  id:any=0;

  options:BarcodeScannerOptions;
  encodText:string='';
  encodedData:any={};
  scannedData:any={};
  resdata;

  userProfile;
  user;
 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingCtrl: LoadingController,
    public scanner:BarcodeScanner,
  ) {
 
    this.userProfile =this.api.getStore();
    this.user = this.userProfile.data;
   }

   doRefresh(event) {
    //console.log('Begin async operation');
    setTimeout(() => {
     // console.log('Async operation has ended');
     this.getData()
     event.target.complete();
    }, 2000);
  }

  ngOnInit() {
    this.getData();
  }


  scan(){
    this.options={
      prompt:'สแกนรหัส QR หรือบาร์โค้ดของคุณ'
    };
  this.scanner.scan(this.options).then((data)=>{
    this.scannedData=data;

     let userid = this.user.u_id;
     
     this.api.postData({'code':data.text,'userid':userid,'shopID':this.id},'backtoshop/backshop')
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
    await this.api.getDataById('backtoshop/viewbackshop',this.id)
      .subscribe(res => {
        //console.log(res);
        this.resdata = res;
        loading.dismiss();
      }, err => {
        //console.log(err);
        loading.dismiss();
      });
  }

  getPage(){
    this.router.navigate([`backtoshophistory`]);
  }
}
