import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { ReactiveFormsModule } from "@angular/forms";

import { HomePageRoutingModule } from './home-routing.module';
import { WonlooseComponent } from '../wonloose/wonloose.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    OrderModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [HomePage,WonlooseComponent],
  entryComponents: [WonlooseComponent]
})
export class HomePageModule {}
