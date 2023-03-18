import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./layouts/main/main.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: MainComponent,
    loadChildren: () => import('../modules/posts/posts.module').then(m => m.TableViewModule),
  },
  {
    path: 'card',
    component: MainComponent,
    loadChildren: () => import('../modules/card/card.module').then(m => m.CardModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
