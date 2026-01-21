-- Criação da tabela CREDITO
CREATE TABLE IF NOT EXISTS credito (
    id BIGSERIAL PRIMARY KEY,
    numero_credito VARCHAR(50) NOT NULL,
    numero_nfse VARCHAR(50) NOT NULL,
    valor_credito NUMERIC(15, 2),
    valor_utilizado NUMERIC(15, 2),
    valor_disponivel NUMERIC(15, 2),
    data_carga TIMESTAMP,
    data_constituicao DATE NOT NULL,
    valor_issqn NUMERIC(15, 2) NOT NULL,
    tipo_credito VARCHAR(50) NOT NULL,
    simples_nacional BOOLEAN NOT NULL,
    aliquota NUMERIC(5, 2) NOT NULL,
    valor_faturado NUMERIC(15, 2) NOT NULL,
    valor_deducao NUMERIC(15, 2) NOT NULL,
    base_calculo NUMERIC(15, 2) NOT NULL
);
