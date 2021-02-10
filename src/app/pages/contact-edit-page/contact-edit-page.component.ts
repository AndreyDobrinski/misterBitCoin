import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit-page',
  templateUrl: './contact-edit-page.component.html',
  styleUrls: ['./contact-edit-page.component.scss']
})
export class ContactEditPageComponent implements OnInit {

  subscribtion: Subscription
  contact: Contact
  msg: string = ''

  constructor(private route: ActivatedRoute, private contactServise:ContactService, private router:Router) { }

  ngOnInit(): void {
    this.subscribtion = this.route.data.subscribe(data =>{
      this.contact = data.contact || {name: '' , email: '' , phone: ''}
    })
  }

  onSubmitForm(formValue){
    if(!formValue.name || !formValue.email || !formValue.phone){
      this.msg = 'All inputs are required'
      return
    }
    this.contactServise.save({...this.contact})
    this.msg = 'Saved Succesfully'
    setTimeout(()=>{
      this.router.navigateByUrl('/contacts')
      this.msg = ''
    },1500)
  }


  onDeleteContact(){
    this.contactServise.remove(this.contact._id)
    this.msg = 'Deleted Succesfully'
    setTimeout(()=>{
      this.router.navigateByUrl('/contacts')
      this.msg = ''
    },1500)
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe()
  }

}
