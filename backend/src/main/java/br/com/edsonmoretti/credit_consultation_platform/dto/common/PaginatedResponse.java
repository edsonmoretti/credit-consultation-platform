package br.com.edsonmoretti.credit_consultation_platform.dto.common;

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
}
