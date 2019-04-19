import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-backtoshop',
  templateUrl: './backtoshop.page.html',
  styleUrls: ['./backtoshop.page.scss'],
})
export class BacktoshopPage implements OnInit {

  resdata;
 
  constructor(
    private api:ApiService,
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
  

  }
  
  ionViewWillEnter() {
    this.getData()
  }

  ngOnInit() {
    this.getData()
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
    await this.api.getData('cutstock/getShop')
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


  
  getPage(id,name){
    this.router.navigate(['backtostock/'+id+'/'+name]);
  }

}
