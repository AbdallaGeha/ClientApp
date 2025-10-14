import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectUpdateComponent } from './projects/project-update/project-update.component';
import { ProjectIndexComponent } from './projects/project-index/project-index.component';
import { ItemIndexComponent } from './items/item-index/item-index.component';
import { ItemCreateComponent } from './items/item-create/item-create.component';
import { ItemUpdateComponent } from './items/item-update/item-update.component';
import { UnitIndexComponent } from './units/unit-index/unit-index.component';
import { UnitCreateComponent } from './units/unit-create/unit-create.component';
import { UnitUpdateComponent } from './units/unit-update/unit-update.component';
import { SupplierIndexComponent } from './suppliers/supplier-index/supplier-index.component';
import { SupplierCreateComponent } from './suppliers/supplier-create/supplier-create.component';
import { SupplierUpdateComponent } from './suppliers/supplier-update/supplier-update.component';
import { ProjectInvoiceUpdateComponent } from './projectinvoices/project-invoice-update/project-invoice-update.component';
import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';
import { LogoutComponent } from './security/logout/logout.component';
import { UsersIndexComponent } from './security/users-index/users-index.component';
import { UserRolesComponent } from './security/user-roles/user-roles.component';
import { UnauthorizedComponent } from './security/unauthorized/unauthorized.component';
import { IsSetupEntryGuard } from './guards/is-setup-entry.guard';
import { IsInvoiceEntryGuard } from './guards/is-invoice-entry.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { HomeComponent } from './home/home.component';
import { UserSettingComponent } from './security/user-setting/user-setting.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { ProjectInvoiceCreateComponent } from './projectinvoices/project-invoice-create/project-invoice-create.component';

import { PayPaymentsIdsComponent } from './projectinvoices/pay-payments-ids/pay-payments-ids.component';
import { PaymentsToPayComponent } from './projectinvoices/payments-to-pay/payments-to-pay.component';
import { ProjectInvoicesViewComponent } from './projectinvoices/project-invoices-view/project-invoices-view.component';
import { BankIndexComponent } from './banks/bank-index/bank-index.component';
import { BankCreateComponent } from './banks/bank-create/bank-create.component';
import { BankUpdateComponent } from './banks/bank-update/bank-update.component';
import { ErrorComponent } from './error/error.component';
import { BankAccountIndexComponent } from './banks/bank-account-index/bank-account-index.component';
import { BankAccountCreateComponent } from './banks/bank-account-create/bank-account-create.component';
import { BankAccountUpdateComponent } from './banks/bank-account-update/bank-account-update.component';
import { IsPaymentEntryGuard } from './guards/is-payment-entry.guard';

const routes: Routes = [
  
  { path: 'home', component: HomeComponent},
  { path: 'error', component: ErrorComponent},

  { path: 'register', component : RegisterComponent},
  { path: 'login', component : LoginComponent},
  { path: 'logout', component : LogoutComponent },
  { path: 'unauthorized', component : UnauthorizedComponent},

  //Protected routes
  { path : 'projects', component : ProjectIndexComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'projects/new', component : ProjectCreateComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'projects/update/:id', component : ProjectUpdateComponent, canActivate : [IsSetupEntryGuard]},
  
  { path : 'items', component : ItemIndexComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'items/new', component : ItemCreateComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'items/update/:id', component : ItemUpdateComponent, canActivate : [IsSetupEntryGuard]},
  
  { path : 'units', component : UnitIndexComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'units/new', component : UnitCreateComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'units/update', component : UnitUpdateComponent, canActivate : [IsSetupEntryGuard]},  

  { path : 'suppliers', component : SupplierIndexComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'suppliers/new', component : SupplierCreateComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'suppliers/update/:id', component : SupplierUpdateComponent, canActivate : [IsSetupEntryGuard]},
  
  { path : 'banks', component : BankIndexComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'banks/new', component : BankCreateComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'banks/update/:id', component : BankUpdateComponent, canActivate : [IsSetupEntryGuard]},
  
  { path : 'bankaccounts', component : BankAccountIndexComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'bankaccounts/new', component : BankAccountCreateComponent, canActivate : [IsSetupEntryGuard]},
  { path : 'bankaccounts/update/:id', component : BankAccountUpdateComponent, canActivate : [IsSetupEntryGuard]},

  { path : 'projectinvoices/new', component : ProjectInvoiceCreateComponent, canActivate : [IsInvoiceEntryGuard]},
  { path : 'projectinvoices/update/:id', component : ProjectInvoiceUpdateComponent, canActivate : [IsInvoiceEntryGuard]},
  { path: 'projectinvoices/topay', component : PaymentsToPayComponent, canActivate : [IsPaymentEntryGuard]},
  { path: 'projectinvoices/payids', component : PayPaymentsIdsComponent, canActivate : [IsPaymentEntryGuard]},
  { path: 'projectinvoices/view', component : ProjectInvoicesViewComponent, canActivate : [IsInvoiceEntryGuard]},
  
  { path : 'users', component : UsersIndexComponent, canActivate : [IsAdminGuard]},
  { path : 'users/userroles/:email', component : UserRolesComponent, canActivate : [IsAdminGuard]},
  { path : 'settings', component : UserSettingComponent, canActivate : [IsAuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
