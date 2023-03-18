import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateCardComponent } from "./pages/generate-card/generate-card.component";

const routes: Routes = [
  {
    path: '',
    component: GenerateCardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
