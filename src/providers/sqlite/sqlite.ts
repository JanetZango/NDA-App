
import { Injectable, NgZone, ɵConsole } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform, AlertController } from 'ionic-angular';
import { LoadingController } from "ionic-angular";
import { ThrowStmt } from '@angular/compiler';
import { disableDebugTools } from '@angular/platform-browser';





declare var SqlServer;
declare var navigator: any;
declare var Connection: any;
declare var VPNConnection: any;
/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteProvider {
  public db: SQLiteObject;
  private isOpen: boolean = false
  sql;
  arr: any[];
  likedPictures: any[];
  getcapacity: any[]
  regCso: any[];
  validation_messages: any;
  password_hash = null;
  password_reset_token = null;
  verification_token = null;
  registration_number = null;
  cso_mobilisation_method_id = null;
  mobilisation_date = null;
  insertCso = new Array();
  scoreAarr = new Array();
  Score;
  constructor(public ngzone: NgZone, public database: SQLite, private platform: Platform, public alert: AlertController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log('Hello SqliteProvider Provider');
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait Information is still loading...',
      duration: 4000000000000000000000
    });
    loading.present();
    platform.ready().then(() => {
      this.Remoteconnection();
      this.sqlitestate();
      loading.dismiss();
    })

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CapacityPage');
  }

  CsoName = new Array();
  storeOrgNames(name_of_cso) {
    this.CsoName.push(name_of_cso);
  }
  getName() {
    return this.CsoName
  }

  checkNetwork() {
    this.ngzone.run(() => {
      this.platform.ready().then(() => {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        const confirm = this.alertCtrl.create({
          title: "Connection Status",
          message: states[networkState],
          buttons: ["OK"]
        });
        confirm.present();
      });
    })
  }




  VPNConnection() {

    window['plugins'].VPNConnection.enable(
      function (result) {
        // console.log('result ', result);
        // alert('connected');
      },
      function (error) {
        // console.log('error ', error);
        // alert(error);

      },
      // options
    );
  }

  Remoteconnection() {
    SqlServer.init("156.38.140.58", "MSSQLSERVER", "sa", "T1r1s@n", "cso_tra", function (event) {
          alert("successful:" + JSON.stringify(event));
    }, function (error) {
    });

    // SqlServer.init("NDASQLPOC69CSO_POC", "MSSQLSERVER", "csomobapp", "K@kany02019", "cso_tra", function (event) {
    //   // alert("successful:" + JSON.stringify(event));
    //   // loading.dismiss();
    //   // console.log(JSON.stringify(event))
    //   loading.dismiss()
    // }, function (error) {
    //   // alert("Not Successful:" + JSON.stringify(error));
    //   // console.log(JSON.stringify(error))
    // });

    SqlServer.testConnection(function (event) {
    }, function (error) {
    });

  }

  sqlitestate() {
    // let loading = this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   content: 'Please wait Information is still loading...',
    //   duration: 400000000
    // });
    // loading.present();
    if (!this.isOpen) {

      this.sql = new SQLite();
      this.sql.create({ name: "testphase.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        // db.executeSql("DROP TABLE IF EXISTS assessment")
        db.executeSql("CREATE TABLE IF NOT EXISTS user (id int CONSTRAINT pk_id PRIMARY KEY NOT NULL,username TEXT,auth_key TEXT,password_hash TEXT,password_reset_token TEXT,verification_token TEXT,full_name TEXT,email TEXT,province_id INTEGER,status INTEGER,role TEXT,legacy_user_id INTEGER,created_at INTEGER,updated_at INTEGER,office TEXT,title TEXT,province_name TEXT,user_group TEXT)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS cso (id int CONSTRAINT pk_id PRIMARY KEY NOT NULL,cso_type_id INTEGER ,cso_sector_id INTEGER ,province_id INTEGER ,district_id INTEGER ,municipality_id INTEGER ,ward_number INTEGER ,registration_number TEXT,nda_registration TEXT,name_of_cso TEXT ,contact_person TEXT,physical_address TEXT,contact_number TEXT,email_address TEXT,total_staff INTEGER,collected_by INTEGER,modified_by INTEGER,modified_date DATE,created_by INTEGER,created_date DATE,cso_mobilisation_method_id INTEGER,mobilisation_date DATE)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS tbl_cso_member (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,cso_id INTEGER ,member_position_id INTEGER ,first_name TEXT ,last_name TEXT,id_number TEXT ,passport_number TEXT,nationality TEXT,race TEXT,gender TEXT,disability TEXT,physical_address TEXT,contact_number TEXT,start_date DATE ,end_date DATE ,modified_by INTEGER ,modified_date DATE ,created_by INTEGER ,created_date DATE)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS cso_assessment (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL ,cso_id INTEGER ,assessment_type_id INTEGER,calc_assessment_score INTEGER,calc_assessment_level INTEGER ,poe_link TEXT ,assessment_date DATE ,assessment_completed INTEGER ,collected_by TEXT ,modified_by INTEGER,created_by INTEGER)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS tbl_capacity_building (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL ,capacity_building_type_id INTEGER  ,province_id INTEGER  ,district_id INTEGER  ,municipality_id INTEGER  ,partner_id INTEGER ,venue TEXT ,facilitator_name TEXT ,co_facilitator_name TEXT ,start_date date  ,end_date date  ,funding_source_id INTEGER ,collected_by TEXT ,modified_by INTEGER ,modified_date DATE ,created_by INTEGER ,created_date DATE ,attendance_register TEXT ,poe_link TEXT )", [])
        //lookups
        db.executeSql("CREATE TABLE IF NOT EXISTS capacity_building_type ( id int CONSTRAINT pk_id PRIMARY KEY NOT NULL,capacity_building_type_name TEXT)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS lkp_local_municipality (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL, district_id INTEGER,municipality_name TEXT,municipality_code TEXT,map_title TEXT)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS district (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,province_id INTEGER,district_name TEXT,district_code TEXT)", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS lkp_member_position (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,member_position_name TEXT NOT NULL,member_position_description TEXT NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS province (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL, province_name TEXT,province_code TEXT)", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS lkp_cso_type (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,cso_type_name TEXT NOT NULL,cso_type_description TEXT NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL)", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS lkp_cso_sector (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL, cso_sector_name TEXT NOT NULL,cso_sector_description TEXT NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL)", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS lkp_capacity_building_type (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,capacity_building_type_name TEXT NOT NULL,capacity_building_type_description TEXT NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL)", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS lkp_assessment_type_section (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,assessment_type_id INTEGER NOT NULL,assessment_type_section_name TEXT NOT NULL,assessment_type_section_description TEXT NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL)", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS lkp_assessment_type (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,assessment_type_name TEXT NOT NULL,assessment_type_description TEXT NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS assessment_question (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,assessment_type_section_id INTEGER ,question TEXT ,assessment_question_description TEXT ,answer_source TEXT,answer_option TEXT ,answer_data_type TEXT ,question_number INTEGER)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS assessment_answer (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,assessment_question_id INTEGER ,answer TEXT ,weight INTEGER)", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS tbl_capacity_building (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,capacity_building_type_id INTEGER NOT NULL,province_id INTEGER NOT NULL,district_id INTEGER NOT NULL,municipality_id INTEGER NOT NULL,partner_id INTEGER NULL,venue TEXT NULL,facilitator_name TEXT NULL,co_facilitator_name TEXT NULL,start_date date NOT NULL,end_date date NOT NULL,funding_source_id INTEGER NULL,collected_by TEXT NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL,attendance_register TEXT NULL,poe_link TEXT NULL)", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS tbl_capacity_building_participant (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,capacity_building_id INTEGER NOT NULL,cso_member_id INTEGER NOT NULL,date_attended date NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS assessment_question_answer (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cso_assessment_id INTEGER NOT NULL,assessment_question_id INTEGER NOT NULL,assessment_answer_id INTEGER NOT NULL,user_answer TEXT NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL )", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS tbl_cso_assessment (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,cso_id INTEGER ,assessment_type_id INTEGER ,calc_assessment_score decimal(18, 5) ,calc_assessment_level INTEGER NULL,poe_link TEXT NULL,assessment_date date NULL,assessment_completed bit NOT NULL,collected_by TEXT NULL,modified_by INTEGER NULL,modified_date datetime NULL,created_by INTEGER NULL,created_date datetime NULL)", [])
        this.isOpen = true;


        // this.UserData();
        // this.getUser()
        // this.getCso();
        // this.remoteUserData();
        // this.CSOData();
        // this.CsoMemberData();
        // this.getCsoMember()
        // this.LookUpMunicipality();
        // this.LookUpProvince();
        // this.getLookUpProvince();
        // this.LookDistrict();
        // this.CsoAssessmentData()
        // this.insertcapacityBuilding();
        // this.CsoAssesmentA();
        // this.remoteCapacityBuildingParticipantData()
        // this.remoteCsoAssessmentData()
        // this.DisplayCapacityBuildingdemo();
        // this.CsoAssesmentA();
        // this.DisplayAssessmentss();
        // this.testing_lkp_assessment();
        // this.remoteCsoAssessmentData();
        // this.getLookUpMunicipalitytest();
        // loading.dismiss();
        // this.remotLkpCapacityBuilding();
        // this.InsertCapacityBuilding();
        this.remoteCsoDataMainDB();
        this.remoteCsoData();

        //  this.combineBothTables();

      }).catch((error) => {
        console.log(error);
      });

    }
  }

  //lookups


  remotLkpAssessmentQuestion() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[lkp_assessment_answer]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
        // alert(results)
        console.log(results)
      })
    })
  }


  remotLkpCapacityBuilding() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[lkp_capacity_building_type]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
        // alert(results)
        console.log(results)
      })
    })
  }

  InsertCapacityBuilding() {
    return new Promise((resolve, db) => {
      let results = this.remotLkpCapacityBuilding().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            id: data[0][i].id,
            capacity_building_type_name: data[0][i].capacity_building_type_name,
          }
          let sql = "INSERT INTO capacity_building_type (id ,capacity_building_type_name) VALUES (?,?)";
          this.db.executeSql(sql, [obj.id, obj.capacity_building_type_name]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
          })
          this.AnswerArr.push(obj)
        }
        resolve(this.AnswerArr)
      });
    });
  }

  getLookUpCapacityBuilding(capacity_building_id) {
    // console.log(capacity_building_id)
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM capacity_building_type WHERE id =" + capacity_building_id, []).then((data) => {
        console.log(data)
        let getLocalMunicipalityARR = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getLocalMunicipalityARR.push({
              id: data.rows.item(i).id,
              capacity_building_type_name: data.rows.item(i).capacity_building_type_name,
            });
          }
        }
        resolve(getLocalMunicipalityARR);
        // console.log(getLocalMunicipalityARR);
      }, (error) => {
        reject(error);
      })
    })
  }

  combineBothTables(capacity_building_id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT cb.id ,cbt.capacity_building_type_name,province_id,district_id,municipality_id,partner_id,venue,facilitator_name,co_facilitator_name,start_date,end_date ,funding_source_id,collected_by,attendance_register,poe_link FROM tbl_capacity_building cb inner join capacity_building_type cbt on cb.capacity_building_type_id = cbt.id WHERE province_id =" + capacity_building_id, []).then((data) => {
        console.log(data)
        let getCapacityBuildingArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getCapacityBuildingArr.push({
              id: data.rows.item(i).id,
              capacity_building_type_name: data.rows.item(i).capacity_building_type_name,
              district_id: data.rows.item(i).district_id,
              end_date: data.rows.item(i).end_date,
              funding_source_id: data.rows.item(i).funding_source_id,
              facilitator_name: data.rows.item(i).facilitator_name,
              municipality_id: data.rows.item(i).municipality_id,
              province_id: data.rows.item(i).province_id,
              start_date: data.rows.item(i).start_date,
              venue: data.rows.item(i).venue,
              partner_id: data.rows.item(i).partner_id,
              collected_by: data.rows.item(i).collected_by,
              attendance_register: data.rows.item(i).attendance_register,
              poe_link: data.rows.item(i).poe_link,
            });
          }
        }
        resolve(getCapacityBuildingArr);
        console.log(getCapacityBuildingArr);
      }, (error) => {
        reject(error);
      })
    })
  }


 


  combineBothTablesAssessment(province) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT cs.cso_id ,c.name_of_cso,assessment_completed,assessment_type_id,calc_assessment_score,assessment_date,calc_assessment_level,poe_link FROM cso_assessment cs inner join cso c on c.id  = cs.cso_id WHERE  cs.created_by=" +province, []).then((data) => {
        console.log(data)
        let getAssessmentArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getAssessmentArr.push({
              assessment_completed: data.rows.item(i).assessment_completed,
              assessment_date: data.rows.item(i).assessment_date,
              assessment_type_id: data.rows.item(i).assessment_type_id,
              calc_assessment_level: data.rows.item(i).calc_assessment_level,
              calc_assessment_score: data.rows.item(i).calc_assessment_score,
              cso_id: data.rows.item(i).cso_id,
              name_of_cso: data.rows.item(i).name_of_cso,
              id: data.rows.item(i).id,
              poe_link: data.rows.item(i).poe_link,
            });
          }
        }
        resolve(getAssessmentArr);
        console.log(getAssessmentArr);
      }, (error) => {
        reject(error);
      })
    })
  }



  AnswerArr = new Array();
  CsoAssesmentA() {
    return new Promise((resolve, db) => {
      let results = this.remotLkpAssessmentQuestion().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            id: data[0][i].id,
            assessment_question_id: data[0][i].assessment_question_id,
            answer: data[0][i].answer,
            weight: data[0][i].weight,
          }
          let sql = "INSERT INTO assessment_answer (id ,assessment_question_id ,answer,weight ) VALUES (?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.assessment_question_id, obj.answer, obj.weight]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
          })
          this.AnswerArr.push(obj)
        }
        resolve(this.AnswerArr)
      });
    });
  }


  remotAssessmentQuestion() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[lkp_assessment_question]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
        // alert(results)
        console.log(results)
      })
    })
  }


  QnAArr = new Array();
  assessment_question_description = null
  CsoAssesmentQnA() {
    return new Promise((resolve, db) => {
      let results = this.remotAssessmentQuestion().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            id: data[0][i].id,
            assessment_type_section_id: data[0][i].assessment_type_section_id,
            question: data[0][i].question,
            answer_source: data[0][i].answer_source,
            answer_option: data[0][i].answer_option,
            answer_data_type: data[0][i].answer_data_type,
            question_number: data[0][i].question_number,
          }
          let sql = "INSERT INTO assessment_question (id,assessment_type_section_id,question ,assessment_question_description ,answer_source,answer_option ,answer_data_type ,question_number ) VALUES (?,?,?,?,?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.assessment_type_section_id, obj.question, this.assessment_question_description, obj.answer_source, obj.answer_option, obj.answer_data_type, obj.question_number]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
          })
          this.QnAArr.push(obj)
        }
        resolve(this.QnAArr)
      });
    });
  }


  getLookUpAssessmentQnA() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM assessment_question", []).then((data) => {
        let getLocalAssessmentArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getLocalAssessmentArr.push({
              id: data.rows.item(i).id,
              assessment_type_section_id: data.rows.item(i).assessment_type_section_id,
              question: data.rows.item(i).question,
              answer_source: data.rows.item(i).answer_source,
              answer_option: data.rows.item(i).answer_option,
              answer_data_type: data.rows.item(i).answer_data_type,
              question_number: data.rows.item(i).question_number,
            });
          }
        }
        resolve(getLocalAssessmentArr);
        console.log(getLocalAssessmentArr);
      }, (error) => {
        reject(error);
      })
    })
  }


  remoteAssessmentQuestionsAnswerData() {
    console.log("results")
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[tbl_assessment_question_answer]", function (data) {
        console.log(data)
        let results = JSON.parse(data);
        console.log(results);
        resolve(results);
        alert(results)
      })
    })
  }




  remotelocalMunicipality() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[lkp_local_municipality]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
        // alert(results)
        console.log(results)
      })
    })
  }
  MuniArr = new Array();
  LookUpMunicipality() {
    return new Promise((resolve, db) => {
      let results = this.remotelocalMunicipality().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            id: data[0][i].id,
            district_id: data[0][i].district_id,
            map_title: data[0][i].map_title,
            municipality_code: data[0][i].municipality_code,
            municipality_name: data[0][i].municipality_name,
          }
          let sql = "INSERT INTO lkp_local_municipality (id, district_id ,municipality_name,municipality_code,map_title) VALUES (?,?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.district_id, obj.municipality_name, obj.municipality_code, obj.map_title]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
          })
          this.MuniArr.push(obj)
        }
        resolve(this.MuniArr)
      });
    });
  }


  ;
  getLookUpMunicipality(district_id) {
    console.log(district_id)
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM lkp_local_municipality WHERE district_id =" + district_id, []).then((data) => {
        console.log(data)
        let getLocalMunicipalityARR = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getLocalMunicipalityARR.push({
              id: data.rows.item(i).id,
              district_id: data.rows.item(i).district_id,
              map_title: data.rows.item(i).map_title,
              municipality_code: data.rows.item(i).municipality_code,
              municipality_name: data.rows.item(i).municipality_name,
            });
          }
        }
        resolve(getLocalMunicipalityARR);
        console.log(getLocalMunicipalityARR);
      }, (error) => {
        reject(error);
      })
    })
  }

  getLookUpMunicipalitytest() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM lkp_local_municipality", []).then((data) => {
        console.log(data)
        let getLocalMunicipalityArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getLocalMunicipalityArr.push({
              id: data.rows.item(i).id,
              district_id: data.rows.item(i).district_id,
              map_title: data.rows.item(i).map_title,
              municipality_code: data.rows.item(i).municipality_code,
              municipality_name: data.rows.item(i).municipality_name,
            });
          }
        }
        resolve(getLocalMunicipalityArr);
        console.log(getLocalMunicipalityArr);
      }, (error) => {
        reject(error);
      })
    })
  }


  remotelocalProvince() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[lkp_province]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
        // alert(results)
        console.log(results)
      })
    })
  }


  proArr = new Array();
  LookUpProvince() {
    return new Promise((resolve, db) => {
      let results = this.remotelocalProvince().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            id: data[0][i].id,
            province_name: data[0][i].province_name,
            province_code: data[0][i].province_code,
          }
          console.log(obj)
          let sql = "INSERT INTO province (id, province_name,province_code) VALUES (?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.province_name, obj.province_code]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
          })
          this.proArr.push(obj)
        }
        resolve(this.proArr)
      });
    });
  }


  getLookUpProvince() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM province", []).then((data) => {
        let getlookUpProvince = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getlookUpProvince.push({
              id: data.rows.item(i).id,
              province_name: data.rows.item(i).province_name,
              province_code: data.rows.item(i).province_code,
            });
          }
        }
        resolve(getlookUpProvince);
        console.log(getlookUpProvince);
      }, (error) => {
        reject(error);
      })
    })
  }


  remoteDistrict() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[lkp_district]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
        // alert(results)
        console.log(results)
      })
    })
  }

  disArr = new Array();
  LookDistrict() {
    return new Promise((resolve, db) => {
      let results = this.remoteDistrict().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            id: data[0][i].id,
            province_id: data[0][i].province_id,
            district_name: data[0][i].district_name,
            district_code: data[0][i].district_code,
          }
          let sql = "INSERT INTO district (id,province_id,district_name,district_code) VALUES (?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.province_id, obj.district_name, obj.district_code]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
          })
          this.disArr.push(obj)
        }
        resolve(this.disArr)
      });
    });
  }

  getLookUpDistrict(province_id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM district WHERE province_id=" + province_id, []).then((data) => {
        console.log()
        let getlookUpDistrict = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getlookUpDistrict.push({
              id: data.rows.item(i).id,
              province_id: data.rows.item(i).province_id,
              district_name: data.rows.item(i).district_name,
              district_code: data.rows.item(i).district_code,
            });
          }
        }
        resolve(getlookUpDistrict);
        console.log(getlookUpDistrict);
      }, (error) => {
        reject(error);
      })
    })
  }


  getLookUpprovinceCapacity(province_id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM province WHERE id=" + province_id, []).then((data) => {
        console.log()
        let getlookUpDistrict = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getlookUpDistrict.push({
              id: data.rows.item(i).id,
              // province_id: data.rows.item(i).province_id,
              province_name: data.rows.item(i).province_name,
              province_code: data.rows.item(i).province_code,
            });
          }
        }
        resolve(getlookUpDistrict);
        console.log(getlookUpDistrict);
      }, (error) => {
        reject(error);
      })
    })
  }




  checkLastRecordCsoAssessment() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT id FROM cso_assessment ORDER BY id desc limit 1", []).then((data) => {
        let CsoAssArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            CsoAssArr.push({
              id: data.rows.item(i).id,
            });
          }
        }
        resolve(CsoAssArr);
        // console.log(CsoAssArr);
      })
    })
  }


  checkLastRecordCso() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT id FROM cso ORDER BY id desc limit 1", []).then((data) => {
        let adUsersArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            adUsersArr.push({
              id: data.rows.item(i).id,
            });
          }
        }
        resolve(adUsersArr);
        // console.log(adUsersArr);
      })
    })
  }


  regsiterCso(cso_type_id, cso_sector_id, province_id, district_id, municipality_id, ward_number, registration_number, nda_registration, name_of_cso, contact_person, physical_address, contact_number, email_address, total_staff, collected_by, modified_by, modified_date, created_by, created_date, cso_mobilisation_method_id, mobilisation_date) {
    return new Promise((resolve, reject) => {
      let LastRecordCso = this.checkLastRecordCso().then((data) => {
        console.log(data)
        let CsoId = data[0].id + 1
        console.log(CsoId)
        let sql = "INSERT INTO cso (id, cso_type_id ,cso_sector_id ,province_id,district_id ,municipality_id ,ward_number ,registration_number ,nda_registration,name_of_cso ,contact_person ,physical_address ,contact_number,email_address ,total_staff ,collected_by ,modified_by ,modified_date ,created_by ,created_date ,cso_mobilisation_method_id , mobilisation_date ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        this.db.executeSql(sql, [CsoId, cso_type_id, cso_sector_id, province_id, district_id, municipality_id, ward_number, registration_number, nda_registration, name_of_cso, contact_person, physical_address, contact_number, email_address, total_staff, collected_by, modified_by, modified_date, created_by, created_date, cso_mobilisation_method_id, mobilisation_date]).then((data) => {
          console.log("INSERTED: " + JSON.stringify(data) + sql);
          resolve("true")
        }, (error) => {
          reject(error);

        });
      })

    });
  }

  checkLastRecordCsoMember() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT id FROM tbl_cso_member ORDER BY id desc limit 1", []).then((data) => {
        let adUsersArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            adUsersArr.push({
              id: data.rows.item(i).id,
            });
          }

        }
        resolve(adUsersArr);
        // console.log(adUsersArr);
      })
    })
  }

  regsiterCsoMember(id, cso_id, member_position_id, first_name, last_name, id_number, passport_number, nationality, race, gender, disability, physical_address, contact_number, start_date, end_date, modified_by, modified_date, created_by, created_date) {
    return new Promise((resolve, reject) => {
      let LastRecordCso = this.checkLastRecordCsoMember().then((data) => {
        console.log(data)
        let CsoId = data[0].id + 1
        console.log(CsoId)
        let sql = "INSERT INTO tbl_cso_member (id,cso_id  ,member_position_id ,first_name ,last_name ,id_number  ,passport_number ,nationality ,race ,gender ,disability ,physical_address ,contact_number ,start_date  ,end_date  ,modified_by  ,modified_date  ,created_by  ,created_date ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        this.db.executeSql(sql, [CsoId, cso_id, member_position_id, first_name, last_name, id_number, passport_number, nationality, race, gender, disability, physical_address, contact_number, start_date, end_date, modified_by, modified_date, created_by, created_date]).then((data) => {
          console.log("INSERTED: " + JSON.stringify(data) + sql);
          resolve("true")
          console.log("true")
        }, (error) => {
        })
      });
    });
  }




  checkingEmail(email_address) {
    return new Promise((resolve, reject) => {
      // let loading = this.loadingCtrl.create({
      //   spinner: 'bubbles',
      //   content: 'Please wait...',
      //   duration: 400000000
      // });
      // loading.present();
      this.db.executeSql("SELECT * FROM user WHERE email='" + email_address + "'", []).then((data) => {
        let adUsersArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            adUsersArr.push({
              id: data.rows.item(i).id,
              username: data.rows.item(i).username,
              email: data.rows.item(i).email,
              auth_key: data.rows.item(i).auth_key,
              password_hash: data.rows.item(i).password_hash,
              password_reset_token: data.rows.item(i).password_reset_token,
              verification_token: data.rows.item(i).verification_token,
              full_name: data.rows.item(i).full_name,
              province_id: data.rows.item(i).province_id,
              status: data.rows.item(i).status,
              role: data.rows.item(i).role,
              legacy_user_id: data.rows.item(i).legacy_user_id,
              created_at: data.rows.item(i).created_at,
              updated_at: data.rows.item(i).updated_at,
              office: data.rows.item(i).office,
              title: data.rows.item(i).title,
              province_name: data.rows.item(i).province_name,
              user_group: data.rows.item(i).user_group,
            });
          }
        }
        resolve(adUsersArr);
        // console.log(adUsersArr);
        // loading.dismiss();
      }, (error) => {
        reject(error);
      })
    })
  }


  //updating password
  updateUserPssword(id, password_hash) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("UPDATE user SET password_hash ='" + password_hash + "' WHERE id=" + id, []).then((data) => {
        console.log("updated")
        const alert = this.alertCtrl.create({
          subTitle: 'Your Password has been created!',
          buttons: ['OK']
        });
        alert.present()
      })
    })
  }

  //push to the main database
  adUsersArr = new Array();
  remoteCsoDataMainDB() {
    return new Promise((resolve, reject) => {
      let Csoresults = this.getCso().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            collected_by: data[0].collected_by,
            contact_number: data[0].contact_number,
            contact_person: data[0].contact_person,
            created_by: data[0].created_by,
            created_date: data[0].created_date,
            cso_sector_id: data[0].cso_sector_id,
            cso_type_id: data[0].cso_type_id,
            district_id: data[0].district_id,
            email_address: data[0].email_address,
            id: data[0].id,
            modified_by: data[0].modified_by,
            modified_date: data[0].modified_date,
            municipality_id: data[0].municipality_id,
            name_of_cso: data[0].name_of_cso,
            nda_registration: data[0].nda_registration,
            physical_address: data[0].physical_address,
            province_id: data[0].province_id,
            total_staff: data[0].total_staff,
            ward_number: data[0].ward_number
          }
          console.log(obj.created_date)
          SqlServer.execute("INSERT INTO [cso_tra].[dbo].[tbl_cso] (cso_type_id ,cso_sector_id ,province_id,district_id ,municipality_id ,ward_number ,registration_number ,nda_registration,name_of_cso ,contact_person ,physical_address ,contact_number,email_address ,total_staff ,collected_by ,modified_by ,modified_date ,created_by ,created_date ,cso_mobilisation_method_id , mobilisation_date) VALUES (1,1,1,1,1,1,1,1,'1','1','1',1,'1',1,1,1,'2020-01-01',1,'2020-01-01',1,'2020-01-01')");
          console.log("INSERTED: " + JSON.stringify(data));
          resolve("inserted")
        }
      }, (error) => {
        reject(error);
      })
      // console.log(obj.username)
      // this.adUsersArr.push(obj)



      resolve(this.adUsersArr)
      // console.log(this.adUsersArr)
      // });
    });

  }


  //users methods
  insertUser = new Array()
  remoteUserData() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[user]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
        // alert(results)
        console.log(results)
      })
    })
  }

  UserData() {
    return new Promise((resolve, db) => {
      let results = this.remoteUserData().then((data) => {
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            id: data[0][i].id,
            created_at: data[0][i].created_at,
            email: data[0][i].email,
            full_name: data[0][i].full_name,
            office: data[0][i].office,
            province_id: data[0][i].province_id,
            province_name: data[0][i].province_name,
            role: data[0][i].role,
            status: data[0][i].status,
            title: data[0][i].title,
            updated_at: data[0][i].updated_at,
            user_group: data[0][i].user_group,
            username: data[0][i].username,
            auth_key: data[0][i].auth_key,
            legacy_user_id: data[0][i].legacy_user_id
          }
          let sql = "INSERT INTO user (id, username ,auth_key , password_hash ,password_reset_token ,verification_token ,full_name ,email ,province_id ,status ,role ,legacy_user_id ,created_at ,updated_at ,office ,title ,province_name ,user_group) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.username, obj.auth_key, this.password_hash, this.password_reset_token, this.verification_token, obj.full_name, obj.email, obj.province_id, obj.status, obj.role, obj.legacy_user_id, obj.created_at, obj.updated_at, obj.office, obj.title, obj.province_name, obj.user_group]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")

          }, (error) => {
          })
          this.insertUser.push(obj)
        }
        resolve(this.insertUser)
        // alert("Adding information ")
      });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM user", []).then((data) => {
        let adUsersArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            adUsersArr.push({
              id: data.rows.item(i).id,
              username: data.rows.item(i).username,
              email: data.rows.item(i).email,
              auth_key: data.rows.item(i).auth_key,
              password_hash: data.rows.item(i).password_hash,
              password_reset_token: data.rows.item(i).password_reset_token,
              verification_token: data.rows.item(i).verification_token,
              full_name: data.rows.item(i).full_name,
              province_id: data.rows.item(i).province_id,
              status: data.rows.item(i).status,
              role: data.rows.item(i).role,
              legacy_user_id: data.rows.item(i).legacy_user_id,
              created_at: data.rows.item(i).created_at,
              updated_at: data.rows.item(i).updated_at,
              office: data.rows.item(i).office,
              title: data.rows.item(i).title,
              province_name: data.rows.item(i).province_name,
              user_group: data.rows.item(i).user_group,
            });
          }
        }
        resolve(adUsersArr);
        // console.log(adUsersArr);
        // loading.dismiss();
      }, (error) => {
        reject(error);
      })
    })
  }

  //////////////////////////////////////////////////////

  //cso methods
  remoteCsoData() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[tbl_cso]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
      })
    })
  }



  CSOData() {
    return new Promise((resolve, reject) => {
      let Csoresults = this.remoteCsoData().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            collected_by: data[0][i].collected_by,
            contact_number: data[0][i].contact_number,
            contact_person: data[0][i].contact_person,
            created_by: data[0][i].created_by,
            created_date: data[0][i].created_date,
            cso_sector_id: data[0][i].cso_sector_id,
            cso_type_id: data[0][i].cso_type_id,
            district_id: data[0][i].district_id,
            email_address: data[0][i].email_address,
            id: data[0][i].id,
            modified_by: data[0][i].modified_by,
            modified_date: data[0][i].modified_date,
            municipality_id: data[0][i].municipality_id,
            name_of_cso: data[0][i].name_of_cso,
            nda_registration: data[0][i].nda_registration,
            physical_address: data[0][i].physical_address,
            province_id: data[0][i].province_id,
            total_staff: data[0][i].total_staff,
            ward_number: data[0][i].ward_number
          }

          let sql = "INSERT INTO cso (id, cso_type_id ,cso_sector_id ,province_id,district_id ,municipality_id ,ward_number ,registration_number ,nda_registration,name_of_cso ,contact_person ,physical_address ,contact_number,email_address ,total_staff ,collected_by ,modified_by ,modified_date ,created_by ,created_date ,cso_mobilisation_method_id , mobilisation_date ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.cso_type_id, obj.cso_sector_id, obj.province_id, obj.district_id, obj.municipality_id, obj.ward_number, this.registration_number, obj.nda_registration, obj.name_of_cso, obj.contact_person, obj.physical_address, obj.contact_number, obj.email_address, obj.total_staff, obj.collected_by, obj.modified_by, obj.modified_date, obj.created_by, obj.created_date, this.cso_mobilisation_method_id, this.mobilisation_date]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
            reject("false");
          })
          this.insertCso.push(obj)
        }
        resolve(this.insertCso)
      });
    });
  }

  getCso() {
    return new Promise((resolve, reject) => {
      // let loading = this.loadingCtrl.create({
      //   spinner: 'bubbles',
      //   content: 'loading...',
      //   duration: 4000000
      // });
      // loading.present();
      this.db.executeSql("SELECT * FROM cso", []).then((data) => {
        let adUsersArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            adUsersArr.push({
              id: data.rows.item(i).id,
              cso_type_id: data.rows.item(i).cso_type_id,
              cso_sector_id: data.rows.item(i).cso_sector_id,
              province_id: data.rows.item(i).province_id,
              district_id: data.rows.item(i).district_id,
              municipality_id: data.rows.item(i).municipality_id,
              ward_number: data.rows.item(i).ward_number,
              nda_registration: data.rows.item(i).nda_registration,
              registration_number: data.rows.item(i).registration_number,
              name_of_cso: data.rows.item(i).name_of_cso,
              contact_person: data.rows.item(i).contact_person,
              physical_address: data.rows.item(i).physical_address,
              contact_number: data.rows.item(i).contact_number,
              email_address: data.rows.item(i).email_address,
              total_staff: data.rows.item(i).total_staff,
              collected_by: data.rows.item(i).collected_by,
              modified_by: data.rows.item(i).modified_by,
              modified_date: data.rows.item(i).modified_date,
              created_by: data.rows.item(i).created_by
            });
            this.storeOrgNames(data.rows.item(i).name_of_cso)
          }
        }
        resolve(adUsersArr);
        // loading.dismiss();
        // console.log(adUsersArr);
      }, (error) => {
        reject(error);
        // loading.dismiss();
      })
    })
  }


  getCsoForSearching(name_of_cso) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM cso WHERE name_of_cso='" + name_of_cso + "'", []).then((data) => {
        console.log(data)
        let adUsersArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            adUsersArr.push({
              id: data.rows.item(i).id,
              cso_type_id: data.rows.item(i).cso_type_id,
              cso_sector_id: data.rows.item(i).cso_sector_id,
              province_id: data.rows.item(i).province_id,
              district_id: data.rows.item(i).district_id,
              municipality_id: data.rows.item(i).municipality_id,
              ward_number: data.rows.item(i).ward_number,
              nda_registration: data.rows.item(i).nda_registration,
              registration_number: data.rows.item(i).registration_number,
              name_of_cso: data.rows.item(i).name_of_cso,
              contact_person: data.rows.item(i).contact_person,
              physical_address: data.rows.item(i).physical_address,
              contact_number: data.rows.item(i).contact_number,
              email_address: data.rows.item(i).email_address,
              total_staff: data.rows.item(i).total_staff,
              collected_by: data.rows.item(i).collected_by,
              modified_by: data.rows.item(i).modified_by,
              modified_date: data.rows.item(i).modified_date,
              created_by: data.rows.item(i).created_by
            });
            this.storeOrgNames(data.rows.item(i).name_of_cso)
          }
        }
        resolve(adUsersArr);
        loading.dismiss();
        // console.log(adUsersArr);
      }, (error) => {
        reject(error);
        loading.dismiss();
      })
    })
  }


  getCsoName(cso_id) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM cso WHERE id='" + cso_id + "'", []).then((data) => {
        console.log(data)
        let adUsersArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            adUsersArr.push({
              id: data.rows.item(i).id,
              cso_type_id: data.rows.item(i).cso_type_id,
              cso_sector_id: data.rows.item(i).cso_sector_id,
              province_id: data.rows.item(i).province_id,
              district_id: data.rows.item(i).district_id,
              municipality_id: data.rows.item(i).municipality_id,
              ward_number: data.rows.item(i).ward_number,
              nda_registration: data.rows.item(i).nda_registration,
              registration_number: data.rows.item(i).registration_number,
              name_of_cso: data.rows.item(i).name_of_cso,
              contact_person: data.rows.item(i).contact_person,
              physical_address: data.rows.item(i).physical_address,
              contact_number: data.rows.item(i).contact_number,
              email_address: data.rows.item(i).email_address,
              total_staff: data.rows.item(i).total_staff,
              collected_by: data.rows.item(i).collected_by,
              modified_by: data.rows.item(i).modified_by,
              modified_date: data.rows.item(i).modified_date,
              created_by: data.rows.item(i).created_by
            });
            this.storeOrgNames(data.rows.item(i).name_of_cso)
          }
        }
        resolve(adUsersArr);
        loading.dismiss();
        // console.log(adUsersArr);
      }, (error) => {
        reject(error);
        loading.dismiss();
      })
    })
  }

  DisplayCso(user_id) {
    return new Promise((resolve, reject) => {
      console.log(user_id)
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Please wait...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM cso WHERE province_id =" + user_id, []).then((data) => {
        console.log(data)
        let csoArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            csoArr.push({
              id: data.rows.item(i).id,
              cso_type_id: data.rows.item(i).cso_type_id,
              cso_sector_id: data.rows.item(i).cso_sector_id,
              province_id: data.rows.item(i).province_id,
              district_id: data.rows.item(i).district_id,
              municipality_id: data.rows.item(i).municipality_id,
              ward_number: data.rows.item(i).ward_number,
              nda_registration: data.rows.item(i).nda_registration,
              registration_number: data.rows.item(i).registration_number,
              name_of_cso: data.rows.item(i).name_of_cso,
              contact_person: data.rows.item(i).contact_person,
              physical_address: data.rows.item(i).physical_address,
              contact_number: data.rows.item(i).contact_number,
              email_address: data.rows.item(i).email_address,
              total_staff: data.rows.item(i).total_staff,
              collected_by: data.rows.item(i).collected_by,
              modified_by: data.rows.item(i).modified_by,
              modified_date: data.rows.item(i).modified_date,
              created_by: data.rows.item(i).created_by
            });
            this.storeOrgNames(data.rows.item(i).name_of_cso)
          }
        }
        resolve(csoArr);
        loading.dismiss();
        console.log(csoArr);
      }, (error) => {
        // reject(error);
        loading.dismiss();
      })
    })
  }

  ///////////////////////////////////////////


  //cso member method
  remoteCsoMemberData() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[tbl_cso_member]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
        console.log(results)
      })
    })
  }


  CsoMemberData() {
    return new Promise((resolve, db) => {
      let results = this.remoteCsoMemberData().then((data) => {
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            id: data[0][i].id,
            cso_id: data[0][i].cso_id,
            member_position_id: data[0][i].member_position_id,
            first_name: data[0][i].first_name,
            last_name: data[0][i].last_name,
            id_number: data[0][i].id_number,
            passport_number: data[0][i].passport_number,
            nationality: data[0][i].nationality,
            race: data[0][i].race,
            gender: data[0][i].gender,
            physical_address: data[0][i].physical_address,
            disability: data[0][i].disability,
            start_date: data[0][i].start_date,
            end_date: data[0][i].end_date,
            modified_by: data[0][i].modified_by,
            modified_date: data[0][i].modified_date,
            created_by: data[0][i].created_by,
            created_date: data[0][i].created_date,
            contact_number: data[0][i].contact_number
          }
          let sql = "INSERT INTO tbl_cso_member (id,cso_id  ,member_position_id ,first_name ,last_name ,id_number  ,passport_number ,nationality ,race ,gender ,disability ,physical_address ,contact_number ,start_date  ,end_date  ,modified_by  ,modified_date  ,created_by  ,created_date ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.cso_id, obj.member_position_id, obj.first_name, obj.last_name, obj.id_number, obj.passport_number, obj.nationality, obj.race, obj.gender, obj.disability, obj.physical_address, obj.contact_number, obj.start_date, obj.end_date, obj.modified_by, obj.modified_date, obj.created_by, obj.created_date]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
          })
          this.insertUser.push(obj)
        }
        resolve(this.insertUser)
      });
    });
  }


  getCsoMember() {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM tbl_cso_member", []).then((data) => {
        let addMemberArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            addMemberArr.push({
              contact_number: data.rows.item(i).contact_number,
              created_by: data.rows.item(i).created_by,
              created_date: data.rows.item(i).created_date,
              cso_id: data.rows.item(i).cso_id,
              disability: data.rows.item(i).disability,
              first_name: data.rows.item(i).first_name,
              gender: data.rows.item(i).gender,
              last_name: data.rows.item(i).last_name,
              modified_dat: data.rows.item(i).modified_dat,
              nationality: data.rows.item(i).nationality,
              race: data.rows.item(i).race,
            });
          }
        }
        resolve(addMemberArr);
        loading.dismiss();
        console.log(addMemberArr);
      }, (error) => {
        reject(error);
        loading.dismiss();
      })
    })
  }

  DisplayCsoMembers(cso_id) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM tbl_cso_member WHERE cso_id =" + cso_id, []).then((data) => {
        let addMemberArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            addMemberArr.push({
              contact_number: data.rows.item(i).contact_number,
              created_by: data.rows.item(i).created_by,
              created_date: data.rows.item(i).created_date,
              cso_id: data.rows.item(i).cso_id,
              disability: data.rows.item(i).disability,
              first_name: data.rows.item(i).first_name,
              gender: data.rows.item(i).gender,
              last_name: data.rows.item(i).last_name,
              modified_dat: data.rows.item(i).modified_dat,
              nationality: data.rows.item(i).nationality,
              race: data.rows.item(i).race,
            });
          }
        }
        resolve(addMemberArr);
        loading.dismiss();
        console.log(addMemberArr);
      }, (error) => {
        reject(error);
        loading.dismiss();
      })
    })
  }


  remoteCsoAssessmentData() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[tbl_cso_assessment]", function (data) {
        let Assesmentresults = JSON.parse(data);
        resolve(Assesmentresults);
        console.log(Assesmentresults)
        // alert(results)
      })
    })
  }

  CsoAssessmentData() {
    return new Promise((resolve, db) => {
      let Assesmentresults = this.remoteCsoAssessmentData().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            assessment_completed: data[0][i].assessment_completed,
            assessment_date: data[0][i].assessment_date,
            assessment_type_id: data[0][i].assessment_type_id,
            calc_assessment_level: data[0][i].calc_assessment_level,
            calc_assessment_score: data[0][i].calc_assessment_score,
            collected_by: data[0][i].collected_by,
            created_by: data[0][i].created_by,
            cso_id: data[0][i].cso_id,
            id: data[0][i].id,
            modified_by: data[0][i].modified_by,
            poe_link: data[0][i].poe_link,
            created_date: data[0][i].created_date,
            modified_date: data[0][i].modified_date
          }
          // console.log(obj)
          let sql = "INSERT INTO cso_assessment (id ,cso_id,assessment_type_id,calc_assessment_score,calc_assessment_level,poe_link,assessment_date,assessment_completed,collected_by,modified_by,created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.cso_id, obj.assessment_type_id, obj.calc_assessment_score, obj.calc_assessment_level, obj.poe_link, obj.assessment_date, obj.assessment_completed, obj.collected_by, obj.modified_by, obj.created_by]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
          })
          this.insertUser.push(obj)
        }
        resolve(this.insertUser)
      });
    });
  }



  DisplayAssessmentss() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM cso_assessment", []).then((data) => {
        console.log(data)
        let addAssesmentDiplsy = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            addAssesmentDiplsy.push({
              assessment_completed: data.rows.item(i).assessment_completed,
              assessment_date: data.rows.item(i).assessment_date,
              assessment_type_id: data.rows.item(i).assessment_type_id,
              calc_assessment_level: data.rows.item(i).calc_assessment_level,
              calc_assessment_score: data.rows.item(i).calc_assessment_score,
              collected_by: data.rows.item(i).collected_by,
              created_by: data.rows.item(i).created_by,
              cso_id: data.rows.item(i).cso_id,
              id: data.rows.item(i).id,
              modified_by: data.rows.item(i).modified_by,
              poe_link: data.rows.item(i).poe_link,
            });
          }
        }
        resolve(addAssesmentDiplsy);
        console.log(addAssesmentDiplsy);
      }, (error) => {
        reject(error);

      })
    })
  }

  DisplayAssessment(created_by) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM cso_assessment WHERE created_by=" + created_by, []).then((data) => {
        let addAssesment = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            addAssesment.push({
              assessment_completed: data.rows.item(i).assessment_completed,
              assessment_date: data.rows.item(i).assessment_date,
              assessment_type_id: data.rows.item(i).assessment_type_id,
              calc_assessment_level: data.rows.item(i).calc_assessment_level,
              calc_assessment_score: data.rows.item(i).calc_assessment_score,
              collected_by: data.rows.item(i).collected_by,
              created_by: data.rows.item(i).created_by,
              cso_id: data.rows.item(i).cso_id,
              id: data.rows.item(i).id,
              modified_by: data.rows.item(i).modified_by,
              poe_link: data.rows.item(i).poe_link,
            });
          }
        }
        resolve(addAssesment);
        loading.dismiss();
        // console.log(addAssesment);
      }, (error) => {
        reject(error);
        loading.dismiss();
      })
    })
  }




  AssessmentAdd(cso_id, assessment_type_id, calc_assessment_score, calc_assessment_level, poe_link, assessment_date, assessment_completed, collected_by, modified_by, created_by) {
    console.log(assessment_completed)
    console.log(assessment_date)
    console.log(assessment_type_id)
    console.log(poe_link)
    console.log(calc_assessment_level)
    console.log(calc_assessment_score)
    console.log(collected_by)
    console.log(cso_id)
    console.log(modified_by)
    return new Promise((resolve, reject) => {
      let LastRecordCso = this.checkLastRecordCsoAssessment().then((data) => {
        console.log(data)
        let CsoID = data[0].id + 1
        console.log(CsoID)
        let sql = "INSERT INTO cso_assessment (id ,cso_id,assessment_type_id,calc_assessment_score,calc_assessment_level,poe_link,assessment_date,assessment_completed,collected_by,modified_by,created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        this.db.executeSql(sql, [CsoID, cso_id, assessment_type_id, calc_assessment_score, calc_assessment_level, poe_link, assessment_date, assessment_completed, collected_by, modified_by, created_by]).then((data) => {
          console.log("INSERTED: " + JSON.stringify(data) + sql);
          resolve("true")
          console.log("true")
        }, (error) => {
          reject(error)
        })
      })
    });
  }
  testing_lkp_assessment() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT  * FROM assessment_answer WHERE id=1", []).then((data) => {
        console.log(data)
        let CsoAssArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            CsoAssArr.push({
              assessment_question_id: data.rows.item(i).assessment_question_id,
            });
          }
        }
        resolve(CsoAssArr);
        console.log(CsoAssArr);
      })
    })
  }



  GetAssessmentQuestionId(answer_id) {
    // console.log(answer_id)
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT assessment_question_id,weight FROM assessment_answer WHERE id=" + answer_id, []).then((data) => {
        let CsoAssArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            CsoAssArr.push({
              assessment_question_id: data.rows.item(i).assessment_question_id,
              weight: data.rows.item(i).weight,
            });
          }
        }


        // console.log(CsoAssArr);
        // resolve(CsoAssArr);
        // console.log(CsoAssArr);
        // console.log("assessmentArr")
      })
    })
  }


  checkLastRecordCsoAssessmenTable() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT id FROM cso_assessment ORDER BY id desc limit 1", []).then((data) => {
        let CsoAssArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            CsoAssArr.push({
              id: data.rows.item(i).id,
            });
          }
        }
        resolve(CsoAssArr);
        // console.log(CsoAssArr);
      })
    })
  }




  Score1 = 0
  AssessmentAddQnA(assessment_answer_id, user_answer, modified_by, modified_date, created_by, created_date) {
    // console.log(assessment_answer_id)
    return new Promise((resolve, reject) => {
      let LastRecordCso = this.checkLastRecordCsoAssessmenTable().then((data) => {
        // console.log(data)
        let cso_assessment_id = data[0].id + 1
        // console.log(cso_assessment_id)
        // console.log(assessment_answer_id)
        let getAssessmentID = this.GetAssessmentQuestionId(assessment_answer_id).then((data2) => {

          console.log(data2)
          let assessment_question_id = data2[0].assessment_question_id
          this.Score1 = this.Score1 + data2[0].weight
          console.log(this.Score1)
          // this.Score = this.Score1
          console.log(this.Score)

          this.scoreAarr.push(this.Score1)

          // let sql = "INSERT INTO assessment_question_answer (cso_assessment_id,assessment_question_id,assessment_answer_id,user_answer,modified_by,modified_date,created_by,created_date) VALUES (?,?,?,?,?,?,?,?)";
          // this.db.executeSql(sql, [cso_assessment_id, assessment_question_id, assessment_answer_id, user_answer, modified_by, modified_date, created_by, created_date]).then((data) => {
          //   console.log(data)
          //   // this.db.executeSql("UPDATE cso_assessment SET  calc_assessment_score =" + this.Score + " WHERE id=" + cso_assessment_id, []).then((data) => {
          //   //   console.log(data)
          //   //   console.log("updated")
          //   //   // console.log(data)
          //   // })
          //   resolve("true")
          // }, (error) => {
          //   reject("false");
          // })



        })

      });
      let getAssessmentID = this.GetAssessmentQuestionId(assessment_answer_id).then((data2) => {
        console.log(assessment_answer_id)
        let assessment_question_id = data2[0].assessment_question_id
        this.Score1 = this.Score1 + data2[0].weight
        console.log(this.Score1)
        // this.Score = this.Score1
        console.log(this.Score)

        this.scoreAarr.push(this.Score1)

        // console.log(data2)
      })
      // resolve(this.scoreAarr)
      // console.log(this.scoreAarr)
    });
  }

  updateScoreAssessment() {
    let i = this.scoreAarr.length
    console.log(this.scoreAarr.length)
    return new Promise((resolve, reject) => {
      let LastRecordCso = this.checkLastRecordCsoAssessmenTable().then((data) => {
        console.log(data)
        let cso_assessment_id = data[0].id + 1
        console.log(cso_assessment_id)
        console.log(this.Score)
        this.db.executeSql("UPDATE cso_assessment SET  calc_assessment_score =" + this.Score + " WHERE id=" + cso_assessment_id, []).then((data) => {
          console.log("updated")
          // console.log(data)
        })
      })
    })

  }

  DisplayAssessmentdata() {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM assessment_question_answer", []).then((data) => {
        console.log(data)
        let displayCapacaityArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            displayCapacaityArr.push({
              cso_assessment_id: data.rows.item(i).cso_assessment_id,
              assessment_question_id: data.rows.item(i).creatassessment_question_ided_by,
              assessment_answer_id: data.rows.item(i).assessment_answer_id,
              user_answer: data.rows.item(i).user_answer,
              modified_by: data.rows.item(i).modified_by,
            });
          }
        }
        resolve(displayCapacaityArr);
        loading.dismiss();
        console.log(displayCapacaityArr);
      }, (error) => {
        reject(error);
        loading.dismiss();
      })
    })
  }


  remoteCapacityBuildingData() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[tbl_capacity_building]", function (data) {
        let capacityresults = JSON.parse(data);
        resolve(capacityresults);
        // alert(capacityresults)
        console.log(capacityresults)
        // alert(results)
      })
    })
  }

  insertcapacityBuilding() {
    return new Promise((resolve, db) => {
      let capacityresults = this.remoteCapacityBuildingData().then((data) => {
        console.log(data)
        for (var i = 0; i < data[0].length; i++) {
          let obj = {
            capacity_building_type_id: data[0][i].capacity_building_type_id,
            created_by: data[0][i].created_by,
            created_date: data[0][i].created_date,
            district_id: data[0][i].district_id,
            end_date: data[0][i].end_date,
            facilitator_name: data[0][i].facilitator_name,
            funding_source_id: data[0][i].funding_source_id,
            id: data[0][i].id,
            modified_by: data[0][i].modified_by,
            modified_date: data[0][i].modified_date,
            municipality_id: data[0][i].municipality_id,
            province_id: data[0][i].province_id,
            start_date: data[0][i].start_date,
            venue: data[0][i].venue,
            partner_id: data[0][i].partner_id,
            co_facilitator_name: data[0][i].co_facilitator_name,
            collected_by: data[0][i].collected_by,
            attendance_register: data[0][i].attendance_register,
            poe_link: data[0][i].poe_link,
          }
          let sql = "INSERT INTO tbl_capacity_building (id,capacity_building_type_id,province_id,district_id,municipality_id,partner_id,venue,facilitator_name,co_facilitator_name,start_date,end_date,funding_source_id,collected_by,modified_by,modified_date,created_by,created_date,attendance_register,poe_link  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.capacity_building_type_id, obj.province_id, obj.district_id, obj.municipality_id, obj.partner_id, obj.venue, obj.facilitator_name, obj.co_facilitator_name, obj.start_date, obj.end_date, obj.funding_source_id, obj.collected_by, obj.modified_by, obj.modified_date, obj.created_by, obj.created_date, obj.attendance_register, obj.poe_link]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data) + sql);
            resolve("true")
            console.log("true")
          }, (error) => {
          })
          this.insertUser.push(obj)
        }
        resolve(this.insertUser)
      });
    });
  }

  DisplayCapacityBuildingdemo() {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM tbl_capacity_building").then((data) => {
        let displayCapacaityArrSecond = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            displayCapacaityArrSecond.push({
              capacity_building_type_id: data.rows.item(i).capacity_building_type_id,
              created_by: data.rows.item(i).created_by,
              created_date: data.rows.item(i).created_date,
              district_id: data.rows.item(i).district_id,
              end_date: data.rows.item(i).end_date,
              funding_source_id: data.rows.item(i).funding_source_id,
              facilitator_name: data.rows.item(i).facilitator_name,
              id: data.rows.item(i).id,
              modified_by: data.rows.item(i).modified_by,
              modified_date: data.rows.item(i).modified_date,
              municipality_id: data.rows.item(i).municipality_id,
              province_id: data.rows.item(i).province_id,
              start_date: data.rows.item(i).start_date,
              venue: data.rows.item(i).venue,
              partner_id: data.rows.item(i).partner_id,
              co_facilitator_name: data.rows.item(i).co_facilitator_name,
              collected_by: data.rows.item(i).collected_by,
              attendance_register: data.rows.item(i).attendance_register,
              poe_link: data.rows.item(i).poe_link,
            });
          }
        }
        resolve(displayCapacaityArrSecond);
        loading.dismiss();
        console.log(displayCapacaityArrSecond);
      }, (error) => {
        reject(error);
        loading.dismiss();
      })
    })
  }

  DisplayCapacityBuilding(user_id) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM tbl_capacity_building WHERE province_id =" + user_id, []).then((data) => {
        let displayCapacaityArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            displayCapacaityArr.push({
              capacity_building_type_id: data.rows.item(i).capacity_building_type_id,
              created_by: data.rows.item(i).created_by,
              created_date: data.rows.item(i).created_date,
              district_id: data.rows.item(i).district_id,
              end_date: data.rows.item(i).end_date,
              funding_source_id: data.rows.item(i).funding_source_id,
              facilitator_name: data.rows.item(i).facilitator_name,
              id: data.rows.item(i).id,
              modified_by: data.rows.item(i).modified_by,
              modified_date: data.rows.item(i).modified_date,
              municipality_id: data.rows.item(i).municipality_id,
              province_id: data.rows.item(i).province_id,
              start_date: data.rows.item(i).start_date,
              venue: data.rows.item(i).venue,
              partner_id: data.rows.item(i).partner_id,
              co_facilitator_name: data.rows.item(i).co_facilitator_name,
              collected_by: data.rows.item(i).collected_by,
              attendance_register: data.rows.item(i).attendance_register,
              poe_link: data.rows.item(i).poe_link,
            });
          }
        }
        resolve(displayCapacaityArr);
        loading.dismiss();
        console.log(displayCapacaityArr);
      }, (error) => {
        reject(error);
        loading.dismiss();
      })
    })
  }






  remoteCapacityBuildingParticipantData() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[tbl_capacity_building_participant]", function (data) {
        let Csoresults = JSON.parse(data);
        resolve(Csoresults);
        console.log(Csoresults)
        // alert(Csoresults)
      })
    })
  }







  getRegisteredCso() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM register", []).then((data) => {
        let regCso = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            regCso.push({
              id: data.rows.item(i).id,
              key: data.rows.item(i).key,
              CsoName: data.rows.item(i).CsoName,
              MobiMethod: data.rows.item(i).MobiMethod,
              mobiDate: data.rows.item(i).mobiDate,
              Paddress: data.rows.item(i).Paddress,
              Cso_type: data.rows.item(i).Cso_type,
              Cso_sector: data.rows.item(i).Cso_sector,
              Province: data.rows.item(i).Province,
              District: data.rows.item(i).District,
              Municipality: data.rows.item(i).Municipality,
              Ward_number: data.rows.item(i).Ward_number,
              Contact_Person: data.rows.item(i).Contact_Person,
              Contact_Number: data.rows.item(i).Contact_Number,
              Total_Staff: data.rows.item(i).Total_Staff,
              Collected_by: data.rows.item(i).Collected_by,
            });
            this.storeOrgNames(data.rows.item(i).CsoName)
          }
        }
        resolve(regCso);
        console.log(regCso);
      }, (error) => {
        reject(error);
      })
    })
  }



  getregsiterCso() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM cso WHERE ", []).then((data) => {
        let regCso = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            regCso.push({
              id: data.rows.item(i).id,
              key: data.rows.item(i).key,
              fname: data.rows.item(i).fname,
              lname: data.rows.item(i).lname,
              Position: data.rows.item(i).Position,
              Gender: data.rows.item(i).Gender,
              Race: data.rows.item(i).Race,
              Passport_number: data.rows.item(i).Passport_number,
              Disability: data.rows.item(i).Disability,
              physical_address: data.rows.item(i).pAddress,
              Nationality: data.rows.item(i).Nationality,
              Ward_number: data.rows.item(i).Ward_number,
              start_date: data.rows.item(i).StartDate,
              Contact_Number: data.rows.item(i).Contact_Number,
              id_number: data.rows.item(i).idnumber,
              end_date: data.rows.item(i).EndDate,
            });
          }
        }
        resolve(regCso);
        console.log(regCso);
      }, (error) => {
        reject(error);
      })
    })

  }

  checkLastRecordAddcapacity_building() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT id FROM tbl_capacity_building ORDER BY id desc limit 1", []).then((data) => {
        let CsoAssArr = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            CsoAssArr.push({
              id: data.rows.item(i).id,
            });
          }
        }
        resolve(CsoAssArr);
        console.log(CsoAssArr);
      })
    })
  }


  Addcapacity_building(capacity_building_type_id, province_id, district_id, municipality_id, partner_id, venue, facilitator_name, co_facilitator_name, start_date, end_date, funding_source_id, collected_by, modified_by, modified_date, created_by, created_date, attendance_register, poe_link) {
    return new Promise((resolve, reject) => {
      let capacityresults = this.checkLastRecordAddcapacity_building().then((data) => {
        console.log(data)
        let CsoId = data[0].id + 1
        console.log(CsoId)
        let sql = "INSERT INTO tbl_capacity_building (id,capacity_building_type_id,province_id,district_id,municipality_id,partner_id,venue,facilitator_name,co_facilitator_name,start_date,end_date,funding_source_id,collected_by,modified_by,modified_date,created_by,created_date,attendance_register,poe_link  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        this.db.executeSql(sql, [CsoId, capacity_building_type_id, province_id, district_id, municipality_id, partner_id, venue, facilitator_name, co_facilitator_name, start_date, end_date, funding_source_id, collected_by, modified_by, modified_date, created_by, created_date, attendance_register, poe_link]).then((data) => {
          console.log("INSERTED: " + JSON.stringify(data) + sql);
          resolve("true")
          console.log("true")
        }, (error) => {
        })
      });
    });
  }

  getcapacity_building() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM capacitybuilding", []).then((data) => {
        let getcapacity = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getcapacity.push({
              id: data.rows.item(i).id,
              key: data.rows.item(i).key,
              CsoName: data.rows.item(i).CsoName,
              Capacity: data.rows.item(i).Capacity,
              Province: data.rows.item(i).Province,
              District: data.rows.item(i).District,
              Municipality: data.rows.item(i).Municipality,
              partner: data.rows.item(i).venue,
              venue: data.rows.item(i).Disability,
              Fname: data.rows.item(i).Fname,
              Fsource: data.rows.item(i).Fsource,
              Collected: data.rows.item(i).Collected,
              StartDate: data.rows.item(i).StartDate,
              EndDate: data.rows.item(i).EndDate,
            });
          }
        }
        resolve(getcapacity);
        console.log(getcapacity);
      }, (error) => {
        reject(error);
      })
    })

  }
}
