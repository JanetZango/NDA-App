import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the AssessmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assessment',
  templateUrl: 'assessment.html',
})
export class AssessmentPage {
  showQuestions: boolean = false;
  items = new Array();
  ViewMemberArr = new Array();
  assessment;

  totalQuestion = new Array();
  assessmentQ2;
  assessmentQ23;
  assessmentQ22;
  assessmentQ31;
  assessmentQ32;
  assessmentQ24;
  assessmentQ3;
  assessmentQ33;
  assessmentQ25;
  assessmentQ34;
  assessmentQ4;
  assessmentQ26;
  assessmentQ35;
  assessmentQ5;
  assessmentQ6;
  assessmentQ11;
  assessmentQ16;
  assessmentQ18;
  assessmentQ21;
  assessmentQ8;
  assessmentQ12;
  assessmentQ7;
  assessmentQ17;
  assessmentQ13;
  assessmentQ20;
  assessmentQ15;
  assessmentQ9;
  assessmentQ10;
  assessmentQ28;
  assessmentQ27;
  assessmentQ36;
  assessmentQ37;
  assessmentQ38;
  assessmentQ39;
  assessmentQ29;
  assessmentQ14;
  assessmentQ19;
  assessmentQ30;
  assessmentQ40;
  assessmentQ41;
  assessmentQ42;
  assessmentQ
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
  names;
  assessment_DATE;
  created_DATE = null;
  getCsoId;
  assessment_type_id;
  assessment_completed = true
  calc_assessment_level = 6
  calc_assessment_score =1.83;
  assessment_date;
  modified_date = null
  modified_by = null
  poe_link =null;
  user_answer = null
  assessmentQ43;
  assessmentQ44
  constructor( public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public sqliteService: SqliteProvider) {

    this.viewCSoArr.push(this.navParams.get('orgObject'));
    // console.log(this.viewCSoArr);
    // this.auth_key = this.viewCSoArr[0].auth_key;
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


    console.log(this.id)

    this.get();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssessmentPage');
  }

  AssessmentQuestions() {
    if (this.assessment_type_id == "1") {
      this.showQuestions = true;
      console.log("show")
    }
    else {
      this.showQuestions = false
    }
  }

  get() {

    this.sqliteService.getCsoDisplay().then((data: any) => {
      this.ViewMemberArr = data;
      this.storeNames();
      console.log(this.ViewMemberArr)
    })
  }


  getItems(ev: any) {
    console.log(`hi serach`);
    this.initializeItems();
    // this.searchlist = true
    // set val to the value of the searchbar
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
    this.items = []
    this.items = this.namesArr
    // console.log(this.items)
  }
  namesArr = new Array()
  storeNames() {
    this.namesArr = this.sqliteService.getName();
    // console.log(this.namesArr)
  }

  openMarkerInfo(name) {
    for (var x = 0; x < this.ViewMemberArr.length; x++) {
      if (name == this.ViewMemberArr[x].name_of_cso) {
        // console.log(name)
        // console.log(this.items)
      }
    }
    this.sqliteService.getCsoForSearching(name).then((data) => {
      // console.log(data)
      this.getCsoId = data[0].id
      console.log(this.getCsoId)
    })
  }

  // cso_id, assessment_type_id, calc_assessment_score, calc_assessment_level, poe_link, assessment_date, assessment_completed, collected_by, modified_by, created_by
  addAssessment() {
    this.totalQuestion = [this.assessmentQ, this.assessmentQ2, this.assessmentQ3, this.assessmentQ4,
    this.assessmentQ5, this.assessmentQ6, this.assessmentQ7, this.assessmentQ8, this.assessmentQ9,
    this.assessmentQ10, this.assessmentQ11, this.assessmentQ12, this.assessmentQ13, this.assessmentQ14,
    this.assessmentQ15, this.assessmentQ16, this.assessmentQ17, this.assessmentQ18, this.assessmentQ19,
    this.assessmentQ20, this.assessmentQ21
      , this.assessmentQ22, this.assessmentQ23, this.assessmentQ24, this.assessmentQ25, this.assessmentQ26,
    this.assessmentQ27, this.assessmentQ28, this.assessmentQ29, this.assessmentQ30,
    this.assessmentQ31, this.assessmentQ32, this.assessmentQ33, this.assessmentQ34, this.assessmentQ35,
    this.assessmentQ36, this.assessmentQ37, this.assessmentQ38, this.assessmentQ39, this.assessmentQ40,
    this.assessmentQ41, this.assessmentQ42, this.assessmentQ43, this.assessmentQ44]
    console.log(this.totalQuestion)
    // id,assessment_completed,assessment_date,assessment_type_id,calc_assessment_level,calc_assessment_score,collected_by,created_by,cso_id,modified_by,modified_date,poe_link
    this.sqliteService.AssessmentAdd(this.getCsoId,this.assessment_type_id, this.calc_assessment_score, this.calc_assessment_level, this.poe_link, this.assessment_date,this.assessment_completed, this.id, this.modified_by, this.id).then((data) => {
      console.log(data)
      this.navCtrl.pop()
      const toast = this.toastCtrl.create({
        message: 'Assessment was added successfully',
        duration: 3000
      });
      toast.present();
    })

    for (var x = 0; x < this.totalQuestion.length; x++) {
      this.sqliteService.AssessmentAddQnA(this.totalQuestion[x], this.user_answer, this.id, this.modified_date, this.id, this.assessment_date).then((data) => {

      })
    }
   
 
    // this.sqliteService.updateScoreAssessment().then((data) => {
    //   console.log(data)
    // })

    
  }

}
