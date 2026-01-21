package br.com.edsonmoretti.credit_consultation_platform.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record CreditoResponse(
        Long id,
        String numeroCredito,
        String numeroNfse,
        LocalDate dataConstituicao,
        BigDecimal valorIssqn,
        String tipoCredito,
        boolean simplesNacional,
        BigDecimal aliquota,
        BigDecimal valorFaturado,
        BigDecimal valorDeducao,
        BigDecimal baseCalculo
) {
}
