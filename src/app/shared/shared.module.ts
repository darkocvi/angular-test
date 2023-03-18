import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { RouterModule } from "@angular/router";
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    TableComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TableComponent,
    CardComponent,
  ]
})
export class SharedModule { }
