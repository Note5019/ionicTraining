import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'app',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'user-dashboard', loadChildren: './user-dashboard/user-dashboard.module#UserDashboardPageModule' },
  { path: 'quotation', loadChildren: './quotations/quotations.module#QuotationsPageModule' },
  // { path: 'quotation-create', loadChildren: './quotations/quotation-create/quotation-create.module#QuotationCreatePageModule' },
  // { path: 'quotation-view', loadChildren: './quotations/quotation-view/quotation-view.module#QuotationViewPageModule' },
  // { path: 'quotation-list', loadChildren: './quotations/quotation-list/quotation-list.module#QuotationListPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
