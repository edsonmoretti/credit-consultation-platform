package br.com.edsonmoretti.credit_consultation_platform.controller;

import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;
import br.com.edsonmoretti.credit_consultation_platform.dto.common.PaginatedResponse;
import br.com.edsonmoretti.credit_consultation_platform.service.CreditoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/creditos")
@RequiredArgsConstructor
public class CreditoController {

    private final CreditoService creditoService;

    @GetMapping("")
    public ResponseEntity<PaginatedResponse<CreditoResponse>> healthCheck(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        Page<CreditoResponse> creditos = creditoService.findAll(pageable);
        return ResponseEntity.ok(toPaginatedResponse(creditos));
    }

    @GetMapping("/{numeroNfse}")
    public ResponseEntity<PaginatedResponse<CreditoResponse>> getByNumeroNfse(@PathVariable String numeroNfse,
                                                                 @PageableDefault(page = 0, size = 10) Pageable pageable) {
        Page<CreditoResponse> creditos = creditoService.findByNumeroNfse(numeroNfse, pageable);
        return ResponseEntity.ok(toPaginatedResponse(creditos));
    }

    @GetMapping("/credito/{numeroCredito}")
    public ResponseEntity<CreditoResponse> getByNumeroCredito(@PathVariable String numeroCredito) {
        return creditoService.findByNumeroCredito(numeroCredito)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    /**
     * Método para Simplificar a paginação dos resultados da consulta.
     * para a aplicação do teste técnico, a paginação padrão vem com muita informação
     * poluindo. Sendo que só quero paginação para apresentar um frontend mais elegante.
     */
    private <T> PaginatedResponse<T> toPaginatedResponse(Page<T> page) {
        Pageable pageable = page.getPageable();
        PaginatedResponse.PageableInfo pageableInfo = new PaginatedResponse.PageableInfo(pageable.getPageNumber(), pageable.getPageSize(), pageable.getOffset());
        return new PaginatedResponse<>(
                page.getContent(),
                pageableInfo,
                page.getTotalPages(),
                page.getTotalElements(),
                page.getSize(),
                page.getNumber(),
                page.isFirst(),
                page.isLast(),
                page.getNumberOfElements(),
                page.isEmpty()
        );
    }
}
