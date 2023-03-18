import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { GenerateCardComponent } from './pages/generate-card/generate-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GenerateCardComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    SharedModule,
  ]
})
export class CardModule { }
