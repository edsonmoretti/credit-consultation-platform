package br.com.edsonmoretti.credit_consultation_platform.repository;

import br.com.edsonmoretti.credit_consultation_platform.domain.Credito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CreditoRepository extends JpaRepository<Credito, Long> {
    Page<Credito> findByNumeroNfse(String numeroNfse, Pageable pageable);
    Optional<Credito> findByNumeroCredito(String numeroCredito);
}
