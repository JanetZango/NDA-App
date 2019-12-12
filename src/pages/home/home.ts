import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddPasswordPage } from '../add-password/add-password';
import { AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public sqliteService: SqliteProvider,public alertCtrl: AlertController) {
    // this.displayDta();

  }

  displayDta() {
   this.sqliteService.checkingEmail(this.email_address).then((data:any)=>{
    //  console.log(data[0])
       this.displayUser = data[0]
       console.log(this.displayUser)
     let obj ={
      email : data[0].email
     }
     console.log(obj.email)
     if(obj.email == this.email_address){
       console.log("true")
        this.navCtrl.push(AddPasswordPage, { orgObject: this.displayUser });
     }
     if(this.displayUser == undefined || this.displayUser == null){
       console.log("false")
        const alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Could not retrieve user account details using the provided email address.Please connect to the network to get the latest user account details',
          buttons: ['OK']
        });
        alert.present();
     }
   })

  }


}
