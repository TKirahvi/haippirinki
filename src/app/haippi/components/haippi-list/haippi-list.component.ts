import { Component, OnInit } from '@angular/core';
import { HaippiService } from '../../services/haippi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-haippi-list',
  templateUrl: './haippi-list.component.html',
  styleUrls: ['./haippi-list.component.scss']
})
export class HaippiListComponent implements OnInit {

  //haippiList: Observable<haippi.Person[]>;
  haippiList: haippi.Person[];
  available: Observable<number>;

  constructor(private haippiService: HaippiService) { 
    this.haippiService.haippiList$.subscribe(data => {
      console.log(data);
      this.haippiList = data;
    });
    //this.haippiList = this.haippiService.haippiList$;

    this.available = this.haippiService.availableTickets$;
    /*this.haippiService.availableTickets$.subscribe(availableTickets => {
      //this.available = availableTickets;
      console.log(availableTickets + " tickets available")
    });*/
  }

  ngOnInit() {
  }
}
