import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Credito } from '../../models/credito.model';

@Component({
  selector: 'app-lista-creditos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  template: `
    <div class="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
      @if (loading) {
        <div class="absolute inset-0 bg-white/80 z-20 flex flex-col gap-3 justify-center items-center backdrop-blur-sm">
          <mat-spinner diameter="48" strokeWidth="4"></mat-spinner>
          <span class="text-gray-500 font-medium animate-pulse">Carregando dados...</span>
        </div>
      }

      <!-- Desktop View (Table) -->
      <div class="hidden md:block overflow-x-auto">
        <table mat-table [dataSource]="dataSource" matSort (matSortChange)="onSortChange($event)" class="w-full">

          <!-- Numero Credito Column -->
          <ng-container matColumnDef="numeroCredito">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider !px-6 !py-4 text-left border-b border-gray-200"> Nº Crédito </th>
            <td mat-cell *matCellDef="let element" class="!px-6 !py-4 text-gray-700 font-medium">
              <div class="flex items-center gap-2">
                <span class="bg-indigo-50 text-indigo-700 py-1 px-2 rounded text-xs font-bold border border-indigo-100">{{element.numeroCredito}}</span>
              </div>
            </td>
          </ng-container>

          <!-- Numero NFSe Column -->
          <ng-container matColumnDef="numeroNfse">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider !px-6 !py-4 text-left border-b border-gray-200"> NFS-e </th>
            <td mat-cell *matCellDef="let element" class="!px-6 !py-4 text-gray-600"> {{element.numeroNfse}} </td>
          </ng-container>

          <!-- Valor Credito Column -->
          <ng-container matColumnDef="valorCredito">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider !px-6 !py-4 text-left border-b border-gray-200"> Valor Crédito </th>
            <td mat-cell *matCellDef="let element" class="!px-6 !py-4">
              <span class="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                {{ (element.valorCredito !== null ? element.valorCredito : element.valorIssqn) | currency:'BRL':'symbol':'1.2-2' }}
              </span>
            </td>
          </ng-container>

          <!-- Valor Disponivel Column -->
          <ng-container matColumnDef="valorDisponivel">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider !px-6 !py-4 text-left border-b border-gray-200"> Valor Disp. </th>
            <td mat-cell *matCellDef="let element" class="!px-6 !py-4">
              <span class="text-blue-600 font-bold">
                {{ (element.valorDisponivel !== null ? element.valorDisponivel : element.valorIssqn) | currency:'BRL':'symbol':'1.2-2' }}
              </span>
            </td>
          </ng-container>

          <!-- Data Constituicao Column -->
          <ng-container matColumnDef="dataConstituicao">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider !px-6 !py-4 text-left border-b border-gray-200"> Data </th>
            <td mat-cell *matCellDef="let element" class="!px-6 !py-4 text-gray-500 text-sm">
              <div class="flex items-center gap-1">
                <mat-icon class="text-gray-400 text-sm h-4 w-4">calendar_today</mat-icon>
                {{element.dataConstituicao | date:'dd/MM/yyyy'}}
              </div>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="acoes">
            <th mat-header-cell *matHeaderCellDef class="bg-gray-100 text-gray-600 font-bold text-xs uppercase tracking-wider !px-6 !py-4 text-center w-24 border-b border-gray-200"> Ações </th>
            <td mat-cell *matCellDef="let element" class="!px-6 !py-4 text-center">
              <button mat-icon-button color="primary" (click)="verDetalhes(element)" matTooltip="Ver detalhes completos" class="hover:bg-indigo-50 text-indigo-600 transition-colors">
                <mat-icon>visibility</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns; let i = index"
              [class.bg-gray-50]="i % 2 === 1"
              class="hover:bg-indigo-50/50 transition-all duration-200 border-b border-gray-100 last:border-0 group"></tr>

          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="6" class="p-12 text-center text-gray-500">
              <div class="flex flex-col items-center gap-4 animate-fade-in">
                <div class="bg-gray-50 p-4 rounded-full">
                  <mat-icon class="text-4xl text-gray-300 h-10 w-10">search_off</mat-icon>
                </div>
                <div>
                  <p class="text-lg font-medium text-gray-700">Nenhum dado encontrado</p>
                  <p class="text-sm text-gray-400">Tente ajustar os filtros de busca</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Mobile View (Cards) -->
      <div class="md:hidden bg-gray-50 p-4 space-y-4">
        @for (credito of creditos; track credito.id) {
          <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform duration-200">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div class="bg-indigo-50 p-2.5 rounded-lg border border-indigo-100">
                  <mat-icon class="text-indigo-600">receipt_long</mat-icon>
                </div>
                <div>
                  <p class="text-xs text-gray-500 font-bold uppercase tracking-wide">Crédito</p>
                  <p class="text-lg font-bold text-gray-800">{{credito.numeroCredito}}</p>
                </div>
              </div>
              <button mat-icon-button color="primary" (click)="verDetalhes(credito)" class="bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                <mat-icon>visibility</mat-icon>
              </button>
            </div>

            <div class="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-gray-100 pt-4">
              <div>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">NFS-e</p>
                <p class="font-medium text-gray-700 text-sm">{{credito.numeroNfse}}</p>
              </div>
              <div>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Data</p>
                <p class="font-medium text-gray-700 text-sm">{{credito.dataConstituicao | date:'dd/MM/yyyy'}}</p>
              </div>
              <div>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Valor Crédito</p>
                <p class="font-bold text-emerald-600 text-sm">
                  {{ (credito.valorCredito !== null ? credito.valorCredito : credito.valorIssqn) | currency:'BRL':'symbol':'1.2-2' }}
                </p>
              </div>
              <div>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Valor Disp.</p>
                <p class="font-bold text-blue-600 text-sm">
                  {{ (credito.valorDisponivel !== null ? credito.valorDisponivel : credito.valorIssqn) | currency:'BRL':'symbol':'1.2-2' }}
                </p>
              </div>
            </div>
          </div>
        }
        @if (creditos.length === 0) {
          <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="bg-white p-4 rounded-full shadow-sm mb-3">
              <mat-icon class="text-4xl text-gray-300 h-10 w-10">search_off</mat-icon>
            </div>
            <p class="text-lg font-medium text-gray-700">Nenhum dado encontrado</p>
            <p class="text-sm text-gray-400">Tente ajustar os filtros de busca</p>
          </div>
        }
      </div>

      <mat-paginator [length]="totalElements"
                     [pageSize]="pageSize"
                     [pageSizeOptions]="[5, 10, 25, 100]"
                     [pageIndex]="pageIndex"
                     (page)="onPageChange($event)"
                     aria-label="Select page"
                     class="border-t border-gray-100 bg-gray-50/50">
      </mat-paginator>
    </div>
  `,
  styles: [`
    /* Custom scrollbar for table container */
    .overflow-x-auto::-webkit-scrollbar {
      height: 6px;
    }
    .overflow-x-auto::-webkit-scrollbar-track {
      background: transparent;
    }
    .overflow-x-auto::-webkit-scrollbar-thumb {
      background: #e2e8f0;
      border-radius: 3px;
    }
    .overflow-x-auto::-webkit-scrollbar-thumb:hover {
      background: #cbd5e1;
    }
  `]
})
export class ListaCreditosComponent implements OnChanges {
  @Input() creditos: Credito[] = [];
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() loading: boolean = false;

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() detalheClick = new EventEmitter<Credito>();

  displayedColumns: string[] = ['numeroCredito', 'numeroNfse', 'valorCredito', 'valorDisponivel', 'dataConstituicao', 'acoes'];
  dataSource = new MatTableDataSource<Credito>([]);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['creditos']) {
      this.dataSource.data = this.creditos || [];
    }
    if (changes['loading']) {
      this.cdr.detectChanges();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  verDetalhes(credito: Credito) {
    this.detalheClick.emit(credito);
  }
}
