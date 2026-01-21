import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busca-credito',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <mat-icon class="text-indigo-600">filter_list</mat-icon>
          Filtros de Busca
        </h2>
        <p class="text-sm text-gray-500 mt-1">Pesquise por número da NFS-e para encontrar créditos específicos.</p>
      </div>

      <form [formGroup]="buscaForm" (ngSubmit)="buscar()" class="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <mat-form-field appearance="outline" class="w-full md:flex-1 bg-white" subscriptSizing="dynamic">
          <mat-label>Número da NFS-e</mat-label>
          <mat-icon matPrefix class="text-gray-400 mr-2">receipt</mat-icon>
          <input matInput formControlName="termoBusca" placeholder="Ex: 20260001" class="text-gray-700">
          @if (buscaForm.get('termoBusca')?.value) {
            <button mat-icon-button matSuffix (click)="limparBusca()" type="button" aria-label="Limpar">
              <mat-icon>close</mat-icon>
            </button>
          }
          @if (buscaForm.get('termoBusca')?.hasError('pattern')) {
            <mat-error>
              Digite apenas números e letras válidas
            </mat-error>
          }
        </mat-form-field>

        <div class="flex gap-3 w-full md:w-auto">
          <button mat-flat-button color="primary" type="submit"
                  [disabled]="buscaForm.invalid"
                  class="h-[56px] flex-1 md:flex-none !rounded-lg !px-8 !bg-indigo-600 hover:!bg-indigo-700 transition-colors shadow-sm">
            <mat-icon class="mr-2">search</mat-icon>
            Buscar
          </button>

          <button mat-stroked-button type="button" (click)="limparBusca()"
                  class="h-[56px] !rounded-lg !border-gray-300 !text-gray-600 hover:!bg-gray-50">
            Limpar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none; /* Oculta espaço extra se não houver erro, ajustado com subscriptSizing="dynamic" */
    }
    :host ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: white !important;
    }
  `]
})
export class BuscaCreditoComponent {
  @Output() buscaRealizada = new EventEmitter<string>();
  buscaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buscaForm = this.fb.group({
      termoBusca: ['', [Validators.pattern(/^[a-zA-Z0-9]+$/)]]
    });
  }

  buscar() {
    if (this.buscaForm.valid) {
      this.buscaRealizada.emit(this.buscaForm.get('termoBusca')?.value || '');
    }
    this.focarInput();
  }

  limparBusca() {
    this.buscaForm.get('termoBusca')?.setValue('');
    this.buscaRealizada.emit('');
    this.focarInput();
  }

  private focarInput() {
    setTimeout(() => {
      const inputElement = document.querySelector('input[formControlName="termoBusca"]') as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    }, 50);
  }
}
