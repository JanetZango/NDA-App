
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform, AlertController } from 'ionic-angular';
import { LoadingController } from "ionic-angular";






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

  constructor(public database: SQLite, private platform: Platform, public alert: AlertController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log('Hello SqliteProvider Provider');

    platform.ready().then(() => {
      this.Remoteconnection();
      this.checkNetwork();
      // this.VPNConnection();
      this.sqlitestate();

      // this.UserData();
      // this.InsertUserData();
      console.log(String.fromCharCode(92));
    })


  }

  // getName() {
  //   return this.orgNames;
  // }

  CsoName = new Array();

  storeOrgNames(name_of_cso) {
    console.log(name_of_cso)
    this.CsoName.push(name_of_cso);
    console.log(this.CsoName)
  }
  getName() {
    return this.CsoName
  }

  checkNetwork() {
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
  }
  

 

  VPNConnection() {
    window['plugins'].VPNConnection.enable(
      function (result) {
        console.log('result ', result);
        alert('connected');
      },
      function (error) {
        console.log('error ', error);
        alert(error);
      },
      // options
    );
  }

  Remoteconnection() {
    SqlServer.init("156.38.140.58", "MSSQLSERVER", "sa", "T1r1s@n", "cso_tra", function (event) {
      alert("successful:" + JSON.stringify(event));
    }, function (error) {
      alert("Not Successful:" + JSON.stringify(error));
    });

    // SqlServer.init("MSTCSOTRA07", "MSSQLSERVER", "csomobapp", "K@kany02019", "cso_tra", function (event) {
    //   alert("successful:" + JSON.stringify(event));
    //   console.log(JSON.stringify(event))
    // }, function (error) {
    //   alert("Not Successful:" + JSON.stringify(error));
    //   console.log(JSON.stringify(error))
    // });


    SqlServer.testConnection(function (event) {
      alert(JSON.stringify(event));
      // console.log(JSON.stringify(event))
    }, function (error) {
      alert("Error : " + JSON.stringify(error));
      // console.log(JSON.stringify(error))
    });

    // this.remoteUserData();
    // this.remoteCsoData(); 
    // this.remoteCsoMemberData();
    // this.remoteAssessmentQuestionsAnswerData();
    // this.remoteCsoAssessmentData();
    // this.remoteCapacityBuildingParticipantData();
    // this.remoteCapacityBuildingData();
    this.remoteCsoAssessmentData();

  }

  sqlitestate() {
    if (!this.isOpen) {
      this.sql = new SQLite();
      this.sql.create({ name: "cso_mobi.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        // db.executeSql("DROP TABLE [IF EXISTS] user");
        db.executeSql("CREATE TABLE IF NOT EXISTS user (id int CONSTRAINT pk_id PRIMARY KEY NOT NULL,username TEXT,auth_key TEXT,password_hash TEXT,password_reset_token TEXT,verification_token TEXT,full_name TEXT,email TEXT,province_id INTEGER,status INTEGER,role TEXT,legacy_user_id INTEGER,created_at INTEGER,updated_at INTEGER,office TEXT,title TEXT,province_name TEXT,user_group TEXT)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS tbl_cso (id int CONSTRAINT pk_id PRIMARY KEY NOT NULL, cso_type_id INTEGER ,cso_sector_id INTEGER ,province_id INTEGER ,district_id ,municipality_id INTEGER,ward_number INTEGER,registration_number  ,nda_registration  ,name_of_cso TEXT  ,contact_person TEXT ,physical_address TEXT  ,contact_number TEXT ,email_address TEXT ,total_staff  ,collected_by INTEGER  ,modified_by INTEGER NULL,modified_date DATE ,created_by INTEGER ,created_date DATE ,cso_mobilisation_method_id INTEGER , mobilisation_date DATE )", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS tbl_cso_member (id INTEGER CONSTRAINT pk_id PRIMARY KEY NOT NULL,cso_id INTEGER ,member_position_id INTEGER ,first_name TEXT ,last_name TEXT,id_number TEXT ,passport_number TEXT,nationality TEXT,race TEXT,gender TEXT,disability TEXT,physical_address TEXT,contact_number TEXT,start_date DATE ,end_date DATE ,modified_by INTEGER ,modified_date DATE ,created_by INTEGER ,created_date DATE)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS tbl_cso_assessment (id INTEGER CONSTRAINTEGER pk_id PRIMARY KEY  ,cso_id INTEGER  ,assessment_type_id INTEGER ,calc_assessment_score decimal(18, 5) ,calc_assessment_level INTEGER ,poe_link TEXT ,assessment_DATE DATE ,assessment_completed bit  ,collected_by TEXT ,modified_by INTEGER ,modified_DATE DATE ,created_by INTEGER ,created_DATE DATE)", [])
        // db.executeSql("CREATE TABLE IF NOT EXISTS tbl_assessment_question_answer (id int CONSTRAINT pk_id PRIMARY KEY NOT NULL,cso_assessment_id int NOT NULL,assessment_question_id int NOT NULL,assessment_answer_id int NOT NULL, user_answer nvarchar(255) NULL,modified_by int NULL,modified_date datetime NULL,created_by int NULL,created_date datetime NULL)", [])
        db.executeSql("CREATE TABLE IF NOT EXISTS tbl_capacity_building (id INTEGER CONSTRAINT pk_id PRIMARY KEY  ,capacity_building_type_id INTEGER  ,province_id INTEGER  ,district_id INTEGER  ,municipality_id INTEGER  ,partner_id INTEGER ,venue TEXT ,facilitator_name TEXT ,co_facilitator_name TEXT ,start_date date  ,end_date date  ,funding_source_id INTEGER ,collected_by TEXT ,modified_by INTEGER ,modified_date DATE ,created_by INTEGER ,created_date DATE ,attendance_register TEXT ,poe_link TEXT )", []) 
        // db.executeSql("CREATE TABLE IF NOT EXISTS tbl_capacity_building_participant (id int CONSTRAINT pk_id PRIMARY KEY NOT NULL,capacity_building_id int NOT NULL,cso_member_id int NOT NULL,date_attended date NULL,modified_by int NULL,modified_date datetime NULL,created_by int NULL,created_date datetime NULL)", [])
        this.isOpen = true;
        console.log('TABLE CREATED: ');

        // this.UserData();
        // this.CSOData();
        // this.getUser();
        // this.getCso(); 
        // this.remoteCsoDataMainDB();
        // this.CsoMemberData();
        // this.remoteCapacityBuildingData()
        // this.insertcapacityBuilding()
        alert("Data Collected");

      }).catch((error) => {
        console.log(error);
      });
    }
  }




  checkingEmail(email_address) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM user WHERE email='"+email_address+"'", []).then((data) => {
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
        console.log(adUsersArr);
      }, (error) => {
        reject(error);
      })
    })
  }


  //updating password
  updateUserPssword(id,password_hash){
    return new Promise((resolve, reject) => {
    this.db.executeSql("UPDATE user SET password_hash ='"+password_hash+"' WHERE id="+id,[]).then((data)=>{
      console.log("updated")
      // console.log(data)
    })
    })
  }

  //push to the main database
  adUsersArr = new Array();
  remoteCsoDataMainDB() {
    return new Promise((resolve, reject) => {
      let Csoresults = this.getCso().then((data) => {
        console.log(data[0])
        // for (var i = 0; i < data[0].length; i++) {
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
        SqlServer.execute("INSERT INTO [cso_tra].[dbo].[tbl_cso] (cso_type_id,cso_sector_id,province_id,district_id,municipality_id,ward_number, name_of_cso ,contact_person ,physical_address ,contact_number,email_address ,total_staff ,collected_by ,modified_by ,modified_date ,created_by ,created_date) VALUES (" + obj.cso_type_id + "," + obj.cso_sector_id + "," + obj.province_id + "," + obj.district_id + "," + obj.municipality_id + "," + obj.ward_number + ",'" + obj.name_of_cso + "','" + obj.contact_person + "','" + obj.physical_address + "','" + obj.contact_number + "','" + obj.email_address + "'," + obj.total_staff, obj.collected_by, obj.modified_by + ",'" + obj.modified_date + "'," + obj.created_by + ",'" + obj.created_date + "')")
        // let sql = "INSERT INTO [cso_tra].[dbo].[tbl_cso] (id,cso_type_id ,cso_sector_id ,province_id,district_id ,municipality_id ,ward_number ,registration_number ,nda_registration,name_of_cso ,contact_person ,physical_address ,contact_number,email_address ,total_staff ,collected_by ,modified_by ,modified_date ,created_by ,created_date ,cso_mobilisation_method_id , mobilisation_date ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        // let sql = "INSERT INTO [cso_tra].[dbo].[tbl_cso] (cso_type_id) VALUES (1)";
        // SqlServer.execute("INSERT INTO [cso_tra].[dbo].[tbl_cso] (cso_type_id,cso_sector_id,province_id,district_id,municipality_id,ward_number,name_of_cso,physical_address,collected_by) VALUES ("+obj.cso_type_id+",1,1,1,1,1,'"+obj.name_of_cso+"','1',1)")
        // SqlServer.execute(sql, /*[obj.id, obj.cso_type_id, obj.cso_sector_id, obj.province_id, obj.district_id, obj.municipality_id, obj.ward_number, this.registration_number, obj.nda_registration, obj.name_of_cso, obj.contact_person, obj.physical_address, obj.contact_number, obj.email_address, obj.total_staff, obj.collected_by, obj.modified_by, obj.modified_date, obj.created_by, obj.created_date, this.cso_mobilisation_method_id, this.mobilisation_date]*/ function (data) {
        console.log("INSERTED: " + JSON.stringify(data));
        resolve(resolve)
        console.log("true")
      }, (error) => {
        reject(error);
      })
      // console.log(obj.username)
      // this.adUsersArr.push(obj)

      // }

      resolve(this.adUsersArr)
      console.log(this.adUsersArr)
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
            console.log("true")
          }, (error) => {
          })
          this.insertUser.push(obj)
        }
        resolve(this.insertUser)
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
        console.log(adUsersArr);
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


  registration_number = null;
  cso_mobilisation_method_id = null;
  mobilisation_date = null;
  insertCso = new Array();
  CSOData() {
    return new Promise((resolve, reject) => {
      let Csoresults = this.remoteCsoData().then((data) => {
        // console.log(data)
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
          let sql = "INSERT INTO tbl_cso (id, cso_type_id ,cso_sector_id ,province_id,district_id ,municipality_id ,ward_number ,registration_number ,nda_registration,name_of_cso ,contact_person ,physical_address ,contact_number,email_address ,total_staff ,collected_by ,modified_by ,modified_date ,created_by ,created_date ,cso_mobilisation_method_id , mobilisation_date ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM tbl_cso", []).then((data) => {
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
              created_by:data.rows.item(i).created_by
            });
          }
        }
        resolve(adUsersArr);
        loading.dismiss();
        console.log(adUsersArr);
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
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM tbl_cso WHERE created_by ="+user_id, []).then((data) => {
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
              created_by:data.rows.item(i).created_by
            });

            this.storeOrgNames(data.rows.item(i).name_of_cso);
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
      this.db.executeSql("SELECT * FROM tbl_cso_member WHERE cso_id ="+cso_id, []).then((data) => {
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
            created_date: data[0][i].created_date,
            cso_id: data[0][i].cso_id,
            id: data[0][i].id,
            modified_by: data[0][i].modified_by,
            modified_date: data[0][i].modified_date,
            poe_link: data[0][i].poe_link,
          }
          // console.log(obj)
          let sql = "INSERT INTO tbl_cso_assessment (id,assessment_completed,assessment_date,assessment_type_id,calc_assessment_level,calc_assessment_score,collected_by,created_by,cso_id,modified_bymodified_date,poe_link) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          this.db.executeSql(sql, [obj.id, obj.assessment_completed, obj.assessment_date, obj.assessment_type_id, obj.calc_assessment_level, obj.calc_assessment_score, obj.collected_by, obj.created_by, obj.cso_id, obj.modified_by, obj.modified_date, obj.poe_link]).then((data) => {
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


  DisplayAssessment(cso_id) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM tbl_cso_assessment WHERE created_by ="+cso_id, []).then((data) => {
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
              created_date: data.rows.item(i).created_date,
              cso_id: data.rows.item(i).cso_id,
              id: data.rows.item(i).id,
              modified_by: data.rows.item(i).modified_by,
              modified_date: data.rows.item(i).modified_date,
              poe_link: data.rows.item(i).poe_link,
            });
          }
        }
        resolve(addAssesment);
        loading.dismiss();
        console.log(addAssesment);
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
        alert(capacityresults)
        console.log(capacityresults)
        // alert(results)
      })
    })
  }

  insertcapacityBuilding(){
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
          this.db.executeSql(sql, [obj.id  ,obj.capacity_building_type_id   ,obj.province_id   ,obj.district_id   ,obj.municipality_id   ,obj.partner_id  ,obj.venue  ,obj.facilitator_name  ,obj.co_facilitator_name  ,obj.start_date   ,obj.end_date   ,obj.funding_source_id  ,obj.collected_by  ,obj.modified_by  ,obj.modified_date  ,obj.created_by  ,obj.created_date  ,obj.attendance_register  ,obj.poe_link ]).then((data) => {
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

  DisplayCapacityBuilding(user_id){
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'loading...',
        duration: 4000000
      });
      loading.present();
      this.db.executeSql("SELECT * FROM tbl_capacity_building WHERE created_by ="+user_id, []).then((data) => {
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



  remoteAssessmentQuestionsAnswerData() {
    return new Promise((resolve, reject) => {
      SqlServer.executeQuery("select * from [cso_tra].[dbo].[tbl_assessment_question_answer]", function (data) {
        let results = JSON.parse(data);
        resolve(results);
        console.log(results)
        // alert(results)
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










  id;
  username;
  // InsertUserData() {
  //   return new Promise((resolve, db) => {
  //     console.log(this.insertUser)
  //     let a = this.UserData().then((data) => {
  //       console.log(data)
  //       for (var x = 0; x < this.insertUser.length; x++) {
  //         this.id =this.insertUser[x].id
  //         this.username =this.insertUser[x].username
  //         alert(this.insertUser[x].id)
  //         let sql = "INSERT INTO user (id,username) VALUES (?,?)";
  //         this.db.executeSql(sql, [this.id,this.username]).then((data) => {
  //           console.log("INSERTED: " + JSON.stringify(data) + sql);
  //           resolve("true")
  //           console.log("true")
  //         }, (error) => {
  //           // reject("false");

  //         });
  //       }
  //     })

  //   })
  // }




  // id, cso_type_id ,cso_sector_id ,province_id,district_id ,municipality_id ,ward_number ,registration_number ,nda_registration,name_of_cso ,contact_person ,physical_address ,contact_number,email_address ,total_staff ,collected_by ,modified_by ,modified_date ,created_by ,created_date ,cso_mobilisation_method_id , mobilisation_date 



  regsiterCso(id, cso_type_id, cso_sector_id, province_id, district_id, municipality_id, ward_number, registration_number, nda_registration, name_of_cso, contact_person, physical_address, contact_number, email_address, total_staff, collected_by, modified_by, modified_date, created_by, created_date, cso_mobilisation_method_id, mobilisation_date) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO tbl_cso (id, cso_type_id ,cso_sector_id ,province_id,district_id ,municipality_id ,ward_number ,registration_number ,nda_registration,name_of_cso ,contact_person ,physical_address ,contact_number,email_address ,total_staff ,collected_by ,modified_by ,modified_date ,created_by ,created_date ,cso_mobilisation_method_id , mobilisation_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      this.db.executeSql(sql, [id, cso_type_id, cso_sector_id, province_id, district_id, municipality_id, ward_number, registration_number, nda_registration, name_of_cso, contact_person, physical_address, contact_number, email_address, total_staff, collected_by, modified_by, modified_date, created_by, created_date, cso_mobilisation_method_id, mobilisation_date]).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data) + sql);
        resolve(true)
        // this
        //   .getUser()
        //   .then(s => {
        //     resolve(true)
        //   });
      }, (error) => {
        reject(error);

      });
    });
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

  regsiterCsoMember(key, fname, lname, Position, Gender, Race, Passport_number, Disability, Nationality, pAddress, Contact_Number, idnumber, StartDate, EndDate) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO cso (key,fname,lname,Position,Gender,Race,Passport_number,Disability,Nationality,pAddress,Contact_Number,idnumber,StartDate,EndDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?))";
      this.db.executeSql(sql, [key, fname, lname, Position, Gender, Race, Passport_number, Disability, Nationality, pAddress, Contact_Number, idnumber, StartDate, EndDate]).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data) + sql);
        this
          .getUser()
          .then(s => {
            resolve(true)
          });
      }, (error) => {
        reject(false);

      });
    });
  }

  getregsiterCsoMember() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM cso", []).then((data) => {
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

  Addcapacity_building(key, CsoName, Capacity, Province, District, Municipality, partner, venue, Fname, Fsource, Collected, StartDate, EndDate) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO capacitybuilding (key, CsoName, Capacity, Province, District, Municipality,partner,venue,Fname,Fsource,Collected,StartDate,EndDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
      this.db.executeSql(sql, [key, CsoName, Capacity, Province, District, Municipality, partner, venue, Fname, Fsource, Collected, StartDate, EndDate]).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data) + sql);
        this
          .getUser()
          .then(s => {
            resolve(true)
          });
      }, (error) => {
        reject(false);

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
