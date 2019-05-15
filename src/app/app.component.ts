import { Component } from '@angular/core';

import { Platform,NavController, AlertController,Events,MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router ,RouterEvent} from '@angular/router';
import { AuthenService } from './services/authen.service';
import { ApiService } from './services/api.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  resuser:any;
  img:any;
  res;
  userProfile;
  version = '2.0.2'

  public appPages = [
    // {
    //   title: 'หน้าหลัก',
    //   url: '/home',
    //   icon: 'home',
    //   direct: 'root',
    // }  ,
    {
      title: 'สินค้าทั้งหมด',
      url: '/stocklist',
      icon: 'cubes',
      direct: 'forward',
    },
    {
          title: 'สินค้าใกล้จะหมด',
          url: '/productdepleted',
          icon: 'exclamation-triangle',
          direct: 'forward',
        }
  ];

  public appPagesShop = [

    {
      title: 'สินค้าทั้งหมด',
      url: '/stocklist',
      icon: 'cubes',
      direct: 'forward',
    },
    {
      title: 'ขายสินค้าให้ลูกค้า',
      url: '/sellproduct',
      icon: 'clipboard-list',
      direct: 'forward',
    }
    ,
    {
      title: 'ส่งเบิกสินค้าจากสต๊อก',
      url: '/bookingproduct',
      icon: 'bookmark',
      direct: 'forward',
    }
    ,

    {
      title: 'รับสินค้าคืนร้าน',
      url: '/backtoshopyadee',
      icon: 'undo-alt',
      direct: 'forward',
    }
    ,
    {
      title: 'ตรวจรับสินค้าเข้าร้าน',
      url: '/confrimshop',
      icon: 'clipboard-check',
      direct: 'forward',
    }
  ];

  public appPagesStock = [

    {
      title: 'สินค้าทั้งหมด',
      url: '/stocklist',
      icon: "cubes",
      direct: 'forward',
    },
    
    {
      title: 'เบิกสินค้าส่งลูกค้า',
      url: '/cutstockshop',
      icon: 'clipboard-list',
      direct: 'forward',
    }
    ,
    {
      title: 'รับสินค้าคืนจากลูกค้า',
      url: '/backtoshop',
      icon: 'undo-alt',
      direct: 'forward',
    }
    ,
    {
      title: 'เบิกสินค้าส่งบ้านยาดี',
      url: '/producttoshoplist',
      icon: 'store-alt',
      direct: 'forward',
    }
    ,
    {
      title: 'เบิกสินค้าจากโกดังใหญ่',
      url: '/producttostock',
      icon: 'warehouse',
      direct: 'forward',
    }

    ,
    {
      title: 'ตรวจรับสินค้าเข้าโกดังเล็ก',
      url: '/confrimstock',
      icon: 'clipboard-check',
      direct: 'forward',
    },
    {
          title: 'สินค้าใกล้จะหมด',
          url: '/productdepleted',
          icon: 'exclamation-triangle',
          direct: 'forward',
        }
    
  ];



  user: any = {role: 'ผู้ดูแลระบบ'};
  selectedPath = '';

  constructor(
     private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authen: AuthenService,
    private router: Router,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private api:ApiService,
    private events: Events,
    private menu: MenuController,
    private oneSignal: OneSignal
    
  ) {
    this.initializeApp();
    console.log(this.user.role);

    this.router.events.subscribe((event: RouterEvent) => {
      

      if (event && event.url) {
        this.selectedPath = event.url;
        //alert('ls');
      }
      
    });


    

    this.events.subscribe('user:changed', user => {
      // will update the user and immediately change menu accordingly
     // this.user = user; 
      this.userProfile =user.data;
      this.user.role = this.userProfile.u_position;
      this.img=user.img;
 
      this.api.getDataById('account/getUser',this.userProfile.u_id)
      .subscribe(res => {
          localStorage.setItem('userData',JSON.stringify(res))
          this.authen.editdata(res);
          sessionStorage.setItem('user_id',this.userProfile.u_id);
          
        });

  
   });
    
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      if (this.platform.is('cordova')) {

        if (this.platform.is('android')) {
          this.oneSignal.startInit('dfd8b431-057b-4f3f-a954-72736ca74850', '1040512901284');
        }
        if (this.platform.is('ios')) {
          this.oneSignal.startInit('dfd8b431-057b-4f3f-a954-72736ca74850');
        }
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      
      this.oneSignal.handleNotificationReceived().subscribe((result) => {
          // do something when notification is received

          console.log(result);
          
          //this.navCtrl.navigateRoot('/producttoshoplist');


        });
      this.oneSignal.handleNotificationOpened().subscribe(result => {
          // do something when a notification is opened
         
         console.log(result);

         //this.navCtrl.navigateRoot('/producttoshoplist');



        });
      
        this.oneSignal.endInit();
      
       // Then You Can Get Devices ID
        
         this.oneSignal.getIds().then(identity => {
            //  alert(identity.pushToken + " It's Push Token");
            //  alert(identity.userId + " It's Devices ID");
          localStorage.setItem('Token',identity.pushToken);
          localStorage.setItem('userIdToken',identity.userId)
             //console.log(identity);
               
        });

      
          }


 
      this.api.getAuthen(data=>{
        if(data)
        {
          this.userProfile = data.data;
          this.img=data.img;
          this.user.role = this.userProfile.u_position;
        
          this.api.getDataById('account/getUser',this.userProfile.u_id)
      .subscribe(res => {

        if(!res){
          this.authen.logout();
          this.navCtrl.navigateRoot('/login');
        }
          localStorage.setItem('userData',JSON.stringify(res))
          this.authen.editdata(res);
          sessionStorage.setItem('user_id',this.userProfile.u_id);
       

        });

          //console.log(this.userProfile);
   
         this.navCtrl.navigateRoot('/stocklist');
          
        }else{
   
          this.navCtrl.navigateRoot('/login');
         
        }

      });



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


  goToEditProgile(id){

    this.router.navigate(['account/'+id]);
  }






}
