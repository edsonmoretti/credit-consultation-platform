# Build stage
FROM amazoncorretto:25 AS build
WORKDIR /app

# Instala o utilitário tar (necessário para o mvnw)
RUN yum install -y tar gzip

# Copia os arquivos de configuração
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Dá permissão e executa o download das dependências
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copia o código fonte e gera o jar
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Run stage
FROM amazoncorretto:25
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]