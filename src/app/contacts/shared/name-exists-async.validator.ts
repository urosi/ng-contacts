import { FormControl } from '@angular/forms';
import { ContactService} from './contact.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export function nameExistsAsyncValidator(contactService: ContactService) {
  return (c: FormControl) => {
    if (!c.value || String(c).length === 0) {
      return of(null);
    }

    return contactService.findContactByName(c.value)
      .pipe(
        map((contacts: any) => {
          return contacts.length === 0 ? null : { nameExists: true };
        })
      );
  };
}
