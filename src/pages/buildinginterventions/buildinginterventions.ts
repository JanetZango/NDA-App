import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { Platform } from 'ionic-angular';
import { ViewMemberPage } from '../view-member/view-member';
import { CapacityPage } from '../capacity/capacity';
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
  key;
  Capacity;
  Province
  showQuestions: boolean = false;
  items = new Array();
  orgNames = new Array();
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider, public toastCtrl: ToastController) {
    this.memberArr.push(this.navParams.get('orgObject'));
    console.log(this.memberArr);


    this.key = this.memberArr[0].id
    console.log(this.key);
    // this.get();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildinginterventionsPage');
  }
  get() {
    this.sqliteService
      .getUser()
      .then((s: any) => {
        this.getCurrentUser = s;
        console.log(s)
        console.log(this.getCurrentUser)
      })
  }

  insertpic2(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.downloadurl2 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addCapacity() {
    this
      .sqliteService
      .Addcapacity_building(this.key, this.CsoName, this.Capacity, this.Province, this.District, this.Municipality,this.partner,this.venue,this.Fname,this.Fsource,this.Collected,this.StartDate,this.EndDate)
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

}
