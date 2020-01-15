import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { AssessmentPage } from '../assessment/assessment';
/**
 * Generated class for the ViewMemberAssessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-member-assess',
  templateUrl: 'view-member-assess.html',
})
export class ViewMemberAssessPage {
  viewCSoArr = new Array();
  displayCapacity = new Array();
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
  items;
  names;
  cso_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider) {

    this.viewCSoArr.push(this.navParams.get('orgObject'));
    // console.log(this.viewCSoArr);
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
    // console.log(this.viewCSoArr);
    // console.log(this.id);

    this.getcso();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMemberAssessPage');
  }
  getcso() {
    this.sqliteService
      .combineBothTablesAssessment(this.id)
      .then((s: any) => {
        this.displayCapacity = s;
        console.log(this.displayCapacity)
        for (var x = 0; x < this.displayCapacity.length; x++) {
          this.cso_id = this.displayCapacity[x].cso_id
          // console.log(this.cso_id)
        }

      })

      this.sqliteService.getCsoName(this.cso_id).then((data) => {
        // console.log(data)
      })

     
  }

 

  getcsoname() {
    this.sqliteService.getCsoName(this.cso_id).then((data) => {
      console.log(data)
    })
  }

  building() {
    for (var x = 0; x < this.viewCSoArr.length; x++) {
      this.navCtrl.push(AssessmentPage, { orgObject: this.viewCSoArr[x] });
    }

  }

}
