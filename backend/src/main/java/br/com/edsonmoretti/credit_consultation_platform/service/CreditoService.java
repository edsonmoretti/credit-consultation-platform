package br.com.edsonmoretti.credit_consultation_platform.service;

import br.com.edsonmoretti.credit_consultation_platform.domain.Credito;
import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;
import br.com.edsonmoretti.credit_consultation_platform.repository.CreditoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CreditoService {

    private final CreditoRepository creditoRepository;


    public List<CreditoResponse> findByNumeroNfse(String numeroNfse) {
        return creditoRepository.findByNumeroNfse(numeroNfse).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<CreditoResponse> findByNumeroCredito(String numeroCredito) {
        return creditoRepository.findByNumeroCredito(numeroCredito)
                .map(this::toResponse);
    }

    private CreditoResponse toResponse(Credito credito) {
        return new CreditoResponse(
                credito.getId(),
                credito.getNumeroCredito(),
                credito.getNumeroNfse(),
                credito.getValorCredito(),
                credito.getValorUtilizado(),
                credito.getValorDisponivel(),
                credito.getDataCarga(),
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
