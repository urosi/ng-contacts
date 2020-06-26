import { Component, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gender } from './shared/contact.model';
import { IContact } from './shared/contact.model';
import { ContactService } from './shared/contact.service';
import { EventEmitter } from '@angular/core';
import { nameExistsAsyncValidator } from './shared/name-exists-async.validator';
import { emailExistsAsyncValidator } from './shared/email-exists-async.validator';
import { AddContactResetService } from './shared/add-contact-reset.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})

export class AddContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  gender = Gender;
  nameExits: boolean;
  submitted = false;
  private subscription: Subscription;

  @Output() addContact: EventEmitter<IContact> = new EventEmitter<IContact>();

  constructor(private fb: FormBuilder,
              private contactService: ContactService,
              private addContactResetService: AddContactResetService) {
    this.initContactForm();
  }

  onSave() {
    this.submitted = true;
    this.nameExits = false;

    if (this.contactForm.invalid){
      return;
    }

    const contact: IContact = {
       name: this.contactForm.controls.name.value,
       gender: this.contactForm.controls.gender.value as Gender,
       email: this.contactForm.controls.email.value,
       phone: this.contactForm.controls.phone.value,
    };

    this.addContact.emit(contact);
  }

  onCancel() {
    this.initContactForm();
  }

  initContactForm() {
    this.submitted = false;
    this.contactForm = this.fb.group({
      name: ['', Validators.required, nameExistsAsyncValidator(this.contactService) ],
      gender: [Gender.Male, Validators.required],
      email: ['', Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5})$'),
                  emailExistsAsyncValidator(this.contactService)],
      phone: ['']
    });
  }

  ngOnInit() {
    this.subscription = this.addContactResetService.data.subscribe(
      (data) => this.initContactForm()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
