import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { HaippiService } from '../../services/haippi.service';

@Component({
  selector: '[app-haippi-item]',
  templateUrl: './haippi-item.component.html',
  styleUrls: ['./haippi-item.component.scss']
})
export class HaippiItemComponent implements OnInit {

  @Input()
  person: haippi.Person;

  @Input()
  index: number;

  ticketAmount: number = 0;

  constructor(private haippiService: HaippiService) { 
  }

  ngOnInit() {
  }

  redeem() {
    if ( this.ticketAmount > 0 ) {
      this.take();
    } else {
      this.skip();
    }
  }

  skip() {
    this.ticketAmount++;
    if ( this.ticketAmount > 4 ) {
      this.ticketAmount = 4;
    }
    this.haippiService.redeemTickets(this.haippiService.getPerson(this.person.name), 0);
  }

  take() {
    this.haippiService.redeemTickets(this.haippiService.getPerson(this.person.name), this.ticketAmount);
    this.ticketAmount = 1;
  }

  return() {
    this.haippiService.returnTickets(this.haippiService.getPerson(this.person.name));
  }
}
