package br.com.edsonmoretti.credit_consultation_platform.controller;

import br.com.edsonmoretti.credit_consultation_platform.dto.CreditoResponse;
import br.com.edsonmoretti.credit_consultation_platform.service.CreditoService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CreditoController.class)
class CreditoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CreditoService creditoService;

    @Test
    void shouldListCreditosWithPagination() throws Exception {
        PageRequest pageRequest = PageRequest.of(0, 10);
        Page<CreditoResponse> page = new PageImpl<>(List.of(sampleResponse()), pageRequest, 1);
        Mockito.when(creditoService.findAll(any())).thenReturn(page);

        mockMvc.perform(get("/api/creditos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].numeroCredito").value("123"))
                .andExpect(jsonPath("$.totalPages").value(1))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.pageable.pageNumber").value(0))
                .andExpect(jsonPath("$.pageable.pageSize").value(10));
    }

    @Test
    void shouldFilterByNumeroNfse() throws Exception {
        PageRequest pageRequest = PageRequest.of(0, 10);
        Page<CreditoResponse> page = new PageImpl<>(List.of(sampleResponse()), pageRequest, 1);
        Mockito.when(creditoService.findByNumeroNfse(eq("NF123"), any())).thenReturn(page);

        mockMvc.perform(get("/api/creditos/NF123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].numeroNfse").value("NF123"));
    }

    @Test
    void shouldReturnCreditoByNumeroCredito() throws Exception {
        Mockito.when(creditoService.findByNumeroCredito("123"))
                .thenReturn(Optional.of(sampleResponse()));

        mockMvc.perform(get("/api/creditos/credito/123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numeroCredito").value("123"));
    }

    @Test
    void shouldReturnNotFoundWhenNumeroCreditoMissing() throws Exception {
        Mockito.when(creditoService.findByNumeroCredito("999")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/creditos/credito/999"))
                .andExpect(status().isNotFound());
    }

    private CreditoResponse sampleResponse() {
        return new CreditoResponse(
                1L,
                "123",
                "NF123",
                LocalDate.of(2026, 1, 1),
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
