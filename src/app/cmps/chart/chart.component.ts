import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  ChartErrorEvent,
  ChartMouseLeaveEvent,
  ChartMouseOverEvent,
  ChartSelectionChangedEvent,
  ChartType,
  Column,
  GoogleChartComponent
} from 'angular-google-charts';
import { Subscription } from 'rxjs';
import { BitcoinService } from '../../services/bitcoin.service';


@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public charts: {
    title: string;
    type: ChartType;
    data: any[][];
    columns?: Column[];
    options?: {};
  }[] = [];

  subscription: Subscription
  marketPrice: any = []

  @ViewChild('chart', { static: true })
  public chart!: GoogleChartComponent;

  constructor(private router: Router, private bitcoinService: BitcoinService) { }

  public onError(error: ChartErrorEvent) {
    console.error('Error: ' + error.message.toString());
  }

  public onSelect(event: ChartSelectionChangedEvent) {
    console.log('Selected: ' + event.toString());
  }

  public onMouseEnter(event: ChartMouseOverEvent) {
    console.log('Hovering ' + event.toString());
  }

  public onMouseLeave(event: ChartMouseLeaveEvent) {
    console.log('No longer hovering ' + event.toString());
  }

  ngOnInit() {
    this.subscription = this.bitcoinService.getMarketPrice().subscribe(res => {
      this.charts.push({
        title: 'Styled Line Chart',
        type: ChartType.ColumnChart,
        columns: [
          'Month',
          'Price'
        ],
        data: res
      });
    })
  }

  public navigateToTest() {
    this.router.navigateByUrl('/test');
  }

}
