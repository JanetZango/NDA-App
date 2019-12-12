import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the RegisteruserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registeruser',
  templateUrl: 'registeruser.html',
})
export class RegisteruserPage {
  username
  full_name
  email
  province_id
  status
  role
  legacy_user_id
  created_at
  updated_id
  office
  title
  province_name
  user_group
  password
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider,platform: Platform) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisteruserPage');
    this.get();
  }

  // register() {
  //   this
  //     .sqliteService
  //     .creatuser(this.username, this.email ,this.password)
  //     .then(s => {
  //       console.log(s)
  //     });
  // }
  get() {
    this.sqliteService
      .getUser()
      .then((s) => {
        console.log(s)
      })
  }

}
