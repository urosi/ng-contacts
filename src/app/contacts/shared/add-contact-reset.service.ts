import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddContactResetService {
  private addContactResetSubject: Subject<null> = new Subject<null>();

  data:any = this.addContactResetSubject.asObservable();
  doResetAddContact(data?:any): void {
    this.addContactResetSubject.next(data);
  }
}
