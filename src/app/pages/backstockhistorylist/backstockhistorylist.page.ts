import { Component, OnInit , ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController,IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-backstockhistorylist',
  templateUrl: './backstockhistorylist.page.html',
  styleUrls: ['./backstockhistorylist.page.scss'],
})
export class BackstockhistorylistPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  name;
 id
 pid;
 items =[];
 proname;
 page=1;
 myDate;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService,
    public loadingController: LoadingController,
    
   
   ) { 
    this.name = this.route.snapshot.paramMap.get('name');
    this.id = this.route.snapshot.paramMap.get('id');
    this.pid = this.route.snapshot.paramMap.get('pid');
 
   }



  customPickerOptionFrom = {
    mode: "ios",
    buttons: [{
      text: 'ลบ',
      handler: () =>{
       // console.log("OnClearDatetime")
        this.myDate='';
        this.getData();
      }
        
    },{
      text: 'เลือก',
      handler: (event) => {
       // console.log('Clicked Save!')
        //console.log(event);
        this.myDate=`${event.year.text}-${event.month.text}-${event.day.text}`;
        //console.log(this.myDate);
        this.getItems(this.myDate);  
      }
    }]
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getData();
    this.getProd();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getData();
      this.getProd();
      event.target.complete();
     }, 2000);
  }

  async getProd(){

    return await this.api.getDataById('backtostock/getProduct',this.pid)
      .subscribe(res => {

       // console.log(res);
        
        this.proname=res.data['p_name'];

        }, (err) => {

          this.api.showMiddlewareAlert(err)
        });

  }



  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    this.page=1;

    await loading.present();
    await this.api.getData(`backtostock/viewstockallProd/${this.id}/${+this.pid}?page=${this.page}`)
      .subscribe(res => {
        this.items = res;
        loading.dismiss();
      }, err => {
        this.api.showMiddlewareAlert(err)
        loading.dismiss();
      });
  }


  

   
  async getItems(date) {
  
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    this.page=1;

    await loading.present();
    await this.api.getData(`backtostock/viewstockallProd/${this.id}/${+this.pid}?page=${this.page}&date=${date}`)
      .subscribe(res => {
        this.items = res;
        loading.dismiss();
      }, err => {
        this.api.showMiddlewareAlert(err)
        loading.dismiss();
      });


  }

 



  async loadData(event?) {

    this.page++;

    await this.api.getData(`backtostock/viewstockallProd/${this.id}/${+this.pid}?page=${this.page}`)
      .subscribe(res => {
             
        this.items = this.items.concat(res)
        event.target.complete();
        //console.log(this.page);
 
      }, err => {
 
        this.api.showMiddlewareAlert(err)
        
      });

      //console.log(event);


  }



}
