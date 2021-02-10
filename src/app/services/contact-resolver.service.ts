import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactService } from './contact.service';



@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<Observable<Contact>> {

  constructor(private contactService:ContactService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
    const { id } = route.params
    return this.contactService.getById(id)
  }
}
