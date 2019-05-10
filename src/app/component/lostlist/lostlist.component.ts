import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-lostlist',
  templateUrl: './lostlist.component.html',
  styleUrls: ['./lostlist.component.scss'],
})
export class LostlistComponent implements OnInit {

  @Input() lostItem = '';
  @Input() lostID = '';

  resdata;
  
  constructor(private modalController: ModalController ,private api:ApiService) { }

  ngOnInit() {
    //console.log(this.item);
    //console.log(this.id);
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
   
 
     
    async getData(){
 
     await this.api.postData({'id':this.lostID,'refid':this.lostItem},'stock/getstocklist')
       .subscribe(res => {
         this.resdata = res.resultData;
        
        // console.log(res);
         }, (err) => {
 
           this.api.showMiddlewareAlert(err)
         });
 
   }



  close() {
    this.modalController.dismiss();
  }


}
