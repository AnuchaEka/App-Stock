import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cutstockhistorylist',
  templateUrl: './cutstockhistorylist.page.html',
  styleUrls: ['./cutstockhistorylist.page.scss'],
})
export class CutstockhistorylistPage implements OnInit {

  name;
  id
  pid;
  resdata=[];
  proname;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingCtrl: LoadingController,
  ) { 
    this.name = this.route.snapshot.paramMap.get('name');
    this.id = this.route.snapshot.paramMap.get('id');
    this.pid = this.route.snapshot.paramMap.get('pid');
  }

  doRefresh(event) {
    //console.log('Begin async operation');
    setTimeout(() => {
     // console.log('Async operation has ended');
     this.getProd()
     this.getData();
     event.target.complete();
    }, 2000);
  }


  ngOnInit() {
    this.getProd();
    this.getData();
  }

  async getProd(){

    return await this.api.getDataById('cutstock/getProduct',this.pid)
      .subscribe(res => {

       // console.log(res);
        
        this.proname=res.data['p_name'];

        }, (err) => {

          this.api.showMiddlewareAlert(err)
        });

  }


  async getData() {
    
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
    });

    await loading.present();
    await this.api.getData('cutstock/viewstockallProd/'+this.id+'/'+this.pid)
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
