
# Api Bodega | Api Warehouse

Este repositorio contiene una aplicación de gestión de inventarios y transacciones para compañías, bodegas, entre otros. Permite a los usuarios administrar bodegas, productos, categorías, proveedores, crear nuevos usuarios y realizar transacciones de compra y venta. La aplicación está construida utilizando Node.js, Express, JWT, Pandas, PostgreSQL y Prisma, y se conecta a una base de datos para almacenar toda la información necesaria.

## Características Principales

- **Gestión de Bodegas:** Permite crear, leer, actualizar y eliminar bodegas.
- **Inventario de Productos:** Los usuarios pueden agregar productos a un inventario específico, así como actualizar cantidades y eliminar productos.
- **Transacciones:** Se pueden registrar transacciones de compra y venta, y se generan informes sobre estas transacciones.
- **Análisis de Datos:** La aplicación permite exportar datos a archivos CSV y realizar análisis mediante scripts de Python con la libreria Pandas.
- **Autenticación de Usuarios:** Los usuarios pueden autenticarse para acceder a la aplicación (Los usuarios son creados por los Administradores, si se desea, los usuarios igualmente se pueden registrar).
- ~~**Notificaciones:** Los usuarios son notificados si se detecta bajo stock u otras irregularidades.~~

## Tecnologías Utilizadas

- **Backend:** Node.js y Express.
- **Base de Datos:** Prisma y PostgreSQL.
- **Autenticación:** JSON Web Tokens (JWT).
- **Almacenamiento de Archivos:** Cloudinary (para almacenar imágenes de productos).
- **Análisis de Datos:** Pandas (para análisis de transacciones y stock).

## Estructura del Proyecto

````
src/
├── controllers/        # Controladores que manejan la lógica de negocio
├── middlewares/        # Middleware para autenticación y manejo de archivos
├── routes/             # Definición de las rutas de la API
├── services/           # Servicios que interactúan con la base de datos
├── prisma/             # Configuración de Prisma y el cliente de la base de datos
├── utils/              # Funciones utilitarias, como el envío de correos electrónicos
├── analyze_transactions.py  # Script de Python para analizar transacciones
└── analyze_stock.py    # Script de Python para analizar el stock
````

## Instalación Local Backend

1) Clona el repositorio:
````
git clone https://github.com/felipecastillo-b/api-bodega
cd api-bodega
````

2) Instala las dependencias:
````
npm install
pip install -r requirements.txt
````

3) Configura las variables de entorno. Crea un archivo .env en la raíz del proyecto y agrega las variables necesarias (como se muestran en el **.env.example**).

4) Ejecuta las migraciones de Prisma para configurar la base de datos (primero debes de crear la base de datos para correr el script.sql):
````
npx prisma migrate dev
psql -U postgres -d apibodega -f script.sql 
````

5) Inicia el servidor:
````
npm run dev
````

## Instalación Local Frontend

1) Clona el repositorio:
````
git clone https://github.com/moontivac10n/bodega-front
cd bodega-front
````

2) Instala las dependencias:
````
npm install
````

3) Inicia el cliente:
````
npm run build
````

4) **Opcional**. Para iniciar el cliente en modo desarrollo:
````
npm start
````
## Credenciales

- **Email:** test@gmail.com
- **Password:** test

## Análisis de Datos

La aplicación incluye **scripts de Python** para **analizar transacciones y stock**. Estos scripts pueden ser ejecutados para **generar informes y estadísticas** sobre el rendimiento de la compañía.

- **analyze_transactions.py:** Este script permite analizar las transacciones registradas en la base de datos. Genera informes sobre el volumen de ventas, las transacciones más frecuentes y las tendencias de compra a lo largo del tiempo. Los resultados se pueden exportar a un archivo CSV para su posterior análisis.

- **analyze_stock.py:** Este script se encarga de analizar el estado del inventario. Proporciona información sobre los niveles de stock de cada producto, identifica productos que están por debajo de un umbral crítico y genera recomendaciones sobre reabastecimiento. También permite visualizar la rotación de productos y su rendimiento en el tiempo.

## API Endpoints

#### Autenticación

