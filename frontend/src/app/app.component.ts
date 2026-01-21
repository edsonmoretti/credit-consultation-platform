import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, finalize } from 'rxjs/operators';

import { BuscaCreditoComponent } from './components/busca-credito/busca-credito.component';
import { ListaCreditosComponent } from './components/lista-creditos/lista-creditos.component';
import { DetalheCreditoComponent } from './components/detalhe-credito/detalhe-credito.component';
import { CreditoService } from './services/credito.service';
import { Credito } from './models/credito.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    BuscaCreditoComponent,
    ListaCreditosComponent
  ],
  template: `
    <div class="flex flex-col h-screen">
      <!-- Top Bar -->
      <mat-toolbar color="primary" class="shadow-md z-20 relative !bg-indigo-600 !text-white">
        <button mat-icon-button (click)="drawer.toggle()" class="mr-2" aria-label="Toggle menu">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="font-bold tracking-wide">Portal de Créditos</span>
        <span class="flex-auto"></span>
      </mat-toolbar>

      <mat-sidenav-container class="flex-auto bg-gray-50">
        <!-- Sidebar -->
        <mat-sidenav #drawer [mode]="(isHandset$ | async) ? 'over' : 'side'"
                     [opened]="(isHandset$ | async) === false"
                     class="w-64 shadow-lg border-r border-gray-200">
          <div class="p-6 bg-indigo-50 border-b border-indigo-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                PC
              </div>
              <div>
                <p class="font-semibold text-gray-800 text-sm">Edson Moretti do Nascimento</p>
                <p class="text-xs text-gray-500">edsonmoretti@live.com</p>
                <p class="text-xs text-gray-500">edsonmoretti@gmail.com</p>
              </div>
            </div>
          </div>

          <mat-nav-list class="pt-2">
            <a mat-list-item class="!text-indigo-600 !bg-indigo-50 border-r-4 border-indigo-600">
              <mat-icon matListItemIcon class="!text-indigo-600">receipt_long</mat-icon>
              <span matListItemTitle class="font-medium">Consulta de Créditos</span>
            </a>
            <a mat-list-item class="text-gray-600 hover:bg-gray-50">
              <mat-icon matListItemIcon class="text-gray-400">help</mat-icon>
              <span matListItemTitle>Sobre</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <!-- Main Content -->
        <mat-sidenav-content class="bg-gray-100">
          <main class="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6">

            <!-- Header Section -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
              <div>
                <h1 class="text-2xl font-bold text-gray-800">Consulta de Créditos</h1>
                <p class="text-gray-500">Gerencie e visualize seus créditos de NFS-e</p>
              </div>
              <div class="flex gap-2">
                <button mat-stroked-button color="primary">
                  <mat-icon>file_download</mat-icon> Exportar
                </button>
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

          <footer class="p-6 text-center text-gray-500 text-sm border-t border-gray-200 mt-8">
            <p>&copy; 2026 Plataforma de Consulta de Créditos. Todos os direitos reservados.</p>
          </footer>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    mat-sidenav-container {
      height: calc(100vh - 64px); /* Adjust based on toolbar height */
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  creditos: Credito[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  loading = false;
  currentSearchTerm = '';
  currentSort: string[] = [];

  isHandset$: Observable<boolean>;

  constructor(
    private creditoService: CreditoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
    }
  }

  loadData() {
    // Ensure we are running inside Angular Zone
    this.ngZone.run(() => {
      this.loading = true;
      this.creditos = []; // Clear data
      this.cdr.detectChanges(); // Force UI update to show spinner
    });

    const request$ = !this.currentSearchTerm
      ? this.creditoService.getCreditos(this.pageIndex, this.pageSize, this.currentSort)
      : this.creditoService.getCreditosByNfse(this.currentSearchTerm, this.pageIndex, this.pageSize, this.currentSort);

    request$.subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          console.log('Dados recebidos:', response); // Debug log
          this.creditos = response.content;
          this.totalElements = response.totalElements;
          this.loading = false;
          this.cdr.detectChanges(); // Force UI update to hide spinner and show data
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error('Erro na requisição:', err); // Debug log
          this.loading = false;
          this.handleError('Erro na busca');
          this.cdr.detectChanges();
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
      this.loading = true;
      this.cdr.detectChanges();
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
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            this.loading = false;
            this.snackBar.open('Erro ao carregar detalhes do crédito.', 'Fechar', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            this.cdr.detectChanges();
          });
        }
      });
  }
}
