import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
      this.haippiList.next(data);
      console.log(this.countUsedTickets());
    });
  }

  private countUsedTickets(): number {
    return this.haippiList.value.reduce((prev: number, curr: haippi.Person) => prev + curr.tickets, 0);
  }

  redeemTickets(person: haippi.Person, tickets: number) {
    console.log(person.name + " takes " + tickets);
    if ( tickets > 0 ) {
      person.tickets = tickets;
      person.eligibleFor = 1;
      this.availableTickets.next(this.availableTickets.value - tickets);
      // if tickets > available => FAIL
    } else {
      person.eligibleFor++;
      person.tickets = 0;
    }

    const localList = this.haippiList.value;
    
    localList.shift();
    localList.push(person);
    this.availableTickets.next(this.countUsedTickets());
    this.haippiList.next(localList);
    this.backup();
  }

  returnTickets(person: haippi.Person) {
    this.availableTickets.next(this.availableTickets.value + person.tickets);
    // if availableTickets > 4 => FAIL
    person.tickets = 0;
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
    const foo = JSON.stringify(this.haippiList.value);
    console.log(foo);
  }
}
