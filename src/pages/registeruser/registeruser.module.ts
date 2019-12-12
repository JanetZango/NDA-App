import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisteruserPage } from './registeruser';

@NgModule({
  declarations: [
    RegisteruserPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisteruserPage),
  ],
})
export class RegisteruserPageModule {}
