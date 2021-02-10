import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, reduce } from 'rxjs/operators'
import * as moment from 'moment'
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) { }

  // public getRate(coins: number) {
  //   return this.http.get<{ value: number }>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
  // }

  async getRate(){
    var BTCRate = JSON.parse(localStorage.getItem('BTCRate'))
    if (!BTCRate || (BTCRate.createdAt > Date.now() + 10000000)){
      const res  = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
      BTCRate = {rate: res.data, createdAt: Date.now()}
      localStorage.setItem('BTCRate', JSON.stringify(BTCRate))
    }
    return BTCRate.rate
  }



  public getMarketPrice() {
    let monthMap = {}
    let data: any[] = []
    return this.http.get<{ values: any[] }>(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`).pipe(map
      (res => {
        monthMap = res.values.reduce((acc, curr) => {
          let month = moment(+`${curr.x}000`).format('MMM')

          acc[month] = acc[month] ?
            { total: acc[month].total + curr.y, count: acc[month].count + 1 } : { total: curr.y, count: 1 };
          return acc;

        }, {})

        Object.keys(monthMap).map(month => {
          let avg = Math.floor(monthMap[month].total / monthMap[month].count)
          let currMonth = [month, avg]
          data = [...data, currMonth]
        })

        console.log(data);

        return data

      }))


  }




  public getConfirmedTransactions() {
    return this.http.get<{ values: any }>(`https://api.blockchain.info/charts/n-transactions?timespan=5months&format=json&cors=true`).pipe(map(res => res.values))

  }

}
