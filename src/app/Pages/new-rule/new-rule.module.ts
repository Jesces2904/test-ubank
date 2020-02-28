import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRulePageRoutingModule } from './new-rule-routing.module';

import { NewRulePage } from './new-rule.page';

import { ComponentsModule } from '../../Components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewRulePageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewRulePage]
})
export class NewRulePageModule {}
