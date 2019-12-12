import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPasswordPage } from './add-password';

@NgModule({
  declarations: [
    AddPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPasswordPage),
  ],
})
export class AddPasswordPageModule {}
