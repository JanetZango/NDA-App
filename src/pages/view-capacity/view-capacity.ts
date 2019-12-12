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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    console.log(this.viewCSoArr);
    this.capacity_building_type_id = this.viewCSoArr[0].capacity_building_type_id;
    this.co_facilitor_name = this.viewCSoArr[0].co_facilitor_name;
    this.collected_by = this.viewCSoArr[0].collected_by;
    this.district_id = this.viewCSoArr[0].district_id;
    this.province_id = this.viewCSoArr[0].  province_id;
    this.end_date = this.viewCSoArr[0].end_date;
    this.province_id = this.viewCSoArr[0].province_id;
    this.partner_id = this.viewCSoArr[0].partner_id;
    this.start_date = this.viewCSoArr[0].start_date;   
    this.attendance_register = this.viewCSoArr[0].attendance_register; 
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
