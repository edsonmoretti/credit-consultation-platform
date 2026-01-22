package br.com.edsonmoretti.credit_consultation_platform.application.port.out;

import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;

public interface CreditoConsultaPublisher {
    void publish(CreditoResponse creditoResponse);
}
