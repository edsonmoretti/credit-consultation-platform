import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { BuscaCreditoComponent } from '../busca-credito/busca-credito.component';
import { ListaCreditosComponent } from '../lista-creditos/lista-creditos.component';
import { DetalheCreditoComponent } from '../detalhe-credito/detalhe-credito.component';
import { CreditoService } from '../../services/credito.service';
import { Credito } from '../../models/credito.model';

@Component({
  selector: 'app-credito-consulta',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    BuscaCreditoComponent, // <-- Adicionado
    ListaCreditosComponent  // <-- Adicionado
  ],
  template: `
    <main class="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Consulta de Créditos Constituídos</h1>
          <p class="text-gray-500">Gerencie e visualize seus créditos de NFS-e</p>
        </div>
      </div>

      <!-- Search Component -->
      <app-busca-credito (buscaRealizada)="onBusca($event)"></app-busca-credito>

      <!-- Results Table -->
      <app-lista-creditos
        [creditos]="creditos"
        [totalElements]="totalElements"
        [pageSize]="pageSize"
        [pageIndex]="pageIndex"
        [loading]="loading"
        (pageChange)="onPageChange($event)"
        (sortChange)="onSortChange($event)"
        (detalheClick)="openDetalhes($event)">
      </app-lista-creditos>
    </main>
  `,
  styles: []
})
export class CreditoConsultaComponent implements OnInit {
  creditos: Credito[] = [];
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;
  loading = false;
  currentSearchTerm = '';
  currentSort: string[] = [];

  constructor(
    private creditoService: CreditoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
    }
  }

  loadData() {
    if (!this.loading) {
      this.loading = true;
      this.cdr.detectChanges();
    }

    const request$ = !this.currentSearchTerm
      ? this.creditoService.getCreditos(this.pageIndex, this.pageSize, this.currentSort)
      : this.creditoService.getCreditosByNfse(this.currentSearchTerm, this.pageIndex, this.pageSize, this.currentSort);

    request$.subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.creditos = response.content;
          this.totalElements = response.totalElements;
          this.loading = false;
          this.cdr.markForCheck();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.loading = false;
          this.handleError('Erro na busca');
          this.cdr.markForCheck();
        });
      }
    });
  }

  handleError(err: any) {
    console.error('Erro:', err);
    this.snackBar.open('Erro ao carregar dados. Tente novamente.', 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  onBusca(termo: string) {
    this.currentSearchTerm = termo;
    this.pageIndex = 0;
    this.loadData();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  onSortChange(sort: Sort) {
    if (sort.active && sort.direction) {
      this.currentSort = [`${sort.active},${sort.direction}`];
    } else {
      this.currentSort = [];
    }
    this.pageIndex = 0;
    this.loadData();
  }

  openDetalhes(credito: Credito) {
    this.ngZone.run(() => {
      if (!this.loading) {
        this.loading = true;
        this.cdr.detectChanges();
      }
    });

    this.creditoService.getCreditoByNumero(credito.numeroCredito)
      .subscribe({
        next: (detalhesCredito) => {
          this.ngZone.run(() => {
            this.loading = false;
            this.dialog.open(DetalheCreditoComponent, {
              width: '600px',
              maxWidth: '95vw',
              data: detalhesCredito
            });
            this.cdr.markForCheck();
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            this.loading = false;
            this.snackBar.open('Erro ao carregar detalhes do crédito.', 'Fechar', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            this.cdr.markForCheck();
          });
        }
      });
  }
}
