package br.com.edsonmoretti.credit_consultation_platform.service;

import br.com.edsonmoretti.credit_consultation_platform.domain.Credito;
import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;
import br.com.edsonmoretti.credit_consultation_platform.kafka.CreditoConsultaProducer;
import br.com.edsonmoretti.credit_consultation_platform.repository.CreditoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreditoService {

    private final CreditoRepository creditoRepository;
    private final CreditoConsultaProducer creditoConsultaProducer;

    public Page<CreditoResponse> findAll(Pageable pageable) {
        return creditoRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public Page<CreditoResponse> findByNumeroNfse(String numeroNfse, Pageable pageable) {
        Page<CreditoResponse> creditos = creditoRepository.findByNumeroNfse(numeroNfse, pageable)
                .map(this::toResponse);
        creditos.forEach(creditoConsultaProducer::enviarConsulta);
        return creditos;
    }

    public Optional<CreditoResponse> findByNumeroCredito(String numeroCredito) {
        Optional<CreditoResponse> credito = creditoRepository.findByNumeroCredito(numeroCredito)
                .map(this::toResponse);
        credito.ifPresent(creditoConsultaProducer::enviarConsulta);
        return credito;
    }

    private CreditoResponse toResponse(Credito credito) {
        return new CreditoResponse(
                credito.getId(),
                credito.getNumeroCredito(),
                credito.getNumeroNfse(),
                credito.getDataConstituicao(),
                credito.getValorIssqn(),
                credito.getTipoCredito(),
                credito.isSimplesNacional(),
                credito.getAliquota(),
                credito.getValorFaturado(),
                credito.getValorDeducao(),
                credito.getBaseCalculo()
        );
    }
}
