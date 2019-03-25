import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2/';
import * as firebase from 'firebase';
import { AppComponent } from './app.component';
import { HaippiListComponent } from './haippi/components/haippi-list/haippi-list.component';
import { AddPersonComponent } from './haippi/components/add-person/add-person.component';
import { environment } from '../environments/environment';
import { OrderByPipe } from './haippi/pipes/orderby.pipe';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    HaippiListComponent,
    AddPersonComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'haippirinki')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
