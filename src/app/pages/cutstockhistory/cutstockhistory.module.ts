import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CutstockhistoryPage } from './cutstockhistory.page';

const routes: Routes = [
  {
    path: '',
    component: CutstockhistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CutstockhistoryPage]
})
export class CutstockhistoryPageModule {}
