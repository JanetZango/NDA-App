import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeMembersPage } from './see-members';

@NgModule({
  declarations: [
    SeeMembersPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeMembersPage),
  ],
})
export class SeeMembersPageModule {}
