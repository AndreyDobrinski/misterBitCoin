import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/model/move.model';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {

  @Input() moves:Move[]

  constructor() { }

  ngOnInit(): void {
  }

}
