import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfrimstockPage } from './confrimstock.page';

const routes: Routes = [
  {
    path: '',
    component: ConfrimstockPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfrimstockPage]
})
export class ConfrimstockPageModule {}
