import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { HaippiListComponent } from './haippi/components/haippi-list/haippi-list.component';
import { AddPersonComponent } from './haippi/components/add-person/add-person.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HaippiListComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'haippirinki'),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
