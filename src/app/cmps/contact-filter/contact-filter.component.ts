import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {
  @Output() onFilter = new EventEmitter()

  constructor(private contactService:ContactService) { }

  filterBy={term:'' }
  subscription: Subscription

  onSetFilter(){
    // this.contactService.loadContacts(this.filterBy)
    this.contactService.setFilter(this.filterBy)
  }

  ngOnInit(): void {
    this.subscription = this.contactService.filterBy$.subscribe(filterBy =>{
      this.filterBy = filterBy
      // console.log(filterBy);
    })
  }

}
