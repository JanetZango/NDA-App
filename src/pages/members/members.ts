import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from "ionic-angular";
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { ToastController } from 'ionic-angular';
import { ViewMemberPage } from '../view-member/view-member';
/**
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {
  memberArr = new Array();
  ViewMemberArr = new Array();
  viewCSoArr = new Array();
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
  member_position_id;
  cso_id;
  first_name;
  last_name;
  id_number;
  passport_number;
  nationality;
  race;
  gender;
  disability;
  start_date;
  end_date;
  created_by;
  created_date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public sqliteService: SqliteProvider,public toastCtrl: ToastController) {
    this.viewCSoArr.push(this.navParams.get('orgObject'));
    console.log(this.viewCSoArr);
    this.name_of_cso = this.viewCSoArr[0].name_of_cso;
    this.Collected_by = this.viewCSoArr[0].Collected_by;
    this.created_by = this.viewCSoArr[0].created_by;
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
    this.cso_id = this.viewCSoArr[0].id

   console.log(this.cso_id)

  }
  
  addMemember() {
    this
      .sqliteService
      .regsiterCsoMember(this.id,this.cso_id  ,this.member_position_id ,this.first_name ,this.last_name ,this.id_number  ,this.passport_number ,this.nationality ,this.race ,this.gender ,this.disability ,this.physical_address ,this.contact_number ,this.start_date  ,this.end_date  ,this.modified_by  ,this.modified_date  ,this.created_by  ,this.created_date)
      .then(s => {
        console.log(s)
        this.navCtrl.push(ViewMemberPage)
        const toast = this.toastCtrl.create({
          message: 'cso memberwas added successfully',
          duration: 3000
        });
        toast.present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');
  }
  validateID() {
    var cb = document.forms["pleasevalidateme"]["saidCB"].checked;
    if (cb) {
      var ex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
    } else {
      var ex = /^[0-9]{1,}$/;
    }
    var theIDnumber = document.forms["pleasevalidateme"]["idnumber"].value;
    if (ex.test(theIDnumber) == false) {
      const alert = this.alertCtrl.create({
        subTitle: 'Please supply a valid ID number',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
    const alert = this.alertCtrl.create({
      subTitle: theIDnumber + ' a valid ID number',
      buttons: ['OK']
    });
    alert.present();

    return true;
  }
}
