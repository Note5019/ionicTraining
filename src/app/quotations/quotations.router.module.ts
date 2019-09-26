import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        loadChildren: () =>
          import('./quotation-create/quotation-create.module').then(
            m => m.QuotationCreatePageModule
          )
      },
      {
        path: 'view',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./quotation-view/quotation-view.module').then(
            m => m.QuotationViewPageModule
          )
      },
      {
        path: 'list',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./quotation-list/quotation-list.module').then(
            m => m.QuotationListPageModule
          )
      },
      {
        path: '**',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./quotation-list/quotation-list.module').then(
            m => m.QuotationListPageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationsRoutingModule {}
