import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AddContactComponent } from './contacts/add-contact.component';
import { ListContactsComponent } from './contacts/list-contacts.component';
import { ContactsMainComponent } from './contacts/main-contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    ListContactsComponent,
    ContactsMainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
