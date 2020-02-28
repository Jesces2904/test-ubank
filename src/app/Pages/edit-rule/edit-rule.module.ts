import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRulePageRoutingModule } from './edit-rule-routing.module';

import { EditRulePage } from './edit-rule.page';

import { ComponentsModule } from '../../Components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRulePageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditRulePage]
})
export class EditRulePageModule {}
