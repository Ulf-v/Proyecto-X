FROM mysql:8.0
# Copia el script de inicialización al directorio que MySQL usa para ejecutar scripts al arrancar
COPY init.sql /docker-entrypoint-initdb.d/init.sql 