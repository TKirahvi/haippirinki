import { Component, OnInit } from '@angular/core';
import { HaippiService } from '../../services/haippi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-haippi-list',
  templateUrl: './haippi-list.component.html',
  styleUrls: ['./haippi-list.component.scss']
})
export class HaippiListComponent implements OnInit {

  haippiList: Observable<haippi.Person[]>;
  available: Observable<number>;
  ticketAmount: number = 0;
  totalTickets: number = 4;

  constructor(private haippiService: HaippiService) { 
    this.haippiList = this.haippiService.haippiList$;
    this.available = this.haippiService.availableTickets$;
    this.totalTickets = this.haippiService.getMaxTickets();
  }

  ngOnInit() {
  }
  
  redeem(person: haippi.Person) {
    if ( this.ticketAmount > 0 ) {
      this.take(person);
    } else {
      this.skip(person);
    }
  }

  skip(person: haippi.Person) {
    this.haippiService.redeemTickets(this.haippiService.getPerson(person.name), 0);
  }

  take(person: haippi.Person) {
    if ( this.haippiService.areEnoughTicketsAvailable(this.ticketAmount)) {
      if ( this.ticketAmount > person.eligibleFor ) {
        if ( confirm("Oletko varma, että haluat varata useamman kuin henkilö on oikeutettu?") ) {
          this.takeTickets(person);
        }
      } else {
        this.takeTickets(person);
      }
    } else {
      alert("Ei tarpeeksi lippuja vapaana (yritit varata: " + this.ticketAmount + "), vapauta ennen uusiokäyttöä");
    }
  }

  private takeTickets(person: haippi.Person) {    
    this.haippiService.redeemTickets(this.haippiService.getPerson(person.name), this.ticketAmount);
    this.ticketAmount = this.haippiService.getFirstPersonEligibleAmount();
  }

  return(person: haippi.Person) {
    this.haippiService.returnTickets(this.haippiService.getPerson(person.name));
  }
}
