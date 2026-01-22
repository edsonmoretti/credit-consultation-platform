package br.com.edsonmoretti.credit_consultation_platform.infra.messaging.kafka;

import br.com.edsonmoretti.credit_consultation_platform.application.port.out.CreditoConsultaPublisher;
import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class CreditoConsultaProducer implements CreditoConsultaPublisher {

    private final KafkaTemplate<String, CreditoResponse> kafkaTemplate;
    private final String topic;

    public CreditoConsultaProducer(
            KafkaTemplate<String, CreditoResponse> kafkaTemplate,
            @Value("${messaging.credito-consultas.topic:credito-consultas}") String topic) {
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    @Override
    public void publish(CreditoResponse creditoResponse) {
        kafkaTemplate.send(topic, creditoResponse);
    }

    // Kept for backward compatibility with older usages.
    public void enviarConsulta(CreditoResponse creditoResponse) {
        publish(creditoResponse);
    }
}
