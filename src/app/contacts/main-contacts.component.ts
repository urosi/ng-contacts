import { Component, OnInit } from '@angular/core'
import { ContactService } from './shared/contact.service';
import { IContact } from './shared/contact.model';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts-main',
  templateUrl: './main-contacts.component.html',
  styleUrls: [
    './main-contacts.component.css'
  ]
})

export class ContactsMainComponent implements OnInit {
  contacts: IContact[];

  constructor(private contactService: ContactService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getContactsFromService();
  }

  removeContact(name: string){
    this.contactService.removeContact(name);
    let index:number = this.contacts.findIndex(c => c.name === name);
    this.contacts.splice(index, 1);
    this.toastr.success(`Contact ${name} successfully removed.`);
  }

  addContact(contact: IContact){
    this.contactService.addContact(contact).subscribe(
      contact => {
        this.contacts.push(contact);
        this.toastr.success(`Contact ${contact.name} successfully saved.`);
      },
      error => this.handleHttpError(error, 'Error sending contact to the server')
    );
  }

  getContactsFromService(){
    this.contactService.getContacts().subscribe(
        contacts => this.contacts = contacts,
        err => this.handleHttpError(err, 'Error getting contacts from the server')
    );
  }

  handleHttpError(error:any, title?:string) {
    console.log(title, error);
    this.toastr.error(error.message, title);
    return throwError(error);
  }
}
