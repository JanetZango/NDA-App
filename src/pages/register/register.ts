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

  
  CsoName
  Paddress
  Cso_type
  Cso_sector
  Province
  District
  Municipality
  Ward_number
  Contact_Person
  Contact_Number
  Total_Staff
  email
  contactValidation;
  Collected_by
  password;

  mobiDate;
  MobiMethod;
  modified_by;
  modified_date;
  created_by;
  created_date;
  id=12
  registration_number=null
  nda_registration= null
  email_address="janet@gmail.com"
  cso_type_id=6
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider, public toastCtrl: ToastController) {
    // this.memberArr.push(this.navParams.get('orgObject'));
    // console.log(this.memberArr);

    // this.key = this.memberArr[0].id
    // console.log(this.key)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  // id, cso_type_id ,cso_sector_id ,province_id,district_id ,municipality_id ,ward_number ,registration_number ,nda_registration,name_of_cso ,contact_person ,physical_address ,contact_number,email_address ,total_staff ,collected_by ,modified_by ,modified_date ,created_by ,created_date ,cso_mobilisation_method_id , mobilisation_date
  SignUp() {
    this
      .sqliteService
      .regsiterCso( this.id,this.cso_type_id,this.Cso_sector, this.Province, this.District, this.Municipality, this.Ward_number, this.registration_number,this.nda_registration,this.CsoName ,this.Contact_Person,this.email_address ,this.Paddress, this.Contact_Number, this.Total_Staff, this.Collected_by, this.modified_by,this.modified_date,this.created_by,this.created_date,this.MobiMethod,this.mobiDate)
      .then(s => {
        console.log(s)
        this.navCtrl.push(ViewMemberPage)
        const toast = this.toastCtrl.create({
          message: 'cso was added successfully',
          duration: 3000
        });
        toast.present();
      });
  }

}
