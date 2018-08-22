import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { EislTier2ContainerComponent } from './components/eisl-tier2-container/eisl-tier2-container.component';
import { ScheduleComponent } from './components/eisl-tier2-container/schedule/schedule.component';
import { MemberQueryHomeComponent } from './components/eisl-tier2-container/member-query-home/member-query-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EislTier2ContainerComponent,
    ScheduleComponent,
    MemberQueryHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
