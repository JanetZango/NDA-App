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
  getCso = new Array();
  attendance_register 
  constructor(public navCtrl: NavController, public navParams: NavParams,public sqliteService :SqliteProvider ) {
    this.get();
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
    for (var x = 0; x < this.getCurrentUser.length; x++) {
      this.navCtrl.push(BuildinginterventionsPage, { orgObject: this.getCurrentUser[x] });
    }

  }

  getcso(){
    this.sqliteService
    .getcapacity_building()
    .then((s:any) => {
      this.displayCapacity = s;
      console.log(s)
      console.log(this.displayCapacity)
    })
  }
  viewMore(name){
    for (var x = 0; x < this.displayCapacity.length; x++) {
     if (name == this.displayCapacity[x].Fname) {
       this.navCtrl.push(ViewCapacityPage, { orgObject: this.displayCapacity[x]});
       break;
     }
   }
 }
}