- **POST /auth/registerCompany:** Registra una nueva compañía.
- **POST /auth/loginCompany:** Inicia sesión para una compañía.
- **POST /auth/register:** Registra un nuevo usuario.
- **POST /auth/login:** Inicia sesión para un usuario.

#### Compañías

- **GET /company/:** Obtiene la información de la compañía autenticada.
- **POST /company/inviteUser:** Envía una invitación por correo a un nuevo usuario.
- **POST /company/createUser:** Crea un nuevo usuario en la compañía.

#### Usuarios

- **GET /user/:** Obtiene la lista de todos los usuarios.
- **GET /user/:id:** Obtiene la información de un usuario específico por ID.
- **PUT /user/:id:** Actualiza la información de un usuario específico por ID.

#### Bodegas

- **GET /warehouse/:** Obtiene la lista de todas las bodegas.
- **POST /warehouse/:** Crea una nueva bodega.
- **PUT /warehouse/:id:** Actualiza la información de una bodega específica por ID.
- **DELETE /warehouse/:id:** Elimina una bodega específica por ID.

#### Inventarios

- **GET /inventory/:** Obtiene la lista de todos los inventarios.
- **GET /inventory/:id:** Obtiene la información de un inventario específico por ID.
- **POST /inventory/:** Crea un nuevo inventario.
- **PUT /inventory/:id:** Actualiza la información de un inventario específico por ID.
- **DELETE /inventory/:id:** Elimina un inventario específico por ID.

#### Productos

- **GET /product/:** Obtiene la lista de todos los productos.
- **POST /product/:** Crea un nuevo producto.
- **PUT /product/:id:** Actualiza la información de un producto específico por ID.
- **DELETE / product/:id:** Elimina un producto específico por ID.

#### Transacciones

- **GET /transaction/:** Obtiene la lista de todas las transacciones.
- **POST /transaction/:** Registra una nueva transacción.
- **GET /transaction/:id:** Obtiene la información de una transacción específica por ID.
- **PUT /transaction/:id:** Actualiza la información de una transacción específica por ID.
- **DELETE /transaction/:id:** Elimina una transacción específica por ID.

#### Proveedores

- **GET /supplier/:** Obtiene la lista de todos los proveedores.
- **POST /supplier/:** Crea un nuevo proveedor.
- **PUT /supplier/:id:** Actualiza la información de un proveedor específico por ID.
- **DELETE /supplier/:id:** Elimina un proveedor específico por ID.

#### Categorías

- **GET /category/:** Obtiene la lista de todas las categorías.
- **POST /category/:** Crea una nueva categoría.
- **PUT /category/:id:** Actualiza la información de una categoría específica por ID.
- **DELETE /category/:id:** Elimina una categoría específica por ID.

#### Estados

- **GET /status/:** Obtiene la lista de todos los estados.
- **POST /status/:** Crea un nuevo estado.
- **PUT /status/:id:** Actualiza la información de un estado específico por ID.
- **DELETE /status/:id:** Elimina un estado específico por ID.

#### Roles

- **GET /role/:** Obtiene la lista de todos los roles.
- **POST /role/:** Crea un nuevo rol.
- **PUT /role/:id:** Actualiza la información de un rol específico por ID.
- **DELETE /role/:id:** Elimina un rol específico por ID.

## Authors

- [@felipecastillo-b](https://www.github.com/felipecastillo-b)
- [@moontivac10n](https://www.github.com/moontivac10n)

## Contribuciones

Las contribuciones son bienvenidas y se valoran mucho. Si deseas contribuir al proyecto, por favor sigue estos pasos o abre una **issue**:

1) **Fork el repositorio:** Crea una copia del repositorio en tu cuenta de GitHub.

2) **Crea una nueva rama:** Trabaja en una nueva característica o corrección de errores en una rama separada. Usa un nombre descriptivo para la rama.

````
git checkout -b nombre-de-tu-rama
````

3) **Realiza tus cambios:** Haz las modificaciones necesarias y asegúrate de que el código esté bien documentado y probado.

4) **Envía un Pull Request:** Una vez que estés satisfecho con tus cambios, envía un Pull Request al repositorio original. Describe claramente los cambios realizados y el propósito de la contribución.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE en el repositorio.
