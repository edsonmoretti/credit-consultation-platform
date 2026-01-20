package br.com.edsonmoretti.credit_consultation_platform.controller;

import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;
import br.com.edsonmoretti.credit_consultation_platform.service.CreditoService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<CreditoResponse>> healthCheck() {
        List<CreditoResponse> creditos = creditoService.findAll();
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/{numeroNfse}")
    public ResponseEntity<List<CreditoResponse>> getByNumeroNfse(@PathVariable String numeroNfse) {
        List<CreditoResponse> creditos = creditoService.findByNumeroNfse(numeroNfse);
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/credito/{numeroCredito}")
    public ResponseEntity<CreditoResponse> getByNumeroCredito(@PathVariable String numeroCredito) {
        return creditoService.findByNumeroCredito(numeroCredito)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
