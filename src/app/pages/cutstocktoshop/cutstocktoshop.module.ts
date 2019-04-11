import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CutstocktoshopPage } from './cutstocktoshop.page';

const routes: Routes = [
  {
    path: '',
    component: CutstocktoshopPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CutstocktoshopPage]
})
export class CutstocktoshopPageModule {}
