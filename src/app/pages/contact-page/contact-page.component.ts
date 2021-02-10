import { Component, OnInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';


@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  constructor(private contactService: ContactService,private router: Router) {}

  contacts: Contact[] = [];
  subscription: Subscription;
  bitCoin:''
 

  ngOnInit(): void {
    this.subscription = this.contactService.contacts$.subscribe((contacts) => {
      this.contacts = contacts;
    });

    // console.log(this.contactService.queryForBitcoin());
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
