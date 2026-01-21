import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatProgressSpinnerModule
  ],
  template: `
    <div class="relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div *ngIf="loading" class="absolute inset-0 bg-white/70 z-10 flex justify-center items-center backdrop-blur-sm">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <div class="overflow-x-auto">
        <table mat-table [dataSource]="dataSource" matSort (matSortChange)="onSortChange($event)" class="w-full">

          <!-- Numero Credito Column -->
          <ng-container matColumnDef="numeroCredito">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="bg-gray-50 text-gray-700 font-semibold px-4 py-3 text-left"> Nº Crédito </th>
            <td mat-cell *matCellDef="let element" class="px-4 py-3 text-gray-600"> {{element.numeroCredito}} </td>
          </ng-container>

          <!-- Numero NFSe Column -->
          <ng-container matColumnDef="numeroNfse">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="bg-gray-50 text-gray-700 font-semibold px-4 py-3 text-left"> NFS-e </th>
            <td mat-cell *matCellDef="let element" class="px-4 py-3 text-gray-600"> {{element.numeroNfse}} </td>
          </ng-container>

          <!-- Valor Credito Column -->
          <ng-container matColumnDef="valorCredito">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="bg-gray-50 text-gray-700 font-semibold px-4 py-3 text-left"> Valor </th>
            <td mat-cell *matCellDef="let element" class="px-4 py-3 font-medium text-green-600"> {{element.valorCredito | currency:'BRL'}} </td>
          </ng-container>

          <!-- Data Constituicao Column -->
          <ng-container matColumnDef="dataConstituicao">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="bg-gray-50 text-gray-700 font-semibold px-4 py-3 text-left"> Data </th>
            <td mat-cell *matCellDef="let element" class="px-4 py-3 text-gray-600"> {{element.dataConstituicao | date:'dd/MM/yyyy'}} </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="acoes">
            <th mat-header-cell *matHeaderCellDef class="bg-gray-50 text-gray-700 font-semibold px-4 py-3 text-center w-20"> Ações </th>
            <td mat-cell *matCellDef="let element" class="px-4 py-3 text-center">
              <button mat-icon-button color="primary" (click)="verDetalhes(element)" aria-label="Ver detalhes" class="hover:bg-blue-50 rounded-full">
                <mat-icon class="text-blue-600">visibility</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns; let i = index"
              [class.bg-gray-50]="i % 2 !== 0"
              class="hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-0"></tr>

          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="5" class="p-8 text-center text-gray-500">
              <div class="flex flex-col items-center gap-2">
                <mat-icon class="text-4xl text-gray-300 h-10 w-10">search_off</mat-icon>
                <span>Nenhum dado encontrado</span>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <mat-paginator [length]="totalElements"
                     [pageSize]="pageSize"
                     [pageSizeOptions]="[5, 10, 25, 100]"
                     [pageIndex]="pageIndex"
                     (page)="onPageChange($event)"
                     aria-label="Select page"
                     class="border-t border-gray-200">
      </mat-paginator>
    </div>
  `,
  styles: [`
    /* Custom scrollbar for table container */
    .overflow-x-auto::-webkit-scrollbar {
      height: 8px;
    }
    .overflow-x-auto::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    .overflow-x-auto::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }
    .overflow-x-auto::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
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

  displayedColumns: string[] = ['numeroCredito', 'numeroNfse', 'valorCredito', 'dataConstituicao', 'acoes'];
  dataSource = new MatTableDataSource<Credito>([]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['creditos']) {
      this.dataSource.data = this.creditos;
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
