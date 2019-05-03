import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sellhistory',
  templateUrl: './sellhistory.page.html',
  styleUrls: ['./sellhistory.page.scss'],
})
export class SellhistoryPage implements OnInit {

  id:any=0;
  resdata;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingCtrl: LoadingController,

  ) {
  
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


  
  async getData() {
    
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
    });

    await loading.present();
    await this.api.getDataById('sellproducts/viewstockall',this.id)
      .subscribe(res => {
        //console.log(res);
        this.resdata = res;
        loading.dismiss();
      }, err => {
        //console.log(err);
        loading.dismiss();
      });
  }


  getlits(pid){
    this.router.navigate([`sellhistorylist/${pid}`]);
  }


}
