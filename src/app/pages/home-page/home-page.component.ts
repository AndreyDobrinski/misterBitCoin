import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';
// import { Subscription } from 'rxjs'
import { Router } from '@angular/router';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private userService: UserService, private bitcoinService: BitcoinService , private router:Router) { }
  user: User
  // userRate: any
  // subscription: Subscription
  rate: number
  rateFloor:number
  rateForDisplay:string

  ngOnInit(): void {
    // this.user = this.userService.getUser()
    this.getUser()
    this.getRate()
    // this.currRate()
  }
  
  // currRate() {
  //   this.subscription = this.bitcoinService
  //   .getRate(this.user.coins).subscribe(rate => {
  //     this.userRate = rate
  //   })
  // }


  async getRate(){
    this.rate = 1 / (await this.bitcoinService.getRate())
    this.rateFloor = Math.floor(this.rate)
    this.rateForDisplay = (Math.round(this.rate *100) / 100).toFixed(2)
  }

  async getUser(){
    try{
      this.user = await this.userService.getUser()
    }catch(err){
      this.router.navigateByUrl('/signup')
    }
  }


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

}
