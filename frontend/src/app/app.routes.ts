import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { CreditoConsultaComponent } from './components/credito-consulta/credito-consulta.component';
import { SobreComponent } from './components/sobre/sobre.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: CreditoConsultaComponent },
      { path: 'sobre', component: SobreComponent }
    ]
  }
];
