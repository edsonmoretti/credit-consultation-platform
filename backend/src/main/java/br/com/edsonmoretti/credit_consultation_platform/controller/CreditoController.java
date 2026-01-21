package br.com.edsonmoretti.credit_consultation_platform.controller;

import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;
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

@RestController
@RequestMapping("/api/creditos")
@RequiredArgsConstructor
public class CreditoController {

    private final CreditoService creditoService;

    @GetMapping("")
    public ResponseEntity<Page<CreditoResponse>> healthCheck(@PageableDefault(page = 0, size = 10) Pageable pageable) {
        Page<CreditoResponse> creditos = creditoService.findAll(pageable);
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/{numeroNfse}")
    public ResponseEntity<Page<CreditoResponse>> getByNumeroNfse(@PathVariable String numeroNfse,
                                                                 @PageableDefault(page = 0, size = 10) Pageable pageable) {
        Page<CreditoResponse> creditos = creditoService.findByNumeroNfse(numeroNfse, pageable);
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/credito/{numeroCredito}")
    public ResponseEntity<CreditoResponse> getByNumeroCredito(@PathVariable String numeroCredito) {
        return creditoService.findByNumeroCredito(numeroCredito)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
