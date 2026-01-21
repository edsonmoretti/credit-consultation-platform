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
    <form [formGroup]="buscaForm" (ngSubmit)="buscar()" class="flex flex-col md:flex-row gap-4 items-center p-4 bg-white rounded shadow-md">
      <mat-form-field appearance="outline" class="w-full md:w-1/2">
        <mat-label>Número da NFS-e ou Crédito</mat-label>
        <input matInput formControlName="termoBusca" placeholder="Ex: 20230001">
        <mat-error *ngIf="buscaForm.get('termoBusca')?.hasError('required')">
          O campo é obrigatório
        </mat-error>
        <mat-error *ngIf="buscaForm.get('termoBusca')?.hasError('pattern')">
          Digite apenas números e letras válidas
        </mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="buscaForm.invalid" class="h-12 w-full md:w-auto">
        <mat-icon>search</mat-icon>
        Buscar
      </button>
    </form>
  `,
  styles: []
})
export class BuscaCreditoComponent {
  @Output() buscaRealizada = new EventEmitter<string>();
  buscaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buscaForm = this.fb.group({
      termoBusca: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]]
    });
  }

  buscar() {
    if (this.buscaForm.valid) {
      this.buscaRealizada.emit(this.buscaForm.get('termoBusca')?.value);
    }
  }
}
