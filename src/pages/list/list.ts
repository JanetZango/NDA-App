import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { Platform } from 'ionic-angular';
import { ViewMemberPage } from '../view-member/view-member';
import { CapacityPage } from '../capacity/capacity';
import { ViewMemberAssessPage } from '../view-member-assess/view-member-assess';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  getCurrentUser = [];
  viewCSoArr = new Array();
  auth_key;
  created_at;
  email;
  full_name;
  username;
  legacy_user_id;
  password_reset_token;
  password_hash;
  province_name;
  province_id;
  office;
  updated_at;
  user_group;
  title;
  status;
  role;
  id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider,platform: Platform) {
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    // console.log(this.viewCSoArr);
    this.auth_key = this.viewCSoArr[0].auth_key;
    this.created_at = this.viewCSoArr[0].created_at;
    this.email = this.viewCSoArr[0].email;
    this.full_name = this.viewCSoArr[0].full_name;
    this.id = this.viewCSoArr[0].id;
    this.legacy_user_id = this.viewCSoArr[0].legacy_user_id;
    this.office = this.viewCSoArr[0].office;
    this.password_hash = this.viewCSoArr[0].password_hash;
    this.password_reset_token = this.viewCSoArr[0].password_reset_token;
    this.province_id = this.viewCSoArr[0].province_id;
    this.province_name = this.viewCSoArr[0].province_name;
    this.role = this.viewCSoArr[0].role;
    this.status = this.viewCSoArr[0].status;
    this.title = this.viewCSoArr[0].title;
    this.updated_at = this.viewCSoArr[0].updated_at;
    this.user_group = this.viewCSoArr[0].user_group;
    this.username = this.viewCSoArr[0].username;

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  get(){
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(ProfilePage, { orgObject: this.viewCSoArr[x] });
    }
  }
  registerCSO(){
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(ViewMemberPage, { orgObject: this.viewCSoArr[x] });
    }
  }

  mobilisation(){
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(CapacityPage, { orgObject: this.viewCSoArr[x] });
    }
  }

  takeAssessemnt(){
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(ViewMemberAssessPage, { orgObject: this.viewCSoArr[x] });
    }
  }

  seeMember(){
    this.navCtrl.push(ViewMemberPage)
  }
 

}
