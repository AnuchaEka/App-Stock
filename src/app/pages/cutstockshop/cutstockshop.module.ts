import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CutstockshopPage } from './cutstockshop.page';

const routes: Routes = [
  {
    path: '',
    component: CutstockshopPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CutstockshopPage]
})
export class CutstockshopPageModule {}
