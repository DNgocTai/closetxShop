import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';

import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products.component';
import { FilterPipe } from './pipe/filter.pipe';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProductComponent } from './product/product.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VndPipe } from 'src/app/pipes/vnd.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: AllProductsComponent,
      },
      {
        path: ':id',
        component: ProductDetailsComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    FilterPipe,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
    PipesModule,
  ],
})
export class ProductsModule {}
