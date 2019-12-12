import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DisplaymemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-displaymember',
  templateUrl: 'displaymember.html',
})
export class DisplaymemberPage {
  viewCSoArr = new Array();
  ViewMemberArr = new Array();


  contact_number;
  disability;
  passport_number;
  gender;
  member_position_id;
  race;
  first_name;
  last_name;
  physical_address;
  id_number;
  start_date;
  end_date;
  modified_date;
  modified_by;
  cso_id;
  created_date;
  created_by;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    console.log(this.viewCSoArr);
    this.contact_number = this.viewCSoArr[0].contact_number;
    this.disability = this.viewCSoArr[0].disability;
    this.created_date = this.viewCSoArr[0].created_date;
    this.gender = this.viewCSoArr[0].gender;
    this.created_by = this.viewCSoArr[0].created_by;
    this.race = this.viewCSoArr[0].race;
    this.first_name = this.viewCSoArr[0].first_name;
    this.last_name = this.viewCSoArr[0].last_name;
    this.cso_id = this.viewCSoArr[0].cso_id;
    this.id_number = this.viewCSoArr[0].id_number;
    this.modified_by = this.viewCSoArr[0].modified_by;
    this.modified_date = this.viewCSoArr[0].modified_date;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplaymemberPage');
  }
  gotoback(){
    this.navCtrl.pop();
  }

}
