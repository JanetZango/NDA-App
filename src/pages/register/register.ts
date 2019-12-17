import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { ToastController } from 'ionic-angular';
import { ViewMemberPage } from '../view-member/view-member';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  memberArr = new Array();
  key;
  items;
  names;
  orgNames = new Array();
  getCurrentUser = new Array();
  viewCSoArr = new Array();
  ViewMemberArr = new Array();
  name_of_cso
  MobiMethod
  created_date
  registration_number = null
  nda_registration = null
  modified_by = null
  email_address = null
  cso_mobilisation_method_id = null
  modified_date = null
  mobilisation_date = null
  physical_address
  cso_type_id
  cso_sector_id;
  province_id
  municipality_id;
  auth_key;
  created_at;
  email;
  full_name;
  username;
  legacy_user_id;
  password_reset_token;
  password_hash;
  province_name;
  province_id1
  office;
  updated_at;
  user_group;
  title;
  status;
  role;
  id;
  ward_number
  district_id;
  collected_by;
  total_staff;
  contact_number;
  contact_person;
  created_by;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider, public toastCtrl: ToastController) {
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
    this.province_id1 = this.viewCSoArr[0].province_id;
    this.province_name = this.viewCSoArr[0].province_name;
    this.role = this.viewCSoArr[0].role;
    this.status = this.viewCSoArr[0].status;
    this.title = this.viewCSoArr[0].title;
    this.updated_at = this.viewCSoArr[0].updated_at;
    this.user_group = this.viewCSoArr[0].user_group;
    this.username = this.viewCSoArr[0].username;
    console.log(this.id);


    this.get();
    // this.getDistrict();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  SignUp() {
    this
      .sqliteService
      .regsiterCso(this.cso_type_id, this.cso_sector_id, this.province_id, this.district_id, this.municipality_id, this.ward_number, this.registration_number, this.nda_registration, this.name_of_cso, this.contact_person, this.physical_address, this.contact_number, this.email_address, this.total_staff, this.collected_by, this.modified_by, this.modified_date, this.id, this.created_date, this.cso_mobilisation_method_id, this.mobilisation_date)
      .then(s => {
        console.log(s)
        const toast = this.toastCtrl.create({
          message: 'cso was added successfully',
          duration: 3000
        });
        toast.present();
        this.navCtrl.push(ViewMemberPage)
      });
  }

  getDistrict(){
    this.sqliteService.getLookUpDistrict(this.province_id).then((data)=>{
      console.log(data)
    })
  }


  getItems(ev: any) {
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

  get() {
    console.log(this.id)
    this.sqliteService.DisplayCso(this.id).then((data: any) => {
      this.ViewMemberArr = data;
      this.storeNames();
      console.log(this.ViewMemberArr)
    })
  }

}
