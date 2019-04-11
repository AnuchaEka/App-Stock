import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BacktoshopPage } from './backtoshop.page';

const routes: Routes = [
  {
    path: '',
    component: BacktoshopPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BacktoshopPage]
})
export class BacktoshopPageModule {}
