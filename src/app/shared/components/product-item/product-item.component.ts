import { RouterLink } from '@angular/router';
import { product } from './../../../core/interfaces/iproduct';
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  item = input<product>();

  getStars(): string[] {
    const rate = this.item()?.rating?.rate ?? 0;
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
