import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { HaippiListComponent } from './haippi/components/haippi-list/haippi-list.component';
import { HaippiItemComponent } from './haippi/components/haippi-item/haippi-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HaippiListComponent,
    HaippiItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
