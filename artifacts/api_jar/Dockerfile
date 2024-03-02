FROM jetbrains/jbr:17
COPY target/api.jar /app/api.jar
WORKDIR /app
EXPOSE 8080
CMD ["java", "-jar", "api.jar"]


