import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Credito } from '../../models/credito.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-detalhe-credito',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule],
  template: `
    <h2 mat-dialog-title>Detalhes do Crédito: {{ data.numeroCredito }}</h2>
    <mat-dialog-content>
      <mat-list>
        <mat-list-item>
          <span matListItemTitle>NFS-e</span>
          <span matListItemLine>{{ data.numeroNfse }}</span>
        </mat-list-item>
        <mat-list-item>
          <span matListItemTitle>Valor Crédito</span>
          <span matListItemLine>{{ data.valorCredito | currency:'BRL' }}</span>
        </mat-list-item>
        <mat-list-item>
          <span matListItemTitle>Valor Disponível</span>
          <span matListItemLine>{{ data.valorDisponivel | currency:'BRL' }}</span>
        </mat-list-item>
        <mat-list-item>
          <span matListItemTitle>Data Constituição</span>
          <span matListItemLine>{{ data.dataConstituicao | date:'dd/MM/yyyy' }}</span>
        </mat-list-item>
        <mat-list-item>
          <span matListItemTitle>Situação</span>
          <span matListItemLine>{{ data.tipoCredito }}</span>
        </mat-list-item>
      </mat-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fechar</button>
    </mat-dialog-actions>
  `
})
export class DetalheCreditoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Credito) {}
}
