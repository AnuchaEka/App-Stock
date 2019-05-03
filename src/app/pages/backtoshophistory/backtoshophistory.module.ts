import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BacktoshophistoryPage } from './backtoshophistory.page';

const routes: Routes = [
  {
    path: '',
    component: BacktoshophistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BacktoshophistoryPage]
})
export class BacktoshophistoryPageModule {}
