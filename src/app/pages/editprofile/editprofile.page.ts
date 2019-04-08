import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActionSheetController, NavController, MenuController, LoadingController,Events, Platform,ToastController } from '@ionic/angular';
import { Router,ActivatedRoute } from  "@angular/router";
import { AuthenService } from '../../services/authen.service';
import { ApiService } from '../../services/api.service';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
 
import { finalize } from 'rxjs/operators';
import { SERVER_URL } from '../../../environments/environment';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  validations_form: FormGroup;
  userProfile;
  img;
  res;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authen :AuthenService,
    private router :Router  ,
    private api :ApiService,
    private route: ActivatedRoute,
    private events :Events,

    private camera: Camera, 
    private file: File, 
    private http: HttpClient, 
    private webview: WebView,
    private actionSheetController: ActionSheetController, 
    private toastController: ToastController,
    private plt: Platform, 
    private ref: ChangeDetectorRef, 
    private filePath: FilePath

  ) { 

    this.userProfile =this.api.getStore();

  
    this.res = this.userProfile.data;
    //this.img=this.userProfile.img;
   }
  
  ionViewWillEnter(){
    this.getdata();
  }

  

  async getdata(){

    return await this.api.getDataById('account/getUser',this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
          localStorage.setItem('userData',JSON.stringify(res))
          this.authen.editdata(res);
          this.events.publish('user:changed', res);
          this.img=res.img

        }, (err) => {

          this.api.presentToast('ไม่พบสัญญาณ internet หรือไม่สามารถติดต่อ server ได้');
        });

  }


  ngOnInit() {
    
    this.validations_form = this.formBuilder.group({

      username: new FormControl(this.res.u_username, Validators.compose([
        Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      
      name: new FormControl(this.res.u_name, Validators.required),
      lastname: new FormControl(this.res.u_lastname, Validators.required),
      email: new FormControl(this.res.u_email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl(this.res.u_tel, Validators.compose([
        Validators.pattern('^[0-9]+$')
      ])),

    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'กรอกชื่อผู้ใช้งานด้วยค่ะ!' },
      { type: 'pattern', message: 'กรอก a-zA-Z0-9 เท่านั้นค่ะ!' },
    ],
    'name': [
      { type: 'required', message: 'กรอกชื่อด้วยค่ะ!' }
    ],
    'lastname': [
      { type: 'required', message: 'กรอกนามสกุลด้วยค่ะ!' }
    ],
    'email': [
      { type: 'required', message: 'กรอกอีเมลด้วยค่ะ!.' },
      { type: 'pattern', message: 'กรอกอีเมลให้ถูกต้องด้วยค่ะ' }
    ],
    'phone': [
      { type: 'pattern', message: 'กรอกเฉพาะตัวเลขเท่านั้นค่ะ!' }
    ],
    

  }

  async onSubmit(values){
    //console.log(values);
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
      });
      await loading.present();
      await this.api.updateData('account/updateprofile',this.route.snapshot.paramMap.get('id'),values)
      .subscribe(res => {
       
        loading.onWillDismiss().then(() => {
          this.api.presentToast(res.message);
          localStorage.setItem('userData',JSON.stringify(res))
          this.authen.editdata(res);
          this.events.publish('user:changed', res);

          this.router.navigate(['account/'+this.route.snapshot.paramMap.get('id')]);
          
           });
      
        }, (err) => {

          this.api.presentToast('ไม่พบสัญญาณ internet หรือไม่สามารถติดต่อ server ได้');

        });

  
}

//Edit Profile Image

pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    let converted = this.webview.convertFileSrc(img);
    return converted;
  }
}

async presentToast(text) {
  const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
  });
  toast.present();
}

async selectImage() {
  const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
              text: 'Load from Library',
              handler: () => {
                  this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
          },
          {
              text: 'Use Camera',
              handler: () => {
                  this.takePicture(this.camera.PictureSourceType.CAMERA);
              }
          },
          {
              text: 'Cancel',
              role: 'cancel'
          }
      ]
  });
  await actionSheet.present();
}


takePicture(sourceType: PictureSourceType) {
  var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
  };

  this.camera.getPicture(options).then(imagePath => {
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              });
      } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
  });

}

createFileName() {
var d = new Date(),
    n = d.getTime(),
    newFileName = n + ".jpg";
return newFileName;
}

copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
    
     // this.updateStoredImages(newFileName);
     let filePath = this.file.dataDirectory + newFileName;
     let resPath = this.pathForImage(filePath);
     let newEntry = {
         name: newFileName,
         path: resPath,
         filePath: filePath
     };
     this.startUpload(newEntry)

  }, error => {
      this.presentToast('Error while storing file.');
  });
}

startUpload(imgEntry) {
  this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
          ( < FileEntry > entry).file(file => this.readFile(file))
      })
      .catch(err => {
          this.presentToast('Error while reading file.');
      });
}

readFile(file: any) {
  const reader = new FileReader();
  reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
  };
  reader.readAsArrayBuffer(file);
}

async uploadImageData(formData: FormData) {
  const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
  });
  await loading.present();

  this.http.post( SERVER_URL+"account/upload/"+this.route.snapshot.paramMap.get('id'), formData)
      .pipe(
          finalize(() => {
              loading.dismiss();
          })
      )
      .subscribe(res => {
          if (res['status']) {

            // localStorage.setItem('userData',JSON.stringify(res))
            // this.authen.editdata(res);
            this.getdata();
            this.presentToast(res['message'])


          } else {
              this.presentToast(res['message'])
          }
      });
      
}


}
