import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGoalPageRoutingModule } from './edit-goal-routing.module';

import { EditGoalPage } from './edit-goal.page';

import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditGoalPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditGoalPage]
})
export class EditGoalPageModule {}
