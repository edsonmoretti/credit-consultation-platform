package br.com.edsonmoretti.credit_consultation_platform.service;

import br.com.edsonmoretti.credit_consultation_platform.domain.Credito;
import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;
import br.com.edsonmoretti.credit_consultation_platform.repository.CreditoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreditoServiceTest {

    @Mock
    private CreditoRepository creditoRepository;

    @InjectMocks
    private CreditoService creditoService;

    @Test
    void findAllShouldMapEntitiesToResponse() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        Page<Credito> entities = new PageImpl<>(List.of(sampleEntity()), pageRequest, 1);
        when(creditoRepository.findAll(pageRequest)).thenReturn(entities);

        Page<CreditoResponse> result = creditoService.findAll(pageRequest);

        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getContent().get(0).numeroCredito()).isEqualTo("123");
    }

    @Test
    void findByNumeroNfseShouldFilter() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        Page<Credito> entities = new PageImpl<>(List.of(sampleEntity()), pageRequest, 1);
        when(creditoRepository.findByNumeroNfse("NF123", pageRequest)).thenReturn(entities);

        Page<CreditoResponse> result = creditoService.findByNumeroNfse("NF123", pageRequest);

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).numeroNfse()).isEqualTo("NF123");
    }

    @Test
    void findByNumeroCreditoShouldReturnMappedOptional() {
        when(creditoRepository.findByNumeroCredito("123")).thenReturn(Optional.of(sampleEntity()));

        Optional<CreditoResponse> result = creditoService.findByNumeroCredito("123");

        assertThat(result).isPresent();
        assertThat(result.get().numeroCredito()).isEqualTo("123");
    }

    private Credito sampleEntity() {
        return new Credito(
                1L,
                "123",
                "NF123",
                BigDecimal.valueOf(100),
                BigDecimal.ZERO,
                BigDecimal.valueOf(100),
                LocalDateTime.of(2024, 1, 1, 10, 0),
                LocalDate.of(2024, 1, 1),
                BigDecimal.valueOf(10),
                "ISSQN",
                true,
                BigDecimal.valueOf(5),
                BigDecimal.valueOf(200),
                BigDecimal.valueOf(20),
                BigDecimal.valueOf(180)
        );
    }
}
