import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { Platform } from 'ionic-angular';
import { ViewMemberPage } from '../view-member/view-member';
import { CapacityPage } from '../capacity/capacity';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the BuildinginterventionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buildinginterventions',
  templateUrl: 'buildinginterventions.html',
})
export class BuildinginterventionsPage {
  downloadurl2;
  getCurrentUser = new Array();
  memberArr = new Array();
  ViewMemberArr = new Array();
  disDistrict = new Array()
  key;
  Capacity;
  Province
  showQuestions: boolean = false;
  items = new Array();
  orgNames = new Array();
  viewCSoArr = new Array();
  disDistrict2 = new Array()
  disDistrict3 = new Array()
  CsoName
  District
  Municipality
  partner
  venue
  Fname
  Fsource
  Collected
  StartDate
  EndDate
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
  names;
  getCsoId;
  province_id2
  district_id =1;
  capacity_building_type_id
  municipality_id =1;
  modified_date;
  funding_source_id;
  end_date;
  facilitator_name
  partner_id
  co_facilitator_name =null
  start_date
  modified_by
  created_date;
  poe_link;
  Start_date
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider, public toastCtrl: ToastController, private camera: Camera) {
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


    this.get()
    // this.getDistrict()

  //  this.getprovince()
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildinginterventionsPage');
  }

  disableData(){
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("txtDate")[0].setAttribute('min', this.Start_date);
  }


  insertpic2(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.attendance_register = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  addCapacity() {
    this
      .sqliteService
      .Addcapacity_building(this.capacity_building_type_id, this.province_id, this.district_id, this.municipality_id, this.partner_id, this.venue, this.facilitator_name,this.co_facilitator_name, this.start_date, this.end_date, this.funding_source_id, this.id, this.modified_by, this.modified_date, this.id, this.start_date, this.attendance_register,this.poe_link)
      .then(s => {
        console.log(s)
        this.navCtrl.push(CapacityPage)
        const toast = this.toastCtrl.create({
          message: 'cso was added successfully',
          duration: 3000
        });
        toast.present();
      });
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

  openMarkerInfo(name) {
    for (var x = 0; x < this.ViewMemberArr.length; x++) {
      if (name == this.ViewMemberArr[x].name_of_cso) {
        console.log(name)
      }
    }
    this.sqliteService.getCsoForSearching(name).then((data) => {
      console.log(data)
      this.getCsoId = data[0].id
      this.province_id2 = data[0].province_id
      console.log(this.province_id2)
    })

    this.sqliteService.getLookUpprovinceCapacity(this.province_id2).then((data: any) => {
      console.log(data)
      this.disDistrict = data
      console.log(this.disDistrict)
    })

  }

  getprovince(){
    this.sqliteService.getLookUpprovinceCapacity(this.province_id2).then((data: any) => {
      console.log(data)
      this.disDistrict = data
      console.log(this.disDistrict)
    })
  }


  getDistrictFilter() {
    this.sqliteService.getLookUpDistrict(this.province_id2).then((data: any) => {
      console.log(data)
      this.disDistrict2 = data
      console.log(this.disDistrict2)
    })
  }

  getMunicipality() {
    this.sqliteService.getLookUpMunicipality(this.district_id).then((data: any) => {
      console.log(data)
      this.disDistrict3 = data
      console.log(this.disDistrict3)

    })
  }

  takepic = function () {
    this.d = 1;

    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;

    // if (this.d == 1) {
    //   opts[0].style.top = "10vh";

    // }
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.attendance_register = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });

  }
}