import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cutstockhistory',
  templateUrl: './cutstockhistory.page.html',
  styleUrls: ['./cutstockhistory.page.scss'],
})
export class CutstockhistoryPage implements OnInit {
  name;
  id
  resdata;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingCtrl: LoadingController,

  ) {
    this.name = this.route.snapshot.paramMap.get('name');
    this.id = this.route.snapshot.paramMap.get('id');
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
    await this.api.getDataById('cutstock/viewstockall',this.id)
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
    this.router.navigate(['cutstockhistorylist/'+this.id+'/'+this.name+'/'+pid]);
  }


}
