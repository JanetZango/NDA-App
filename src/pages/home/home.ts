import { Component } from '@angular/core';
import { NavController, Keyboard } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddPasswordPage } from '../add-password/add-password';
import { AlertController, LoadingController } from 'ionic-angular';





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
  ;

  }

  displayDta() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 400000000000
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
      else if (obj.email.toUpperCase() != this.email_address.toUpperCase()){
        console.log("false")
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Could not retrieve user account details using the provided email address.Please connect to the network to get the latest user account details',
          buttons: ['OK']
        });
        alert.present();
        loading.dismiss();
      }
    })

    

  }

  ionViewDidEnter() {
    // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   let alert = this.alertCtrl.create({
    //     title: '',
    //     subTitle: 'Please check your connection.',
    //     cssClass: "myAlert",
    //   });
    //   alert.present();
    //   setTimeout(() => {
    //     alert.dismiss();
    //   }, 1000);
    // });

    // let connectSubscription = this.network.onConnect().subscribe(() => {
    //   let alert = this.alertCtrl.create({
    //     title: '',
    //     subTitle: 'network connection has been established',
    //     cssClass: "myAlert",
    //   });
    //   alert.present();
    //   setTimeout(() => {
    //     alert.dismiss();
    //   }, 1000);
    // });
  }

  onInput(e) {
    console.log(e)
  }

}
