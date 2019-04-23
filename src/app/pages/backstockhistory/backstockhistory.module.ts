import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BackstockhistoryPage } from './backstockhistory.page';

const routes: Routes = [
  {
    path: '',
    component: BackstockhistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BackstockhistoryPage]
})
export class BackstockhistoryPageModule {}
