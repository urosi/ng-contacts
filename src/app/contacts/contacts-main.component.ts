import { Component, OnInit } from '@angular/core'
import { ContactService } from './shared/contact.service';
import { IContact } from './shared/contact.model';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts-main',
  templateUrl: './contacts-main.component.html',
  styleUrls: [
    './contacts-main.component.css'
  ]
})

export class ContactsMainComponent implements OnInit {
  contacts: IContact[];

  constructor(private contactService: ContactService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getContactsFromServiceSorted();
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
      error => this.handleHttpError(error)
    );
  }

  getContactsFromServiceSorted(){
    this.contactService.getContacts().subscribe({
        next: contacts => this.contacts = contacts,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      }
    );
  }

  handleHttpError(error:any) {
    console.log("Error in handleHttpError.", error);
    this.toastr.error(error.message);
    return throwError(error);
  }
}
