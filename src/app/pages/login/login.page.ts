import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController,Events } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Router } from  "@angular/router";
import { AuthenService } from '../../services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public onLoginForm: FormGroup;
  resuser:any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private api:ApiService,
    private authService: AuthenService,
    private router :Router,
    private events :Events

  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'u_username': [null, Validators.compose([
        Validators.required
      ])],
      'u_password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }


  async login(){

    let username =this.onLoginForm.value.u_username;
    let password = this.onLoginForm.value.u_password;


    await this.api.postData({'u_username':username,'u_password':password},'account/login')
    .subscribe(res => {
        //let id = res['status'];
        if(res.status==1){

          localStorage.setItem('userData',JSON.stringify(res))
          this.authService.login(res);
          
          sessionStorage.setItem('user_id',res.data.u_id);

          this.events.publish('user:changed', res);

          this.router.navigate(['home']);
          
          //this.api.presentToast('เข้าสู่ระบบสำเร็จ');
        }else{
          this.api.presentToast('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
        }
        //console.log(res);
        //this.router.navigate(['/detail/'+id]);
      }, (err) => {
        //console.log(err);
        this.api.showMiddlewareAlert(err)
      });
  }

  

}
