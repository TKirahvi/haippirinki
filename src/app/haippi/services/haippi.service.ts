import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import * as firebase from 'firebase';

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

  private usersCollection: CollectionReference;

  constructor(private http: HttpClient) { 
    this.usersCollection = firebase.firestore().collection('users');    
    this.populateHaippiList();
  }

  populateHaippiList() {
    this.usersCollection.onSnapshot((qSnap) => {
      qSnap.forEach(q => {
        let d = q.data();
        console.log(q.id, d.name);
      });
    });

    this.http.get<haippi.Person[]>(this.currentJson).toPromise().then(data => {
      data.sort(this.sortHaippiList);
      this.haippiList.next(data);
      this.availableTickets.next(this.MAX_TICKETS - this.countUsedTickets());
    });
  }

  getMaxTickets(): number {
    return this.MAX_TICKETS; 
  }

  getFirstPersonEligibleAmount(): number {
    return this.haippiList.value[0].eligibleFor;
  }

  private sortHaippiList(a: haippi.Person, b: haippi.Person) {
    if (a.order < b.order)
      return -1;
    if (a.order > b.order)
      return 1;
    return 0;
  }

  addPerson(personName: string) {
    let newPerson: haippi.Person = {
      name: personName, 
      holding: 0, 
      eligibleFor: 1,
      order: this.haippiList.value.length
    }
    this.haippiList.value.push(newPerson);

    /*this.afs.collection('users').add({
      name: personName,
      holding: 0, 
      eligibleFor: 1,
      order: this.haippiList.value.length
    });*/
  }

  private countUsedTickets(): number {
    return this.haippiList.value.reduce((prev: number, curr: haippi.Person) => prev + +curr.holding, 0);
  }

  redeemTickets(person: haippi.Person, tickets: number) {
    console.log(person.name + " takes " + tickets);
    if ( tickets > 0 ) {
      person.holding = tickets;
      person.eligibleFor = 1;
      this.availableTickets.next(this.availableTickets.value - tickets);
    } else {
      person.eligibleFor++;
      if ( person.eligibleFor > 4 ) {
        person.eligibleFor = 4;
      }
      person.holding = 0;
    }
    
    console.log(person.name + " is eligible for " + person.eligibleFor + " tickets");

    const localList = this.haippiList.value;
    
    this.haippiList.value.shift();
    this.haippiList.value.push(person);
    this.availableTickets.next(this.MAX_TICKETS - this.countUsedTickets());
    this.backup();
    
  }

  public areEnoughTicketsAvailable(tickets: number): boolean {
    return tickets <= this.availableTickets.value;
  }

  returnTickets(person: haippi.Person) {
    console.log(person.name + " returns " + person.holding + " tickets");
    this.availableTickets.next(this.availableTickets.value + +person.holding);
    person.holding = 0;
    //this.haippiList.value[this.haippiList.value.findIndex(p => p.name === person.name)] = person;
  }

  getPerson(name: string): haippi.Person {
    return this.haippiList.value.find(p => p.name === name);
  }

  private backup() {
    this.updateOrders();
  }

  private updateOrders() {
    const localList = this.haippiList.value;
    for ( let i = 0; i < localList.length; i++ ) {
      const person: haippi.Person = localList[i];
      person.order = i;
    }
    this.haippiList.next(localList);
  }
}
