import { Component, OnInit, Input, Output } from '@angular/core';
import { IContact, Gender } from './shared/contact.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})

export class ListContactsComponent implements OnInit {
  @Input() contacts: IContact[];
  @Output() removeContact: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  getContactInfo(email: string, phone: string) {
    if ((!email || email.trim().length === 0) &&
        (!phone || phone.trim().length !== 0)) {
      return 'no contact information';
    }

    let output = '';
    if (email !== undefined && email.trim() !== '') {
       output += email;
    }

    if (phone !== undefined && phone.trim() !== '') {
      if (output !== '') {
        output += ' | ';
      }

      output += phone;
    }

    return output;
  }

  isGenderMale(gender: Gender) {
    return gender === Gender.Male;
  }

  onRemoveContact(name: string) {
    this.removeContact.emit(name);
  }

}
