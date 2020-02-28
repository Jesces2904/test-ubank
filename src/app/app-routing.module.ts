import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'new-goal',
    loadChildren: () => import('./Pages/new-goal/new-goal.module').then( m => m.NewGoalPageModule)
  },
  {
    path: 'new-rule/:id',
    loadChildren: () => import('./Pages/new-rule/new-rule.module').then( m => m.NewRulePageModule)
  },
  {
    path: 'simulation',
    loadChildren: () => import('./Pages/simulation/simulation.module').then( m => m.SimulationPageModule)
  },
  {
    path: 'edit-goal/:id',
    loadChildren: () => import('./Pages/edit-goal/edit-goal.module').then( m => m.EditGoalPageModule)
  },
  {
    path: 'edit-rule/:id',
    loadChildren: () => import('./Pages/edit-rule/edit-rule.module').then( m => m.EditRulePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
