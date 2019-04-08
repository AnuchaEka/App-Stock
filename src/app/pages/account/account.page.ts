import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../../services/authen.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  userProfile;
  img;

  constructor(
    private authen: AuthenService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private api:ApiService
  ) { 

    //this.getdata()
  }

  ngOnInit() {

  //   this.authen.authenticationState.subscribe(state => {

  //     if (state!=null) {
  //      this.userProfile=state.data;  
  //      this.img=state.img;

  //     }
  //  });


  }
 
  ionViewWillEnter() {
    this.getdata()
  }
  

  async getdata(){

    await this.api.getDataById('account/getUser',this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {

        this.userProfile=res.data;
        this.img=res.img;

        }, (err) => {

          this.api.presentToast('ไม่พบสัญญาณ internet หรือไม่สามารถติดต่อ server ได้');
        });

  }


  async logout() {

    const alert = await this.alertCtrl.create({
      header: 'ออกจากระบบ',
      message: 'คุณต้องการออกจากระบบหรือไม่ ?',
      mode:'ios',
      buttons: [{
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            //this.router.navigateByUrl('home');  
            //console.log('** Saída do App Cancelada! **');
          }
      },{
          text: 'ตกลง',
          handler: () => {
            this.authen.logout();
            this.navCtrl.navigateRoot('/login');
            
          }
      }]
  });
  await alert.present();

  }

  async  editprofile(id){
    this.router.navigate(['editprofile/'+id]);
  }

    async  changpassword(id){
    this.router.navigate(['changpassword/'+id]);
  }
  



}
