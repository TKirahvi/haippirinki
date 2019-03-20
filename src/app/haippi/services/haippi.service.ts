import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaippiService {

  private currentJson = '/assets/current.json';
  private MAX_TICKETS: number = 4;

  private haippiList: haippi.Person[];

  private availableTickets: BehaviorSubject<number> = new BehaviorSubject(this.MAX_TICKETS);
  availableTickets$: Observable<number> = this.availableTickets.asObservable();

  constructor(private http: HttpClient) { 
  }

  public populateHaippiList(): Promise<haippi.Person[]> {
    return this.http.get<haippi.Person[]>(this.currentJson).toPromise().then(data => {
      this.haippiList = data;
      console.log(this.countUsedTickets());
      //this.availableTickets.next(this.countUsedTickets());
      return this.haippiList;
    });
  }

  private countUsedTickets(): number {
    return this.haippiList.reduce((prev: number, curr: haippi.Person) => prev + curr.tickets, 0);
  }

  getHaippi(): haippi.Person[] {
    return this.haippiList;
  }

  redeemTickets(person: haippi.Person, tickets: number) {
    if ( tickets > 0 ) {
      person.tickets = tickets;
      person.eligibleFor = 1;
      this.availableTickets.next(this.availableTickets.value - tickets);
      // if tickets > available => FAIL
    } else {
      person.eligibleFor++;
      person.tickets = 0;
    }

    this.haippiList.pop();
    this.haippiList.push(person);
    this.availableTickets.next(this.countUsedTickets());
    this.backup();
  }

  returnTickets(person: haippi.Person) {
    this.availableTickets.next(this.availableTickets.value + person.tickets);
    // if availableTickets > 4 => FAIL
    person.tickets = 0;
  }

  getPerson(name: string): haippi.Person {
    return this.haippiList.find(p => p.name === name);
  }

  private backup() {
    this.updateOrders();
    this.saveToJson();
  }

  private updateOrders() {
    for ( let i = 0; i < this.haippiList.length; i++ ) {
      const person: haippi.Person = this.haippiList[i];
      person.order = i;
    }
  }
  private saveToJson() {
    const foo = JSON.stringify(this.haippiList);
    console.log(foo);
  }
}
