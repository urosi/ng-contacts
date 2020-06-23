import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Gender } from './shared/contact.model'
import { IContact } from './shared/contact.model'
import { ContactService } from './shared/contact.service';
import { EventEmitter } from '@angular/core';
import { nameExistsAsyncValidator } from './shared/name-exists-async.validator';
import { emailExistsAsyncValidator } from './shared/email-exists-async.validator';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styles: [`
    button {width:100px;}
    em { float:right; color:#e05c65; padding-left: 10px; }
    .text-muted { font-size: 12px; }
    .form-group > label { margin-bottom: 5px;}
  `]
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  gender = Gender;
  nameExits:boolean;
  submitted: boolean = false;

  @Output() addContact: EventEmitter<IContact> = new EventEmitter<IContact>();

  constructor(private fb: FormBuilder,
    private contactService: ContactService) {
    this.initContactForm();
  }


  ngOnInit(): void {
    console.log('enum value: ' + Gender.Female);
    console.log(this.contactForm.value);
  }

  onSave() {
    this.submitted = true;
    this.nameExits = false;

    if (this.contactForm.invalid){
      console.log('form invalid');
      return;
    }

    let contact: IContact = {
       name: this.contactForm.controls.name.value,
       gender: this.contactForm.controls.gender.value as Gender,
       email: this.contactForm.controls.email.value,
       phone: this.contactForm.controls.phone.value,
    }

    this.addContact.emit(contact);

    // reset form back to the original;
    this.initContactForm();
  }

  onCancel() {
    this.initContactForm();
  }

  initContactForm() {
    this.submitted = false;
    this.contactForm = this.fb.group({
      name: ['', Validators.required, nameExistsAsyncValidator(this.contactService) ],
      gender: [Gender.Male, Validators.required],
      email: ['', Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5})$"),
                  emailExistsAsyncValidator(this.contactService)],
      phone: ['']
    });
  }
}
