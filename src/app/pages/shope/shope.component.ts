import { ProductsService } from '../../core/services/product/products.service';
import { Component, OnInit, Query } from '@angular/core';
import { product } from './../../core/interfaces/iproduct';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-shope',
  imports: [CommonModule, ProductListComponent, FormsModule],
  templateUrl: './shope.component.html',
  styleUrl: './shope.component.scss',
})
export class ShopeComponent implements OnInit {
  allProducts: product[] = [];
  filteredProducts: product[] = [];
  pageTilte: string = 'All Products';
  searchQuery: string = '';
  noResults = false;

  constructor(
    private protectService: ProductsService,
    private flowbiteService: FlowbiteService
  ) {}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.protectService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.filteredProducts = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  sortOrder: 'asc' | 'desc' = 'asc';

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.filteredProducts.sort((a, b) =>
      this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
  }

  sortProducts(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const criteria = selectElement.value;
    switch (criteria) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
  }

  filterByCategory(category: string): void {
    if (!category) {
      this.filteredProducts = this.allProducts;
      this.pageTilte = 'All Products';
    } else {
      this.protectService.getByCategory(category).subscribe({
        next: (data) => {
          this.filteredProducts = data;
          this.pageTilte = category;
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        },
      });
    }
  }

  filterProductsByName(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.filteredProducts = this.allProducts;
      return;
    }
    this.filteredProducts = this.allProducts.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    this.noResults = this.filteredProducts.length === 0;
  }
}
