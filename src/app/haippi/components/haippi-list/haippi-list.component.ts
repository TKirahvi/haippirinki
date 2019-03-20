import { Component, OnInit } from '@angular/core';
import { HaippiService } from '../../services/haippi.service';

@Component({
  selector: 'app-haippi-list',
  templateUrl: './haippi-list.component.html',
  styleUrls: ['./haippi-list.component.scss']
})
export class HaippiListComponent implements OnInit {

  haippiList: haippi.Person[];
  available: number;

  constructor(private haippiService: HaippiService) { 
    this.haippiService.haippiList$.subscribe(data => {
      this.haippiList = data;
    });

    this.haippiService.availableTickets$.subscribe(availableTickets => {
      this.available = availableTickets;
      console.log(availableTickets + " tickets available")
    });
  }

  ngOnInit() {
  }
}
