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
  disDistrict = new Array()
  disMunicipality = new Array()
  disDistrict2 = new Array();
  disDistrict3 = new Array();
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
  municipality_id =1 ;
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
  collected_by= 1;
  total_staff;
  contact_number;
  contact_person;
  created_by;
  getCsoId;;
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
    console.log(this.province_id1);

  


    this.get();
    this.getDistrict();
    this.getMunicipality()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  SignUp() {
    this
      .sqliteService
      .regsiterCso(this.cso_type_id, this.cso_sector_id, this.province_id, this.district_id, this.municipality_id, this.ward_number, this.registration_number, this.nda_registration, this.name_of_cso, this.contact_person, this.physical_address, this.contact_number, this.email_address, this.total_staff, this.collected_by, this.modified_by, this.created_date, this.id, this.created_date, this.cso_mobilisation_method_id, this.mobilisation_date)
      .then(s => {
        this.navCtrl.pop()
        console.log(s)
        const toast = this.toastCtrl.create({
          message: 'cso was added successfully',
          duration: 4000
        });
        toast.present();
        
      });
  }

  getDistrict(){
    this.sqliteService.getLookUpprovinceCapacity(this.province_id1).then((data:any)=>{
      console.log(data) 
      this.disDistrict = data
      console.log(this.disDistrict)
    })
  }

  
  getDistrictFilter(){
    this.sqliteService.getLookUpDistrict(this.province_id1).then((data:any)=>{
      console.log(data)
      this.disDistrict2 = data
      console.log(this.disDistrict2)
    })
  }
  getMunicipality(){
    this.sqliteService.getLookUpMunicipality(this.district_id).then((data:any)=>{
      this.disDistrict3 = data
      console.log(this.disDistrict3)
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
    // this.items.length =0;
    console.log(this.items)
  }

  namesArr = new Array()
  storeNames() {
    this.namesArr = this.sqliteService.getName();
    // this.namesArr.length =0;
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
  openMarkerInfo(name){
    for (var x = 0; x < this.ViewMemberArr.length; x++) {
      if (name == this.ViewMemberArr[x].name_of_cso) {
        // console.log(name)
        // console.log(this.items)
      }
    }
    this.sqliteService.getCsoForSearching(name).then((data) => {
      // console.log(data)
      this.getCsoId = data[0].id
      console.log(this.getCsoId)
    })
   
  }

}
