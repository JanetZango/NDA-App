import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuildinginterventionsPage } from '../buildinginterventions/buildinginterventions';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { Platform } from 'ionic-angular';
import { ViewCapacityPage } from '../view-capacity/view-capacity';
/**
 * Generated class for the CapacityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-capacity',
  templateUrl: 'capacity.html',
})
export class CapacityPage {
  getCurrentUser = new Array();
  displayCapacity = new Array();
  viewCSoArr = new Array();
  getCso = new Array();
  attendance_register;
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
  items;
  names;
  constructor(public navCtrl: NavController, public navParams: NavParams,public sqliteService :SqliteProvider ) {
    this.viewCSoArr.push(this.navParams.get('orgObject'));
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
    console.log(this.id)
    console.log(this.viewCSoArr)



    this.getcso();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CapacityPage');
  }
  get(){
    this.sqliteService
    .getUser()
    .then((s:any) => {
      this.getCurrentUser = s;
      console.log(s)
      console.log(this.getCurrentUser)
    })
  } 

  building() {
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(BuildinginterventionsPage, { orgObject: this.viewCSoArr[x] });
    }

  }

  getcso(){
    this.sqliteService
    .DisplayCapacityBuilding(this.id)
    .then((s:any) => {
      this.displayCapacity.reverse()
      this.displayCapacity = s;

      console.log(s)
      console.log(this.displayCapacity)
    })
  }
  viewMore(name){
    for (var x = 0; x < this.displayCapacity.length; x++) {
     if (name == this.displayCapacity[x].facilitator_name) {
       this.navCtrl.push(ViewCapacityPage, { orgObject: this.displayCapacity[x]});
       break;
     }
   }
 }
}
