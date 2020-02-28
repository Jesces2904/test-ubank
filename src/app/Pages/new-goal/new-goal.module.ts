import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGoalPageRoutingModule } from './new-goal-routing.module';

import { NewGoalPage } from './new-goal.page';

import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGoalPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewGoalPage]
})
export class NewGoalPageModule {}
