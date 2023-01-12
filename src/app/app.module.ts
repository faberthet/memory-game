import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { StringToCardsPipe } from './pipes/string-to-cards.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    StringToCardsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StringToCardsPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
