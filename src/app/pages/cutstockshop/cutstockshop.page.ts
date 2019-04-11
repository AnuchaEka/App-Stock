import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cutstockshop',
  templateUrl: './cutstockshop.page.html',
  styleUrls: ['./cutstockshop.page.scss'],
})
export class CutstockshopPage implements OnInit {
  resdata;
  constructor(
    private api:ApiService,
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

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
        loading.dismiss();
      });
  }

  getPage(id,name){
    this.router.navigate(['cutstocktoshop/'+id+'/'+name]);
  }


}
