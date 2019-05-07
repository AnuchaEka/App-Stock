import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StocklostPage } from './stocklost.page';

const routes: Routes = [
  {
    path: '',
    component: StocklostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StocklostPage],
  entryComponents: [StocklostPage]
})
export class StocklostPageModule {}
