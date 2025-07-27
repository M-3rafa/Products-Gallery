import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { product } from '../../core/interfaces/iproduct';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-detalils',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalils.component.html',
  styleUrl: './detalils.component.scss',
})
export class DetalilsComponent implements OnInit {
  productId: any;
  product: product | null = null;

  constructor(
    private protectedService: ProductsService,
    private activateRoute: ActivatedRoute,
    private flowbiteService: FlowbiteService
  ) {}
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe({
      next: (res) => {
        this.flowbiteService.loadFlowbite((flowbite) => {
          initFlowbite();
        });
        this.productId = res.get('id');
        this.protectedService.getById(this.productId).subscribe({
          next: (data) => {
            this.product = data;
            console.log(this.product);
          },
          error: (err) => {
            console.log('Error loading product:', err);
          },
        });
      },
    });
  }
  getStars(): string[] {
    const rate = this.product?.rating?.rate ?? 0;
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    return [
      ...Array(full).fill('full'),
      ...Array(half).fill('half'),
      ...Array(empty).fill('empty'),
    ];
  }
}
