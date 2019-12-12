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
  key;
  fname
  lname
  Position
  Gender
  Race
  Passport_number
  Disability
  Nationality
  pAddress
  Contact_Number
  idnumber
  StartDate
  EndDate
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public sqliteService: SqliteProvider,public toastCtrl: ToastController) {
    this.memberArr.push(this.navParams.get('orgObject'));
    console.log(this.memberArr);


    this.key = this.memberArr[0].id
    console.log(this.key);

  }

  addMemember() {
    this
      .sqliteService
      .regsiterCsoMember(this.key, this.fname, this.lname, this.Position, this.Gender, this.Race, this.Passport_number, this.Disability, this.Nationality, this.pAddress, this.Contact_Number, this.idnumber, this.StartDate, this.EndDate)
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
