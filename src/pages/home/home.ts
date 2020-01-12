import { Component } from '@angular/core';
import { NavController, Keyboard } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddPasswordPage } from '../add-password/add-password';
import { AlertController, LoadingController } from 'ionic-angular';
import { empty } from 'rxjs/Observer';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public db: SQLiteObject;
  public todos = [];
  username;
  background
  sql;
  displayUser = new Array();
  email;
  email_address
  constructor(private keyboard: Keyboard, public loadingCtrl: LoadingController, public navCtrl: NavController, public sqliteService: SqliteProvider, public alertCtrl: AlertController) {
    // this.displayDta();

  }

  displayDta() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 400000
    });
    loading.present();
    this.sqliteService.checkingEmail(this.email_address).then((data: any) => {
      this.displayUser = data[0]
      console.log(this.displayUser)
      let obj = {
        email: data[0].email
      }
      // console.log(obj.email)
      // var areEqual = obj.email.toUpperCase() === this.email_address.toUpperCase();
      if (obj.email.toUpperCase() == this.email_address.toUpperCase()) {
        console.log("true")
        loading.dismiss();
        this.navCtrl.push(AddPasswordPage, { orgObject: this.displayUser });
      }
      else {
        console.log("false")
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Could not retrieve user account details using the provided email address.Please connect to the network to get the latest user account details',
          buttons: ['OK']
        });
        alert.present();
      }
    })

  }


}
