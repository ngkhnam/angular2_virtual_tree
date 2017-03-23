import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { VirtualTreeModule } from '../../src/virtual-tree/virtual-tree.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    VirtualTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
