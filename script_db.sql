-- "general".tal_cuotas definition
-- Drop table
-- DROP TABLE "general".tal_cuotas;
CREATE TABLE "general".tal_cuotas (
    id int8 NOT NULL DEFAULT nextval('general.cuotas_id_seq' :: regclass),
    cantidad_cuotas int8 NULL,
    cuota_pagada int8 NULL,
    fecha_pago timestamp NULL,
    CONSTRAINT cuotas_pk PRIMARY KEY (id)
);

-- "general".tal_compras definition
-- Drop table
-- DROP TABLE "general".tal_compras;
CREATE TABLE "general".tal_compras (
    id int8 NOT NULL DEFAULT nextval('general.compras_id_seq' :: regclass),
    producto varchar(200) NULL,
    valor int8 NULL,
    id_cuotas int8 NULL,
    CONSTRAINT compras_pk PRIMARY KEY (id),
    CONSTRAINT compras_fk FOREIGN KEY (id_cuotas) REFERENCES "general".tal_cuotas(id)
);

-- "general".tal_deudores definition
-- Drop table
-- DROP TABLE "general".tal_deudores;
CREATE TABLE "general".tal_deudores (
    id int8 NOT NULL DEFAULT nextval('general.deudores_id_seq' :: regclass),
    deudor varchar(200) NULL,
    id_compra int8 NULL,
    CONSTRAINT deudores_pk PRIMARY KEY (id),
    CONSTRAINT deudores_fk FOREIGN KEY (id_compra) REFERENCES "general".tal_compras(id)
);

-- "general".rel_compras_cuotas definition
-- Drop table
-- DROP TABLE "general".rel_compras_cuotas;
CREATE TABLE "general".rel_compras_cuotas (
    id bigserial NOT NULL,
    id_compras int8 NULL,
    id_cuotas int8 NULL,
    CONSTRAINT rel_compras_cuotas_pk PRIMARY KEY (id)
);

-- "general".rel_deudores_compras definition
-- Drop table
-- DROP TABLE "general".rel_deudores_compras;
CREATE TABLE "general".rel_deudores_compras (
    id bigserial NOT NULL,
    id_deudor int8 NULL,
    id_compra int8 NULL,
    CONSTRAINT rel_deudores_compras_pk PRIMARY KEY (id)
);