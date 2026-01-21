import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
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
                <p class="text-xs text-gray-500">edsonmoretti&#64;live.com</p>
                <p class="text-xs text-gray-500">edsonmoretti&#64;gmail.com</p>
              </div>
            </div>
          </div>

          <mat-nav-list class="pt-2">
            <a mat-list-item routerLink="/" routerLinkActive="!text-indigo-600 !bg-indigo-50 border-r-4 border-indigo-600" [routerLinkActiveOptions]="{exact: true}">
              <mat-icon matListItemIcon>receipt_long</mat-icon>
              <span matListItemTitle class="font-medium">Consulta de Créditos</span>
            </a>
            <a mat-list-item routerLink="/sobre" routerLinkActive="!text-indigo-600 !bg-indigo-50 border-r-4 border-indigo-600" class="text-gray-600 hover:bg-gray-50">
              <mat-icon matListItemIcon class="text-gray-400">help</mat-icon>
              <span matListItemTitle>Sobre</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <!-- Main Content -->
        <mat-sidenav-content class="bg-gray-100 flex flex-col !overflow-hidden relative">
          <div class="flex-auto overflow-y-auto h-full pb-20">
            <router-outlet></router-outlet>
          </div>

          <footer class="absolute bottom-0 w-full p-8 text-center text-gray-500 text-sm border-t border-gray-200 bg-white z-10">
            <p>&copy; {{ currentYear }} Plataforma de Consulta de Créditos. Construído por Edson Moretti do Nascimento.</p>
          </footer>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    mat-sidenav-container {
      height: calc(100vh - 64px);
    }
  `]
})
export class LayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  currentYear = new Date().getFullYear();
  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
}
