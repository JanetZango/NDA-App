import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicSelectableModule } from 'ionic-selectable';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqliteProvider } from '../providers/sqlite/sqlite';
import { RegisteruserPage } from '../pages/registeruser/registeruser';
import { ListPage } from '../pages/list/list';
import { CapacityPage } from '../pages/capacity/capacity';
import { ViewMemberAssessPage } from '../pages/view-member-assess/view-member-assess';
import { ViewMemberPage } from '../pages/view-member/view-member';
import { ShowdetailsPage } from '../pages/showdetails/showdetails';
import { RegisterPage } from '../pages/register/register';
import { MembersPage } from '../pages/members/members';
import { DisplaymemberPage } from '../pages/displaymember/displaymember';
import { SeeMembersPage } from '../pages/see-members/see-members';
import { BuildinginterventionsPage } from '../pages/buildinginterventions/buildinginterventions';
import { ViewCapacityPage } from '../pages/view-capacity/view-capacity';
import { DisplaydatesofmemberPage } from '../pages/displaydatesofmember/displaydatesofmember';
import { AddPasswordPage } from '../pages/add-password/add-password';
import { ProfilePage } from '../pages/profile/profile';
import { AssessmentPage } from '../pages/assessment/assessment';
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisteruserPage,
    ListPage,
    CapacityPage,
    ViewMemberAssessPage,
    ViewMemberPage,
    ShowdetailsPage,
    RegisterPage,
    MembersPage,
    DisplaymemberPage,
    SeeMembersPage,
    BuildinginterventionsPage,
    ViewCapacityPage,
    DisplaydatesofmemberPage,
    AddPasswordPage,
    ProfilePage,
    AssessmentPage
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicSelectableModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisteruserPage,
    ListPage,
    CapacityPage,
    ViewMemberAssessPage,
    ViewMemberPage,
    ShowdetailsPage,
    RegisterPage,
    MembersPage,
    DisplaymemberPage,
    SeeMembersPage,
    BuildinginterventionsPage,
    ViewCapacityPage,
    DisplaydatesofmemberPage,
    AddPasswordPage,
    ProfilePage,
    AssessmentPage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Camera,
    Keyboard,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SqliteProvider, Camera, Keyboard,
    
  ]
})
export class AppModule { }
