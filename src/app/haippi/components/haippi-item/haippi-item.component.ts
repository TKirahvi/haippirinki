import { Component, OnInit, Input } from '@angular/core';
import { HaippiService } from '../../services/haippi.service';

@Component({
  selector: 'app-haippi-item',
  templateUrl: './haippi-item.component.html',
  styleUrls: ['./haippi-item.component.scss']
})
export class HaippiItemComponent implements OnInit {

  @Input()
  person: haippi.Person;

  ticketAmount: number = 0;

  constructor(private haippiService: HaippiService) { 
  }

  ngOnInit() {
  }

  changeTicketAmount(event) { 
    this.ticketAmount = parseInt(event.data);
  }

  redeem() {
    // Ticketamount is 0 at the beginning if no change is made
    if ( this.ticketAmount > 0 ) {
      this.take();
    } else {
      this.skip();
    }
  }

  skip() {
    this.haippiService.redeemTickets(this.haippiService.getPerson(this.person.name), 0);
  }

  take() {
    this.haippiService.redeemTickets(this.haippiService.getPerson(this.person.name), this.ticketAmount);
  }

  return() {
    this.haippiService.returnTickets(this.haippiService.getPerson(this.person.name));
  }
}
