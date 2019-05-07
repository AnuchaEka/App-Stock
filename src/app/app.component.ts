import { Component } from '@angular/core';

import { Platform,NavController, AlertController,Events,MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router ,RouterEvent} from '@angular/router';
import { AuthenService } from './services/authen.service';
import { ApiService } from './services/api.service';

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
  version = '2.0.0'

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
      title: 'เบิกสินค้าส่งให้ลูกค้า',
      url: '/cutstockshop',
      icon: 'clipboard-list',
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
      title: 'รับสินค้าคืนจากลูกค้า',
      url: '/backtoshop',
      icon: 'undo-alt',
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
      title: 'จอง/เบิกสินค้า',
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
      title: 'เบิกสินค้าส่งบ้านยาดี',
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
      title: 'เบิกสินค้าให้บ้านยาดี',
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
    private menu: MenuController
    
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
 
      this.api.getAuthen(data=>{
        if(data)
        {
          this.userProfile = data.data;
          this.img=data.img;
          this.user.role = this.userProfile.u_position;
        
          this.api.getDataById('account/getUser',this.userProfile.u_id)
      .subscribe(res => {
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

      
    //   this.authen.authenticationState.subscribe(state => {

    //     if (state!=null) {
    //      this.userProfile=state.data;  
    //      this.img=state.img;
           
    //      this.navCtrl.navigateRoot('/home');

    //     }else{
    //      this.navCtrl.navigateRoot('/login');
    //     }
    //  });


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
