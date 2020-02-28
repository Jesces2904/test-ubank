import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRulePage } from './new-rule.page';

const routes: Routes = [
  {
    path: '',
    component: NewRulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRulePageRoutingModule {}
