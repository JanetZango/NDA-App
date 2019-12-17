import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SeeMembersPage } from '../see-members/see-members';

/**
 * Generated class for the ShowdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdetails',
  templateUrl: 'showdetails.html',
})
export class ShowdetailsPage {
  viewCSoArr = new Array();
  ViewMemberArr = new Array();
  userArr = new Array();

  name_of_cso;
  Collected_by;
  email_address;
  contact_person;
  contact_number;
  cso_sector_id;
  cso_type_id;
  district_id;
  Municipality;
  Paddress;
  total_staff;
  ward_number;
  province_id;
  physical_address;
  nda_registration;
  municipality_id;
  modified_date;
  modified_by;
  id;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    console.log(this.viewCSoArr);
    this.name_of_cso = this.viewCSoArr[0].name_of_cso;
    this.Collected_by = this.viewCSoArr[0].Collected_by;
    this.email_address = this.viewCSoArr[0].email_address;
    this.contact_person = this.viewCSoArr[0].contact_person;
    this.contact_number = this.viewCSoArr[0].contact_number;
    this.cso_type_id = this.viewCSoArr[0].cso_type_id;
    this.district_id = this.viewCSoArr[0].district_id;
    this.cso_sector_id = this.viewCSoArr[0].cso_sector_id;
    this.physical_address = this.viewCSoArr[0].physical_address;
    this.municipality_id = this.viewCSoArr[0].municipality_id;
    this.total_staff = this.viewCSoArr[0].total_staff;
    this.ward_number = this.viewCSoArr[0].ward_number;
    this.province_id = this.viewCSoArr[0].province_id
    this.nda_registration =this.viewCSoArr[0].nda_registration
    this.modified_date = this.viewCSoArr[0].modified_date
    this.modified_by = this.viewCSoArr[0].modified_by
    this.id = this.viewCSoArr[0].id



   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdetailsPage');
  }
  gotoback() {
    this.navCtrl.pop();
  }


  seeMmbers() {
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(SeeMembersPage, { orgObject: this.viewCSoArr[x] });
    }
  }


}
