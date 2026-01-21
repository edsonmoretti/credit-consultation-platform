import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {SobreComponent} from './components/sobre/sobre.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'sobre', component: SobreComponent }
];
