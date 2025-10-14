import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';

import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectUpdateComponent } from './projects/project-update/project-update.component';
import { ProjectIndexComponent } from './projects/project-index/project-index.component';
import { ItemIndexComponent } from './items/item-index/item-index.component';
import { ItemCreateComponent } from './items/item-create/item-create.component';
import { ItemUpdateComponent } from './items/item-update/item-update.component';
import { UnitCreateComponent } from './units/unit-create/unit-create.component';
import { UnitUpdateComponent } from './units/unit-update/unit-update.component';
import { UnitIndexComponent } from './units/unit-index/unit-index.component';
import { SupplierCreateComponent } from './suppliers/supplier-create/supplier-create.component';
import { SupplierUpdateComponent } from './suppliers/supplier-update/supplier-update.component';
import { SupplierIndexComponent } from './suppliers/supplier-index/supplier-index.component';
import { ProjectInvoiceCreateComponent } from './projectinvoices/project-invoice-create/project-invoice-create.component';
import { ProjectInvoiceUpdateComponent } from './projectinvoices/project-invoice-update/project-invoice-update.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { LogoutComponent } from './security/logout/logout.component';
import { UsersIndexComponent } from './security/users-index/users-index.component';
import { UserRolesComponent } from './security/user-roles/user-roles.component';
import { UnauthorizedComponent } from './security/unauthorized/unauthorized.component';
import { JwtInterceptorInterceptor } from './security/jwt-interceptor.interceptor';
import { UserSettingComponent } from './security/user-setting/user-setting.component';
import { HomeComponent } from './home/home.component';
import { PaymentsToPayComponent } from './projectinvoices/payments-to-pay/payments-to-pay.component';
import { PayPaymentsIdsComponent } from './projectinvoices/pay-payments-ids/pay-payments-ids.component';
import { ProjectInvoicesViewComponent } from './projectinvoices/project-invoices-view/project-invoices-view.component';
import { DatePipe } from '@angular/common';
import { BankCreateComponent } from './banks/bank-create/bank-create.component';
import { BankUpdateComponent } from './banks/bank-update/bank-update.component';
import { BankIndexComponent } from './banks/bank-index/bank-index.component';
import { ErrorComponent } from './error/error.component';
import { BankAccountCreateComponent } from './banks/bank-account-create/bank-account-create.component';
import { BankAccountUpdateComponent } from './banks/bank-account-update/bank-account-update.component';
import { BankAccountIndexComponent } from './banks/bank-account-index/bank-account-index.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    ProjectIndexComponent,
    ItemIndexComponent,
    ItemCreateComponent,
    ItemUpdateComponent,
    UnitCreateComponent,
    UnitUpdateComponent,
    UnitIndexComponent,
    SupplierCreateComponent,
    SupplierUpdateComponent,
    SupplierIndexComponent,
    ProjectInvoiceCreateComponent,
    ProjectInvoiceUpdateComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    UsersIndexComponent,
    UserRolesComponent,
    UnauthorizedComponent,
    UserSettingComponent,
    HomeComponent,
    PaymentsToPayComponent,
    PayPaymentsIdsComponent,
    ProjectInvoicesViewComponent,
    BankCreateComponent,
    BankUpdateComponent,
    BankIndexComponent,
    ErrorComponent,
    BankAccountCreateComponent,
    BankAccountUpdateComponent,
    BankAccountIndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTabsModule    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
