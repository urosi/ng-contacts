import { FormControl } from '@angular/forms';
import { ContactService} from './contact.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export function emailExistsAsyncValidator(contactService: ContactService) {
  return (c: FormControl) => {
    if (!c.value || String(c).length === 0) {
      return of(null);
    }

    return contactService.findContactByEmail(c.value)
      .pipe(
        map((contacts: any) => {
          return contacts.length === 0 ? null : { emailExists: true };
        })
      );
  };
}
