import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PoemListComponent } from './poem-list/poem-list.component';

@NgModule({
  declarations: [AppComponent, PoemListComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
