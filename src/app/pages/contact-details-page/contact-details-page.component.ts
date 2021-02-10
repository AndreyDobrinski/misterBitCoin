import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
})
export class ContactDetailsPageComponent implements OnInit {
  // @Input() contactId: string;
  contact: Contact;
  amount:number

  constructor(private contactService: ContactService, private route: ActivatedRoute , private userServise : UserService , private router:Router) {}

  ngOnInit() {
    this.contact = this.route.snapshot.data.contact
    // console.log(this.contact);
    

    // this.contactService.getContactById(this.contactId).subscribe((contact)=>{
    //   this.contact = contact
    // })
    // this.contactService.getById(this.contactId).subscribe((contact) => {
    //   this.contact = contact;
    // });
  }

  onTransfer(){
    if(!this.amount)return
    this.userServise.addMove(this.contact,this.amount)
    this.router.navigateByUrl('/')
  }
}
