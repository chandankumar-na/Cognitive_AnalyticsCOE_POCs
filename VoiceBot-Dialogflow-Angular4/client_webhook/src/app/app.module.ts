import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app.component';
import {APP_ROUTES} from './app.routing';

import { HomeService } from './components/home/home.service';
import { DatePipe } from '@angular/common';
import {HttpModule} from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth-guard';
import { ChartsModule } from 'ng2-charts';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    FormsModule,
    FusionChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [AuthGuard,DatePipe,HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
