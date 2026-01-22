package br.com.edsonmoretti.credit_consultation_platform.kafka;

import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class CreditoConsultaProducer {

    private static final String TOPIC = "credito-consultas";

    private final KafkaTemplate<String, CreditoResponse> kafkaTemplate;

    public CreditoConsultaProducer(KafkaTemplate<String, CreditoResponse> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void enviarConsulta(CreditoResponse creditoResponse) {
        kafkaTemplate.send(TOPIC, creditoResponse);
    }
}
