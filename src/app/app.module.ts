import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HaippiListComponent } from './haippi/components/haippi-list/haippi-list.component';
import { AddPersonComponent } from './haippi/components/add-person/add-person.component';

@NgModule({
  declarations: [
    AppComponent,
    HaippiListComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
