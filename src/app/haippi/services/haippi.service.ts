import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class HaippiService {

  private currentJson = '/assets/current.json';
  private MAX_TICKETS: number = 4;

  private haippiList: BehaviorSubject<haippi.Person[]> = new BehaviorSubject([]);
  haippiList$: Observable<haippi.Person[]> = this.haippiList.asObservable();

  private availableTickets: BehaviorSubject<number> = new BehaviorSubject(this.MAX_TICKETS);
  availableTickets$: Observable<number> = this.availableTickets.asObservable();

  constructor(private http: HttpClient) { 
    this.populateHaippiList();
  }

  public populateHaippiList() {
    this.http.get<haippi.Person[]>(this.currentJson).toPromise().then(data => {
      data.sort(this.sortHaippiList);
      this.haippiList.next(data);
      this.availableTickets.next(this.MAX_TICKETS - this.countUsedTickets());
    });
  }

  private sortHaippiList(a: haippi.Person, b: haippi.Person) {
    if (a.order < b.order)
      return -1;
    if (a.order > b.order)
      return 1;
    return 0;
  }

  private countUsedTickets(): number {
    return this.haippiList.value.reduce((prev: number, curr: haippi.Person) => prev + +curr.tickets, 0);
  }

  redeemTickets(person: haippi.Person, tickets: number) {
    if ( this.areEnoughTicketsAvailable(+tickets)) {
      console.log(person.name + " takes " + tickets);
      if ( tickets > 0 ) {
        person.tickets = tickets;
        person.eligibleFor = 1;
        this.availableTickets.next(this.availableTickets.value - tickets);
      } else {
        person.eligibleFor++;
        if ( person.eligibleFor > 4 ) {
          person.eligibleFor = 4;
        }
        person.tickets = 0;
      }
      
      console.log(person.name + " is eligible for " + person.eligibleFor + " tickets");

      const localList = this.haippiList.value;
      
      localList.shift();
      localList.push(person);
      this.availableTickets.next(this.MAX_TICKETS - this.countUsedTickets());
      this.haippiList.next(localList);
      this.backup();
    } else {
      alert("Ei tarpeeksi lippuja vapaana, vapauta ennen uusintakäyttöä");
    }
  }

  private areEnoughTicketsAvailable(tickets: number): boolean {
    return tickets <= this.availableTickets.value;
  }

  returnTickets(person: haippi.Person) {
    console.log(person.name + " returns " + person.tickets + " tickets");
    this.availableTickets.next(this.availableTickets.value + +person.tickets);
    person.tickets = 0;
    //this.haippiList.value[this.haippiList.value.findIndex(p => p.name === person.name)] = person;
  }

  getPerson(name: string): haippi.Person {
    return this.haippiList.value.find(p => p.name === name);
  }

  private backup() {
    this.updateOrders();
    this.saveToJson();
  }

  private updateOrders() {
    const localList = this.haippiList.value;
    for ( let i = 0; i < localList.length; i++ ) {
      const person: haippi.Person = localList[i];
      person.order = i;
    }
    this.haippiList.next(localList);
  }
  private saveToJson() {
    const blob = new Blob([JSON.stringify(this.haippiList.value)], {type : 'application/json'});
    //saveAs(blob, '/assets/current.json');
  }
}
