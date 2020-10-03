# My Budget App

My Budget App es una App para dispositivos móviles que te permitirá gestionar tus:
- Ingresos.
- Egresos.
- Cuentas Bancarias.
- Tarjetas de Crédito.
- Prestamos.
- Presupuestos.

Además podrás visualizar de forma amigable a través de gráficos:
 - Montos gastados mes corriente segregados por medio de pago
 - Saldos de las cuentas bancarias.
 - Vencimientos de la semana segregados por tipo: Egresos, Inversiones, Prestamos.
 - Desvíos entre presupuesto y real segregado por rubro (Ingresos, Egresos, Inversiones
y Prestamos).


## Despliegue
Para poder trabajar sobre la App realice lo siguientes pasos:
### Bajar Aplicacion [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=es_AR) desde la Play Store en un dispositivo móvil.

### Clonar repositorio
- Clonar este repositorio a tu maquina local, abriendo una consola y ejecutando: 
`git clone https://github.com/juancrossetto/distribuidas-app-cliente.git`

### Configuración
- En el destino donde se clono el repositorio, abrir una consola con permisos de administrador y ejecutar el siguiente comando:
```bash
npm install
```
- Luego una vez instaladas las dependencias de node, ejecutar el siguiente comando:
```bash
expo start
```
- El comando anterior desplegara un código QR por consola, el mismo debe ser escaneado por un dispositivo móvil con la aplicación de Expo (link mas arriba) y la aplicación correrá en el mismo.


## Ver App Publicada
Para poder visualizar la App sin necesidad de desplegarla, bajate la App de Expo desde la Store de tu teléfono (link mas arriba) y escanea el código QR que aparece en este [Link](https://expo.io/@juancrossetto/distribuidasClient/)

## Servidor
El servidor de dicha aplicación, en el cual se realizan los backups, esta hecho en NodeJS hosteado en Heroku, con una Base de Datos en MongoDB en la nube (MongoDB Atlas).
Para visualizar el repositorio del mismo ingrese al siguiente Link [Link](https://github.com/juancrossetto/distribuidas-app-servidor)

## Licencia

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 UADE Grupo 5 ©. 
