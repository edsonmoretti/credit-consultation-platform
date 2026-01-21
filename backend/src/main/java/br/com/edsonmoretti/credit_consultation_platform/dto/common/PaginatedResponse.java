package br.com.edsonmoretti.credit_consultation_platform.dto.common;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Paginação genérica para simplificar a paginação padrão das respostas de API.
 */
public record PaginatedResponse<T>(
        List<T> content,
        PageableInfo pageable,
        int totalPages,
        long totalElements,
        int size,
        int number,
        boolean first,
        boolean last,
        int numberOfElements,
        boolean empty
) {
    public record PageableInfo(int pageNumber, int pageSize, long offset) {}

    public static <T> PaginatedResponse<T> from(Page<T> page) {
        Pageable pageable = page.getPageable();
        PageableInfo pageableInfo = new PageableInfo(pageable.getPageNumber(), pageable.getPageSize(), pageable.getOffset());
        return new PaginatedResponse<>(
                page.getContent(),
                pageableInfo,
                page.getTotalPages(),
                page.getTotalElements(),
                page.getSize(),
                page.getNumber(),
                page.isFirst(),
                page.isLast(),
                page.getNumberOfElements(),
                page.isEmpty()
        );
    }
}
