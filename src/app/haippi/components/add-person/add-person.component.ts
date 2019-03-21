import { Component, OnInit } from '@angular/core';
import { HaippiService } from '../../services/haippi.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

  name: string = '';

  constructor(private haippiService: HaippiService) { }

  ngOnInit() {
  }

  addPerson() {
    this.haippiService.addPerson(this.name);
    this.name = '';
  }
}
