import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule
  ],
  template: `
    <div class="container mx-auto p-4 md:p-8 max-w-5xl">
      <!-- Header -->
      <div class="text-center mb-10 animate-fade-in-down">
        <h1 class="text-4xl font-bold text-primary mb-2">Plataforma de Consulta de Créditos</h1>
        <p class="text-lg text-gray-600">Solução Fullstack para o Desafio Técnico da Infuse Tecnologia</p>
      </div>

      <!-- Destaques -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <mat-card class="transform hover:scale-105 transition-transform duration-300 shadow-lg">
          <mat-card-header>
            <div mat-card-avatar class="bg-blue-100 flex items-center justify-center rounded-full">
              <mat-icon class="text-blue-600">backend_code</mat-icon>
            </div>
            <mat-card-title>Backend Robusto</mat-card-title>
            <mat-card-subtitle>Java 25 + Spring Boot 3</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content class="pt-4">
            <mat-list>
              <mat-list-item>
                <mat-icon matListItemIcon class="text-green-500">check_circle</mat-icon>
                <div matListItemTitle>Flyway Migration</div>
                <div matListItemLine>Automação total do banco de dados</div>
              </mat-list-item>
              <mat-list-item>
                <mat-icon matListItemIcon class="text-green-500">check_circle</mat-icon>
                <div matListItemTitle>Swagger / OpenAPI</div>
                <div matListItemLine>Documentação interativa automática</div>
              </mat-list-item>
              <mat-list-item>
                <mat-icon matListItemIcon class="text-green-500">check_circle</mat-icon>
                <div matListItemTitle>Paginação Otimizada</div>
                <div matListItemLine>Performance e limpeza no JSON</div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>

        <mat-card class="transform hover:scale-105 transition-transform duration-300 shadow-lg">
          <mat-card-header>
            <div mat-card-avatar class="bg-pink-100 flex items-center justify-center rounded-full">
              <mat-icon class="text-pink-600">web</mat-icon>
            </div>
            <mat-card-title>Frontend Moderno</mat-card-title>
            <mat-card-subtitle>Angular 21 + Material</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content class="pt-4">
            <mat-list>
              <mat-list-item>
                <mat-icon matListItemIcon class="text-purple-500">star</mat-icon>
                <div matListItemTitle>UX/UI Aprimorada</div>
                <div matListItemLine>Menu lateral e modais elegantes</div>
              </mat-list-item>
              <mat-list-item>
                <mat-icon matListItemIcon class="text-purple-500">star</mat-icon>
                <div matListItemTitle>Mobile First</div>
                <div matListItemLine>Totalmente responsivo</div>
              </mat-list-item>
              <mat-list-item>
                <mat-icon matListItemIcon class="text-purple-500">star</mat-icon>
                <div matListItemTitle>Tabelas Inteligentes</div>
                <div matListItemLine>Paginação e ordenação integradas</div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Tecnologias -->
      <mat-accordion class="mb-10 shadow-md rounded-lg overflow-hidden">
        <mat-expansion-panel expanded>
          <mat-expansion-panel-header>
            <mat-panel-title class="text-lg font-semibold">
              <mat-icon class="mr-2">code</mat-icon> Stack Tecnológico
            </mat-panel-title>
          </mat-expansion-panel-header>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-bold text-gray-700 mb-2 border-b pb-1">Backend</h3>
              <ul class="space-y-1 text-sm text-gray-600">
                <li>☕ Java 25</li>
                <li>🍃 Spring Boot 3.5.9</li>
                <li>🗄️ Spring Data JPA</li>
                <li>🚀 Flyway</li>
                <li>🌶️ Lombok</li>
              </ul>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-bold text-gray-700 mb-2 border-b pb-1">Frontend</h3>
              <ul class="space-y-1 text-sm text-gray-600">
                <li>🅰️ Angular 21</li>
                <li>🎨 Angular Material</li>
                <li>💅 Tailwind CSS</li>
                <li>🟦 TypeScript</li>
              </ul>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-bold text-gray-700 mb-2 border-b pb-1">Infraestrutura</h3>
              <ul class="space-y-1 text-sm text-gray-600">
                <li>🐳 Docker</li>
                <li>🐙 Docker Compose</li>
                <li>🐘 PostgreSQL</li>
                <li>☁️ Swagger UI</li>
              </ul>
            </div>
          </div>
        </mat-expansion-panel>
      </mat-accordion>

      <!-- Autor -->
      <div class="text-center mt-12 border-t pt-8">
        <p class="text-gray-500">Desenvolvido por <span class="font-bold text-gray-800">Edson Moretti do Nascimento</span></p>
        <p class="text-sm text-gray-400 mt-1">Desafio Técnico Infuse Tecnologia</p>
      </div>
    </div>
  `,
  styles: [`
    .text-primary { color: #3f51b5; }
    .animate-fade-in-down {
      animation: fadeInDown 0.8s ease-out;
    }
    @keyframes fadeInDown {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class SobreComponent {}
