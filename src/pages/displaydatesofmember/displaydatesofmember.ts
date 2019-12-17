import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
/**
 * Generated class for the DisplaydatesofmemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-displaydatesofmember',
  templateUrl: 'displaydatesofmember.html',
})
export class DisplaydatesofmemberPage {
  items = [];
  getCurrentUser = new Array();
  orgNames = new Array();
  displaypart = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams,public sqliteService:SqliteProvider) {
    // this.get();

    this.sqliteService
    // .getcapacity_building()
    // .then((s: any) => {
    //   this.displaypart = s;
    //   console.log(s)
    //   console.log(this.displaypart)
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplaydatesofmemberPage');
  }
  // get() {
  //   this.sqliteService
  //     .getRegisteredCso()
  //     .then((s: any) => {
  //       this.getCurrentUser = s;
  //       // var names = this.sqliteService.getOrgNames()
  //       // this.storeOrgNames(names)
  //       console.log(s)
  //       console.log(this.getCurrentUser)
  //     })
  // }

  storeOrgNames(names) {
    this.orgNames = names;
    console.log(this.orgNames);
  }

  getItems(ev: any) {
    console.log(`hi serach`);
    let searchlist = document.getElementsByClassName('searchitem') as HTMLCollectionOf<HTMLElement>;
    this.initializeItems();
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      let searchlist = document.getElementsByClassName('searchitem') as HTMLCollectionOf<HTMLElement>;
      //searchlist[0].style.display = 'block';
    }
    else {
      this.items = []
    }
  }
  initializeItems() {
    this.items = this.orgNames
    console.log(this.items)
  }


  loclenght = []
  openMarkerInfo(i) {
    this.loclenght = []
    for (var x = 0; x < this.displaypart.length; x++) {
      if (i == this.displaypart[x].CsoName) {
        this.loclenght.push(this.displaypart[x].Fname)
        this.loclenght.push(this.displaypart[x].StartDate)
        this.loclenght.push(this.displaypart[x].EndDate)
        this.items = this.loclenght
        console.log(this.loclenght);
      }

    }
  }


}
