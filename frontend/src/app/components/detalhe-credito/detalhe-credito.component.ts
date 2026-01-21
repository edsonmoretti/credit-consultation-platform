import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Credito } from '../../models/credito.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-detalhe-credito',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="flex flex-col h-full max-h-[90vh]">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 bg-indigo-600 text-white rounded-t-lg">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-white/20 rounded-lg">
            <mat-icon class="text-white">receipt_long</mat-icon>
          </div>
          <div>
            <h2 class="text-xl font-bold leading-tight">Detalhes do Crédito</h2>
            <p class="text-indigo-100 text-sm">Nº {{ data.numeroCredito }}</p>
          </div>
        </div>
        <button mat-icon-button mat-dialog-close class="text-white hover:bg-white/10 rounded-full">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Content -->
      <mat-dialog-content class="!p-0 overflow-y-auto">
        <div class="p-6 space-y-6">

          <!-- Section: Informações Principais -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">NFS-e</span>
              <p class="text-lg font-medium text-gray-900 mt-1">{{ data.numeroNfse }}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Data Constituição</span>
              <p class="text-lg font-medium text-gray-900 mt-1">{{ data.dataConstituicao | date:'dd/MM/yyyy' }}</p>
            </div>
          </div>

          <mat-divider></mat-divider>

          <!-- Section: Valores -->
          <div>
            <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 mt-3">
              <mat-icon class="text-green-600 text-sm h-5 w-5">attach_money</mat-icon>
              Valores do Crédito
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-3 rounded-lg bg-green-50 border border-green-100">
                <span class="text-xs text-green-700 font-medium">Valor Crédito</span>
                <p class="text-lg font-bold text-green-800">{{ (data.valorCredito ?? data.valorIssqn) | currency:'BRL':'symbol':'1.2-2' }}</p>
              </div>
              <div class="p-3 rounded-lg bg-blue-50 border border-blue-100">
                <span class="text-xs text-blue-700 font-medium">Valor Disponível</span>
                <p class="text-lg font-bold text-blue-800">{{ (data.valorDisponivel ?? data.valorIssqn) | currency:'BRL':'symbol':'1.2-2' }}</p>
              </div>
              <div class="p-3 rounded-lg bg-orange-50 border border-orange-100">
                <span class="text-xs text-orange-700 font-medium">Valor Utilizado</span>
                <p class="text-lg font-bold text-orange-800">{{ (data.valorUtilizado ?? 0) | currency:'BRL':'symbol':'1.2-2' }}</p>
              </div>
            </div>
          </div>

          <mat-divider></mat-divider>

          <!-- Section: Detalhes Fiscais -->
          <div>
            <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <mat-icon class="text-gray-600 text-sm h-5 w-5">info</mat-icon>
              Detalhes Fiscais
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 text-sm">
              <div>
                <span class="block text-gray-500 text-xs">Tipo Crédito</span>
                <span class="font-medium text-gray-800">{{ data.tipoCredito }}</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs">Simples Nacional</span>
                <span class="font-medium text-gray-800">
                  <span [class]="data.simplesNacional ? 'text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs' : 'text-gray-600'">
                    {{ data.simplesNacional ? 'Sim' : 'Não' }}
                  </span>
                </span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs">Alíquota</span>
                <span class="font-medium text-gray-800">{{ data.aliquota | number:'1.2-2' }}%</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs">Valor ISSQN</span>
                <span class="font-medium text-gray-800">{{ data.valorIssqn | currency:'BRL':'symbol':'1.2-2' }}</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs">Valor Faturado</span>
                <span class="font-medium text-gray-800">{{ data.valorFaturado | currency:'BRL':'symbol':'1.2-2' }}</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs">Base de Cálculo</span>
                <span class="font-medium text-gray-800">{{ data.baseCalculo | currency:'BRL':'symbol':'1.2-2' }}</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs">Valor Dedução</span>
                <span class="font-medium text-gray-800">{{ data.valorDeducao | currency:'BRL':'symbol':'1.2-2' }}</span>
              </div>
              <div>
                <span class="block text-gray-500 text-xs">Data Carga</span>
                <span class="font-medium text-gray-800">{{ data.dataCarga ? (data.dataCarga | date:'dd/MM/yyyy') : '-' }}</span>
              </div>
            </div>
          </div>
        </div>
      </mat-dialog-content>

      <!-- Footer -->
      <div class="p-4 bg-gray-50 border-t border-gray-200 flex justify-end rounded-b-lg">
        <button mat-stroked-button color="primary" mat-dialog-close>
          Fechar
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      border-radius: 8px; /* Match dialog border radius */
    }
  `]
})
export class DetalheCreditoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Credito) {}
}
