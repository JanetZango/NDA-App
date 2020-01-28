import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ListPage } from '../list/list';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AddPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-password',
  templateUrl: 'add-password.html',
})
export class AddPasswordPage {
  viewCSoArr = new Array();
  id;
  email;
  password_hash;
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public sqliteService: SqliteProvider) {
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    // console.log(this.viewCSoArr);
    this.id = this.viewCSoArr[0].id;
    this.email = this.viewCSoArr[0].email;
    this.password_hash = this.viewCSoArr[0].password_hash
    // console.log(this.id)
    // console.log(this.email)
    // console.log(this.password_hash)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPasswordPage');
  }
  displayDta(){
    if(this.password_hash == null || this.password_hash == undefined){
      const alert = this.alertCtrl.create({
        subTitle: 'Please enter password!',
        buttons: ['OK']
      });
      alert.present()
    }
      this.sqliteService.updateUserPssword(this.id,this.password_hash).then((data)=>{
        this.sqliteService.checkingEmail(this.email).then((data)=>{
          console.log(data)
   
          const alert = this.alertCtrl.create({
           subTitle: 'Your Password has been created!',
           buttons: ['OK']
         });
         alert.present()
       ;
          this.navCtrl.push(ListPage);
        })
      })
  }

  login(){
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(ListPage, { orgObject: this.viewCSoArr[x] });
    }
  }

}
