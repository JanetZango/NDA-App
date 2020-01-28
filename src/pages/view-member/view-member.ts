import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowdetailsPage } from '../showdetails/showdetails';
import { RegisterPage } from '../register/register';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the ViewMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-member',
  templateUrl: 'view-member.html',
})
export class ViewMemberPage {
  ViewMemberArr = new Array();
  getCurrentUser = new Array();
  memberArr = new Array();
  displayMember = new Array();
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
  items;
  names;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider, platform: Platform) {
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
    console.log(this.province_id)
    console.log(this.viewCSoArr)

    this.get();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMemberPage');
  }


  registerCSO() {
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(RegisterPage, { orgObject: this.viewCSoArr[x] });
    }
  }

  get() {
    console.log(this.id)
    this.sqliteService.DisplayCso(this.province_id).then((data: any) => {
      this.ViewMemberArr = data;
      this.ViewMemberArr.reverse();
      this.storeNames();
      console.log(this.ViewMemberArr)
    })
  }
  viewMore(name) {
    for (var x = 0; x < this.ViewMemberArr.length; x++) {
      if (name == this.ViewMemberArr[x].name_of_cso) {
        this.navCtrl.push(ShowdetailsPage, { orgObject: this.ViewMemberArr[x] });
        break;
      }

    }


  }


  getItems(ev: any) {
    console.log(`hi serach`);
    this.initializeItems();
    // this.searchlist = true
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      let searchlist = document.getElementsByClassName('searchitem') as HTMLCollectionOf<HTMLElement>;
      //searchlist[0].style.display = 'block';
    }
    else {
      this.items = []
    }
  }
  initializeItems() {
    this.items = []
    this.items = this.namesArr
    console.log(this.items)
  }
  namesArr = new Array()
  storeNames() {
    this.namesArr = this.sqliteService.getName();
    console.log(this.namesArr)
  }


}
