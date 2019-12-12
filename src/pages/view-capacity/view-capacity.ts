import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CapacityPage } from '../capacity/capacity';
import { DisplaydatesofmemberPage } from '../displaydatesofmember/displaydatesofmember';

/**
 * Generated class for the ViewCapacityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-capacity',
  templateUrl: 'view-capacity.html',
})
export class ViewCapacityPage {
  viewCSoArr = new Array();
  capacity_building_type_id;
  co_facilitor_name;
  collected_by;
  district_id;
  end_date;
  province_id;
  partner_id;
  start_date;
  attendance_register;
  created_date;
  modified_date;
  venue;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    console.log(this.viewCSoArr);
    this.capacity_building_type_id = this.viewCSoArr[0].capacity_building_type_id;
    this.co_facilitor_name = this.viewCSoArr[0].facilitator_name;
    this.start_date = this.viewCSoArr[0].start_date;  
    this.created_date = this.viewCSoArr[0].created_date; 
    this.attendance_register = this.viewCSoArr[0].attendance_register; 
    this.capacity_building_type_id = this.viewCSoArr[0].capacity_building_type_id; 
    this.end_date = this.viewCSoArr[0].end_date; 
    this.modified_date = this.viewCSoArr[0].modified_date; 
    this.venue = this.viewCSoArr[0].venue; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCapacityPage');
  }
  gotoback(){
    this.navCtrl.push(CapacityPage)
  }

  seeMmbers(){
    this.navCtrl.push(DisplaydatesofmemberPage)
  }

}
