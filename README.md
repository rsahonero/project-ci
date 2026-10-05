# project-ci

Author
    Maria del Rosario Sahonero Mendieta - rsahonero 

🛠 Herramientas
    * Postman/Newman: Pruebas funcionales.
    * JMeter: Pruebas de rendimiento.
    * K6: Pruebas de carga.


Estructura del Proyecto

project-ci/
├── .github/workflows/       # Pipelines de GitHub Actions
│   ├── postman.yml          # Pipeline para ejecutar pruebas de Postman
│   ├── jmeter.yml           # Pipeline para ejecutar pruebas de JMeter
│   └── k6.yml               # Pipeline para ejecutar pruebas de K6
├── postman/                 # Colección y entorno de Postman
│   ├── BookingAPI.json
│   └── dev.postman_environment.json
├── jmeter/                  # Proyecto de JMeter
│   ├── data/                # Archivos CSV para parametrización
│   └── JmeterProject.jmx
├── k6/                      # Scripts de K6
│   ├── data/                # Datos JSON para pruebas
│   ├── lib/                 # Funciones auxiliares (ej. token.js)
│   └── scripts/             # Scripts principales de prueba
└── README.md


Pipelines en GitHub Actions

Las pruebas se ejecutan al hacer push a las ramas postman, jmeter o k6.
Los reportes HTML generados en la sección Actions > Artifacts de GitHub.

⚠️ Nota: Las pruebas apuntan a localhost:8000. Para que funcionen en GitHub Actions, debes usar Ngrok o desplegar tu API en un servidor público.