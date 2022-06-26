create or replace function upd_timestamp() returns trigger as
$$
begin
  new.UPDATED = current_timestamp;
  return new;
end
$$
language plpgsql;

DROP TABLE CUSTOMER_T;

CREATE TABLE CUSTOMER_T (
  REC_ID serial NOT NULL,
  FIRST_NAME text NOT NULL,
  LAST_NAME text NOT NULL,
  MIDDLE_NAME text NULL,
  ORGANIZATION integer NOT NULL,
  CREATED timestamp default current_timestamp,
  CREATED_BY integer NOT NULL,
  UPDATED timestamp default current_timestamp,
  UPDATED_BY integer NULL
);


create trigger t_name before update on CUSTOMER_T for each row execute procedure upd_timestamp();