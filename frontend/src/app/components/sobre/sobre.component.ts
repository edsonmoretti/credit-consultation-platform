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
    <div class="container mx-auto p-4 md:p-8 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-10 animate-fade-in-down">
        <h1 class="text-4xl font-bold text-primary mb-2">Plataforma de Consulta de Créditos Constituídos</h1>
        <p class="text-lg text-gray-600">Solução Fullstack para o Desafio Técnico da Infuse Tecnologia</p>
        <p class="text-sm text-gray-500 mt-2">Uma aplicação robusta, moderna e containerizada desenvolvida com <strong>Java 25</strong>, <strong>Spring Boot 3</strong> e <strong>Angular 21</strong></p>
      </div>

      <!-- Diferenciais -->
      <mat-card class="mb-8 shadow-lg">
        <mat-card-header class="bg-gradient-to-r from-indigo-50 to-purple-50">
          <mat-card-title class="text-2xl flex items-center gap-2">
            <mat-icon class="text-indigo-600">stars</mat-icon>
            Diferenciais e Extras Implementados
          </mat-card-title>
          <mat-card-subtitle>Práticas de mercado e tecnologias de ponta</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Backend -->
            <div>
              <h3 class="font-bold text-lg text-indigo-700 mb-3 flex items-center gap-2">
                <mat-icon>code</mat-icon> Backend
              </h3>
              <ul class="space-y-3 text-sm text-gray-700">
                <li class="flex items-start gap-3">
                  <mat-icon class="text-green-600 !text-xl mt-0.5 flex-shrink-0">check_circle</mat-icon>
                  <span><strong>Flyway Migration:</strong> Gerenciamento automatizado de versões do banco. Tabelas e dados criados automaticamente.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-green-600 !text-xl mt-0.5 flex-shrink-0">check_circle</mat-icon>
                  <span><strong>Swagger/OpenAPI:</strong> Documentação interativa não solicitada, mas implementada para facilitar integração.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-green-600 !text-xl mt-0.5 flex-shrink-0">check_circle</mat-icon>
                  <span><strong>Endpoint de Listagem Geral:</strong> GET /api/creditos para listar todos os registros.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-green-600 !text-xl mt-0.5 flex-shrink-0">check_circle</mat-icon>
                  <span><strong>Paginação Customizada:</strong> Implementação otimizada para melhor performance.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-green-600 !text-xl mt-0.5 flex-shrink-0">check_circle</mat-icon>
                  <span><strong>Testes via Docker:</strong> Execução de testes sem necessidade de JDK local.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-green-600 !text-xl mt-0.5 flex-shrink-0">check_circle</mat-icon>
                  <span><strong>Java 25:</strong> Versão mais recente da linguagem (LTS).</span>
                </li>
              </ul>
            </div>

            <!-- Frontend -->
            <div>
              <h3 class="font-bold text-lg text-pink-700 mb-3 flex items-center gap-2">
                <mat-icon>web</mat-icon> Frontend
              </h3>
              <ul class="space-y-3 text-sm text-gray-700">
                <li class="flex items-start gap-3">
                  <mat-icon class="text-purple-600 !text-xl mt-0.5 flex-shrink-0">star</mat-icon>
                  <span><strong>Menu Lateral:</strong> Interface moderna com navegação intuitiva.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-purple-600 !text-xl mt-0.5 flex-shrink-0">star</mat-icon>
                  <span><strong>Modal de Detalhes:</strong> Exibição elegante dos detalhes do crédito.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-purple-600 !text-xl mt-0.5 flex-shrink-0">star</mat-icon>
                  <span><strong>Paginação e Ordenação:</strong> Implementação completa nas tabelas de consulta.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-purple-600 !text-xl mt-0.5 flex-shrink-0">star</mat-icon>
                  <span><strong>Design Responsivo:</strong> Excelente experiência em desktop e mobile.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-purple-600 !text-xl mt-0.5 flex-shrink-0">star</mat-icon>
                  <span><strong>Angular 21:</strong> Framework mais recente com standalone components.</span>
                </li>
                <li class="flex items-start gap-3">
                  <mat-icon class="text-purple-600 !text-xl mt-0.5 flex-shrink-0">star</mat-icon>
                  <span><strong>Tailwind CSS:</strong> Estilização moderna e utilitária.</span>
                </li>
              </ul>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Stack Tecnológico -->
      <mat-accordion class="mb-8 shadow-lg">
        <mat-expansion-panel expanded>
          <mat-expansion-panel-header>
            <mat-panel-title class="text-xl font-semibold">
              <mat-icon class="mr-2">code</mat-icon> Stack Tecnológico
            </mat-panel-title>
          </mat-expansion-panel-header>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 class="font-bold text-blue-800 mb-3 border-b border-blue-300 pb-2 flex items-center gap-2">
                <mat-icon class="text-blue-600">storage</mat-icon> Backend
              </h3>
              <ul class="space-y-2 text-sm text-gray-700">
                <li>☕ <strong>Java 25</strong></li>
                <li>🍃 <strong>Spring Boot 3.5.9</strong></li>
                <li>🗄️ <strong>Spring Data JPA</strong></li>
                <li>🚀 <strong>Flyway</strong></li>
                <li>🌶️ <strong>Lombok</strong></li>
                <li>📋 <strong>Hibernate</strong></li>
              </ul>
            </div>
            <div class="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <h3 class="font-bold text-pink-800 mb-3 border-b border-pink-300 pb-2 flex items-center gap-2">
                <mat-icon class="text-pink-600">web</mat-icon> Frontend
              </h3>
              <ul class="space-y-2 text-sm text-gray-700">
                <li>🅰️ <strong>Angular 21</strong></li>
                <li>🎨 <strong>Angular Material</strong></li>
                <li>💅 <strong>Tailwind CSS</strong></li>
                <li>🟦 <strong>TypeScript</strong></li>
                <li>🎯 <strong>Standalone Components</strong></li>
                <li>📱 <strong>Responsive Design</strong></li>
              </ul>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 class="font-bold text-purple-800 mb-3 border-b border-purple-300 pb-2 flex items-center gap-2">
                <mat-icon class="text-purple-600">cloud</mat-icon> Infraestrutura
              </h3>
              <ul class="space-y-2 text-sm text-gray-700">
                <li>🐳 <strong>Docker</strong></li>
                <li>🐙 <strong>Docker Compose</strong></li>
                <li>🐘 <strong>PostgreSQL</strong></li>
                <li>☁️ <strong>Swagger UI</strong></li>
                <li>🧪 <strong>Testes Automatizados</strong></li>
                <li>🔧 <strong>Ambiente Dev/Prod</strong></li>
              </ul>
            </div>
          </div>
        </mat-expansion-panel>
      </mat-accordion>

      <!-- Arquitetura -->
      <mat-card class="mb-8 mt-8 shadow-lg">
        <mat-card-header class="bg-gradient-to-r from-green-50 to-teal-50">
          <mat-card-title class="text-2xl flex items-center gap-2">
            <mat-icon class="text-green-600">architecture</mat-icon>
            Arquitetura e Design (backend)
          </mat-card-title>
          <mat-card-subtitle>Clean Code e SOLID</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="pt-6">
          <p class="text-gray-700 mb-4">O projeto segue os princípios de <strong>Clean Code</strong> e <strong>SOLID</strong>, com uma arquitetura em camadas bem definida:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <mat-icon class="text-blue-600 mb-2">data_object</mat-icon>
              <h4 class="font-bold text-blue-900 mb-1">Domain</h4>
              <p class="text-xs text-gray-600">Entidades JPA representando o modelo de dados</p>
            </div>
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <mat-icon class="text-green-600 mb-2">storage</mat-icon>
              <h4 class="font-bold text-green-900 mb-1">Repository</h4>
              <p class="text-xs text-gray-600">Interfaces para persistência de dados</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <mat-icon class="text-purple-600 mb-2">business</mat-icon>
              <h4 class="font-bold text-purple-900 mb-1">Service</h4>
              <p class="text-xs text-gray-600">Regras de negócio e transformação de DTOs</p>
            </div>
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
              <mat-icon class="text-orange-600 mb-2">api</mat-icon>
              <h4 class="font-bold text-orange-900 mb-1">Controller</h4>
              <p class="text-xs text-gray-600">Endpoints REST documentados</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Como Executar -->
      <mat-card class="mb-8 shadow-lg">
        <mat-card-header class="bg-gradient-to-r from-cyan-50 to-blue-50">
          <mat-card-title class="text-2xl flex items-center gap-2">
            <mat-icon class="text-cyan-600">play_circle</mat-icon>
            Como Executar
          </mat-card-title>
          <mat-card-subtitle>Passo a passo simples</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="pt-6">
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <p class="font-semibold text-gray-800">Clone o repositório</p>
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">git clone [url-do-repositorio]</code>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <p class="font-semibold text-gray-800">Configure as variáveis (opcional)</p>
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">cp .env.example .env</code>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <p class="font-semibold text-gray-800">Suba o ambiente completo</p>
                <code class="bg-gray-100 px-2 py-1 rounded text-sm">docker-compose up -d --build</code>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">✓</div>
              <div>
                <p class="font-semibold text-gray-800">Acesse a aplicação</p>
                <div class="space-y-1 mt-2">
                  <p class="text-sm"><mat-icon class="text-sm align-middle">computer</mat-icon> <strong>Frontend:</strong> <a href="http://localhost:4200" target="_blank" class="text-blue-600 hover:underline">http://localhost:4200</a></p>
                  <p class="text-sm"><mat-icon class="text-sm align-middle">settings</mat-icon> <strong>Backend API:</strong> <a href="http://localhost:8080" target="_blank" class="text-blue-600 hover:underline">http://localhost:8080</a></p>
                  <p class="text-sm"><mat-icon class="text-sm align-middle">description</mat-icon> <strong>Swagger:</strong> <a href="http://localhost:8080/swagger-ui/index.html" target="_blank" class="text-blue-600 hover:underline">http://localhost:8080/swagger-ui/index.html</a></p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p class="text-sm text-blue-900"><strong>Nota:</strong> Graças ao <strong>Flyway</strong>, o banco de dados será criado e populado automaticamente na primeira execução.</p>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Requisitos Atendidos -->
      <mat-card class="mb-8 shadow-lg">
        <mat-card-header class="bg-gradient-to-r from-emerald-50 to-green-50">
          <mat-card-title class="text-2xl flex items-center gap-2">
            <mat-icon class="text-emerald-600">task_alt</mat-icon>
            Requisitos Atendidos
          </mat-card-title>
          <mat-card-subtitle>Todos os requisitos do desafio foram implementados com sucesso</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="pt-6">
          <mat-list>
            <mat-list-item>
              <mat-icon matListItemIcon class="text-green-600">check_circle</mat-icon>
              <div matListItemTitle>Consulta constituídos de créditos por número da NFS-e</div>
            </mat-list-item>
            <mat-list-item>
              <mat-icon matListItemIcon class="text-green-600">check_circle</mat-icon>
              <div matListItemTitle>Exibição detalhada de um crédito</div>
            </mat-list-item>
            <mat-list-item>
              <mat-icon matListItemIcon class="text-green-600">check_circle</mat-icon>
              <div matListItemTitle>Responsividade para dispositivos móveis</div>
            </mat-list-item>
            <mat-list-item>
              <mat-icon matListItemIcon class="text-green-600">check_circle</mat-icon>
              <div matListItemTitle>Aplicação containerizada com Docker</div>
            </mat-list-item>
            <mat-list-item>
              <mat-icon matListItemIcon class="text-green-600">check_circle</mat-icon>
              <div matListItemTitle>Tecnologias: Java 8+, Spring Boot, Angular</div>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>

      <!-- Autor -->
      <div class="text-center mt-12 border-t-2 border-gray-200 pt-8">
        <div class="inline-block bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 rounded-lg shadow-md">
          <mat-icon class="text-5xl text-indigo-600 mb-2">person</mat-icon>
          <p class="text-lg text-gray-700">Desenvolvido por</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">Edson Moretti do Nascimento</p>
          <p class="text-sm text-gray-600 mt-2">Desafio Técnico Infuse Tecnologia</p>
          <div class="mt-4 flex justify-center gap-4 text-sm text-gray-600">
            <span>☕ Java 25</span>
            <span>•</span>
            <span>🍃 Spring Boot 3</span>
            <span>•</span>
            <span>🅰️ Angular 21</span>
          </div>
        </div>
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
