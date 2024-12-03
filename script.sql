--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2024-12-03 01:13:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 17626)
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    description text
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17632)
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO postgres;

--
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 218
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- TOC entry 219 (class 1259 OID 17633)
-- Name: Company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Company" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    address text NOT NULL,
    phone text NOT NULL,
    website text,
    image_url text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Company" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17639)
-- Name: Company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Company_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Company_id_seq" OWNER TO postgres;

--
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 220
-- Name: Company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Company_id_seq" OWNED BY public."Company".id;


--
-- TOC entry 221 (class 1259 OID 17640)
-- Name: Inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Inventory" (
    id integer NOT NULL,
    "warehouseId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Inventory" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17646)
-- Name: InventoryProduct; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."InventoryProduct" (
    id integer NOT NULL,
    "inventoryId" integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "minimumQuantity" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."InventoryProduct" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17652)
-- Name: InventoryProduct_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."InventoryProduct_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."InventoryProduct_id_seq" OWNER TO postgres;

--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 223
-- Name: InventoryProduct_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."InventoryProduct_id_seq" OWNED BY public."InventoryProduct".id;


--
-- TOC entry 224 (class 1259 OID 17653)
-- Name: Inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Inventory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Inventory_id_seq" OWNER TO postgres;

--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 224
-- Name: Inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Inventory_id_seq" OWNED BY public."Inventory".id;


--
-- TOC entry 225 (class 1259 OID 17654)
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    message text NOT NULL,
    "messageType" text NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17661)
-- Name: Notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notification_id_seq" OWNER TO postgres;

--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 226
-- Name: Notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notification_id_seq" OWNED BY public."Notification".id;


--
-- TOC entry 227 (class 1259 OID 17662)
-- Name: Permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Permission" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Permission" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17667)
-- Name: Permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Permission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Permission_id_seq" OWNER TO postgres;

--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 228
-- Name: Permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Permission_id_seq" OWNED BY public."Permission".id;


--
-- TOC entry 229 (class 1259 OID 17668)
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    sku text NOT NULL,
    price double precision NOT NULL,
    "categoryId" integer NOT NULL,
    "companyId" integer NOT NULL,
    "supplierId" integer NOT NULL,
    "statusId" integer NOT NULL,
    image_url text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "priceSell" double precision NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17674)
-- Name: ProductHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductHistory" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "categoryId" integer NOT NULL,
    "operationType" text NOT NULL,
    "companyId" integer NOT NULL,
    "changeDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProductHistory" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17681)
-- Name: ProductHistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductHistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductHistory_id_seq" OWNER TO postgres;

--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 231
-- Name: ProductHistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductHistory_id_seq" OWNED BY public."ProductHistory".id;


--
-- TOC entry 232 (class 1259 OID 17682)
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 232
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- TOC entry 233 (class 1259 OID 17683)
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17688)
-- Name: RolePermission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RolePermission" (
    "roleId" integer NOT NULL,
    "permissionId" integer NOT NULL
);


ALTER TABLE public."RolePermission" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17691)
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Role_id_seq" OWNER TO postgres;

--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 235
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- TOC entry 236 (class 1259 OID 17692)
-- Name: Status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Status" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Status" OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 17697)
-- Name: Status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Status_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Status_id_seq" OWNER TO postgres;

--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 237
-- Name: Status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Status_id_seq" OWNED BY public."Status".id;


--
-- TOC entry 238 (class 1259 OID 17698)
-- Name: Supplier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Supplier" (
    id integer NOT NULL,
    name text NOT NULL,
    "contactName" text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    image_url text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Supplier" OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 17704)
-- Name: Supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Supplier_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Supplier_id_seq" OWNER TO postgres;

--
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 239
-- Name: Supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Supplier_id_seq" OWNED BY public."Supplier".id;


--
-- TOC entry 240 (class 1259 OID 17705)
-- Name: Transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transaction" (
    id integer NOT NULL,
    "inventoryId" integer NOT NULL,
    "userId" integer NOT NULL,
    "statusId" integer NOT NULL,
    "transactionType" text NOT NULL,
    quantity integer NOT NULL,
    reason text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "productId" integer NOT NULL,
    "transactionCost" double precision NOT NULL
);


ALTER TABLE public."Transaction" OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 17711)
-- Name: TransactionHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TransactionHistory" (
    id integer NOT NULL,
    "transactionId" integer NOT NULL,
    "userId" integer NOT NULL,
    quantity integer NOT NULL,
    reason text NOT NULL,
    "operationType" text NOT NULL,
    "performedById" integer NOT NULL,
    "transactionDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."TransactionHistory" OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 17718)
-- Name: TransactionHistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TransactionHistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TransactionHistory_id_seq" OWNER TO postgres;

--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 242
-- Name: TransactionHistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TransactionHistory_id_seq" OWNED BY public."TransactionHistory".id;


--
-- TOC entry 243 (class 1259 OID 17719)
-- Name: Transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Transaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Transaction_id_seq" OWNER TO postgres;

--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 243
-- Name: Transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Transaction_id_seq" OWNED BY public."Transaction".id;


--
-- TOC entry 244 (class 1259 OID 17720)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    full_name text NOT NULL,
    "roleId" integer NOT NULL,
    "statusId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "companyId" integer NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 17726)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 245
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 246 (class 1259 OID 17727)
-- Name: Warehouse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Warehouse" (
    id integer NOT NULL,
    name text NOT NULL,
    location text NOT NULL,
    "companyId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Warehouse" OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 17733)
-- Name: Warehouse_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Warehouse_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Warehouse_id_seq" OWNER TO postgres;

--
-- TOC entry 5021 (class 0 OID 0)
-- Dependencies: 247
-- Name: Warehouse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Warehouse_id_seq" OWNED BY public."Warehouse".id;


--
-- TOC entry 248 (class 1259 OID 17734)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4719 (class 2604 OID 17741)
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- TOC entry 4721 (class 2604 OID 17742)
-- Name: Company id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company" ALTER COLUMN id SET DEFAULT nextval('public."Company_id_seq"'::regclass);


--
-- TOC entry 4723 (class 2604 OID 17743)
-- Name: Inventory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory" ALTER COLUMN id SET DEFAULT nextval('public."Inventory_id_seq"'::regclass);


--
-- TOC entry 4725 (class 2604 OID 17744)
-- Name: InventoryProduct id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InventoryProduct" ALTER COLUMN id SET DEFAULT nextval('public."InventoryProduct_id_seq"'::regclass);


--
-- TOC entry 4729 (class 2604 OID 17745)
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


--
-- TOC entry 4732 (class 2604 OID 17746)
-- Name: Permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Permission" ALTER COLUMN id SET DEFAULT nextval('public."Permission_id_seq"'::regclass);


--
-- TOC entry 4733 (class 2604 OID 17747)
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- TOC entry 4735 (class 2604 OID 17748)
-- Name: ProductHistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductHistory" ALTER COLUMN id SET DEFAULT nextval('public."ProductHistory_id_seq"'::regclass);


--
-- TOC entry 4738 (class 2604 OID 17749)
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- TOC entry 4739 (class 2604 OID 17750)
-- Name: Status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Status" ALTER COLUMN id SET DEFAULT nextval('public."Status_id_seq"'::regclass);


--
-- TOC entry 4740 (class 2604 OID 17751)
-- Name: Supplier id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Supplier" ALTER COLUMN id SET DEFAULT nextval('public."Supplier_id_seq"'::regclass);


--
-- TOC entry 4742 (class 2604 OID 17752)
-- Name: Transaction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction" ALTER COLUMN id SET DEFAULT nextval('public."Transaction_id_seq"'::regclass);


--
-- TOC entry 4744 (class 2604 OID 17753)
-- Name: TransactionHistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransactionHistory" ALTER COLUMN id SET DEFAULT nextval('public."TransactionHistory_id_seq"'::regclass);


--
-- TOC entry 4747 (class 2604 OID 17754)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 4749 (class 2604 OID 17755)
-- Name: Warehouse id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Warehouse" ALTER COLUMN id SET DEFAULT nextval('public."Warehouse_id_seq"'::regclass);


--
-- TOC entry 4968 (class 0 OID 17626)
-- Dependencies: 217
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, "createdAt", "updatedAt", description) FROM stdin;
1	Pinturas	2024-12-02 23:39:44.689	2024-12-02 23:39:44.689	Pinturas de alguien
2	Logos	2024-12-02 23:39:55.802	2024-12-02 23:39:55.802	Logos de algo o alguien
3	Logo Arica	2024-12-03 00:06:52.186	2024-12-03 00:06:52.186	Logo del equipo de arica
\.


--
-- TOC entry 4970 (class 0 OID 17633)
-- Dependencies: 219
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Company" (id, name, email, password, address, phone, website, image_url, "createdAt", "updatedAt") FROM stdin;
1	TestCompany	test@test.com	$2a$10$Lw8bDcstrdMzSxjmc1.26e0qdguP2/f2yl2XnP6UT3hEhhKLddXYi	Test Way	988959599	\N	\N	2024-10-10 19:29:06.631	2024-10-10 19:29:06.631
\.


--
-- TOC entry 4972 (class 0 OID 17640)
-- Dependencies: 221
-- Data for Name: Inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Inventory" (id, "warehouseId", "createdAt", "updatedAt", name) FROM stdin;
1	1	2024-12-02 23:43:24.538	2024-12-02 23:43:24.538	Pinturas
2	1	2024-12-02 23:43:42.025	2024-12-02 23:43:42.025	Logo
3	1	2024-12-03 00:07:07.047	2024-12-03 00:07:07.047	Logo de Arica
\.


--
-- TOC entry 4973 (class 0 OID 17646)
-- Dependencies: 222
-- Data for Name: InventoryProduct; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."InventoryProduct" (id, "inventoryId", "productId", quantity, "minimumQuantity", "createdAt", "updatedAt") FROM stdin;
1	1	1	1	15	2024-12-02 23:44:24.519	2024-12-02 23:45:28.541
2	1	2	2	15	2024-12-02 23:44:28.051	2024-12-02 23:45:33.33
3	2	3	3	100	2024-12-02 23:44:32.645	2024-12-02 23:45:38.577
4	1	4	0	15	2024-12-03 00:00:03.352	2024-12-03 00:03:33.575
5	3	5	5	40	2024-12-03 00:08:05.823	2024-12-03 00:08:13.666
\.


--
-- TOC entry 4976 (class 0 OID 17654)
-- Dependencies: 225
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, "userId", message, "messageType", read, "createdAt") FROM stdin;
\.


--
-- TOC entry 4978 (class 0 OID 17662)
-- Dependencies: 227
-- Data for Name: Permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Permission" (id, name, description) FROM stdin;
1	create_product	Permite a un usuario crear un nuevo producto en el sistema.
2	edit_product	Permite a un usuario modificar los detalles de un producto.
3	delete_product	Permite a un usuario eliminar productos del sistema.
4	view_transactions	Permite a un usuario ver todas las transacciones.
5	manage_users	Permite a un usuario crear, editar o eliminar otros usuarios.
6	manage_inventory	Permite a un usuario gestionar el inventario de la empresa.
7	manage_transactions	Puede gestionar transacciones
8	view_users	Puede ver usuarios
\.


--
-- TOC entry 4980 (class 0 OID 17668)
-- Dependencies: 229
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, description, sku, price, "categoryId", "companyId", "supplierId", "statusId", image_url, "createdAt", "updatedAt", "priceSell") FROM stdin;
1	Cuadro del Bonva	Cuadro fotorrealista del bonva	guru2015	8500	1	1	1	101	https://res.cloudinary.com/dlvfk1sdn/image/upload/v1733182857/products/pcwphhz8bqc55x1vhojw.jpg	2024-12-02 23:41:05.822	2024-12-02 23:41:05.822	13000
2	Caricatura Bonva	Cuadro de caricatura del Bonva	gurucaricatura2015	3500	1	1	1	101	https://res.cloudinary.com/dlvfk1sdn/image/upload/v1733182903/products/eudyei41wehrygl4v3jm.jpg	2024-12-02 23:41:51.713	2024-12-02 23:41:51.713	9000
3	Logo Cobreloa	Logo del Zorro del Desierto	cobreloa2015	1500	2	1	2	101	https://res.cloudinary.com/dlvfk1sdn/image/upload/v1733182961/products/min0ibvxiaotvzdtuccn.png	2024-12-02 23:42:50.1	2024-12-02 23:42:50.1	4500
4	Bonvallet	El Guru	elgurubonvallet2015	1500	1	1	1	101	https://res.cloudinary.com/dlvfk1sdn/image/upload/v1733183980/products/fpgnvhhn3pvro2djs3lo.jpg	2024-12-02 23:59:48.468	2024-12-02 23:59:48.468	5000
5	Arica	Logo del equipo de Arica	sma2007	1500	3	1	3	101	https://res.cloudinary.com/dlvfk1sdn/image/upload/v1733184465/products/brrimzystt3igh1wco8i.png	2024-12-03 00:07:53.772	2024-12-03 00:07:53.772	3000
\.


--
-- TOC entry 4981 (class 0 OID 17674)
-- Dependencies: 230
-- Data for Name: ProductHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductHistory" (id, "productId", name, price, "categoryId", "operationType", "companyId", "changeDate", "createdAt") FROM stdin;
\.


--
-- TOC entry 4984 (class 0 OID 17683)
-- Dependencies: 233
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, name, description) FROM stdin;
4	Viewer	Tiene solo acceso de lectura, es decir, puede ver información pero no modificar nada.
1	Admin	Tiene acceso total a todas las funcionalidades del sistema, puede gestionar usuarios, productos, transacciones, etc.
2	Manager	Tiene acceso a la gestión de ciertos recursos como productos, inventarios, y reportes, pero no puede gestionar la configuración global del sistema o administrar usuarios.
3	Employee	Tiene acceso limitado a realizar acciones relacionadas con su trabajo, como gestionar productos o ver ciertos datos, pero sin permisos para modificar configuraciones importantes.
\.


--
-- TOC entry 4985 (class 0 OID 17688)
-- Dependencies: 234
-- Data for Name: RolePermission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RolePermission" ("roleId", "permissionId") FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
1	8
2	1
2	2
2	3
2	4
2	6
2	7
3	1
3	2
3	4
3	7
4	8
4	4
\.


--
-- TOC entry 4987 (class 0 OID 17692)
-- Dependencies: 236
-- Data for Name: Status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Status" (id, name, description) FROM stdin;
1	Activo	Usuario Activo
0	Inactivo	Usuario Inactivo
2	Pendiente	Usuario Pendiente
3	Suspendido	Usuario Suspendido
4	Eliminado	Usuario Eliminado
101	Disponible	Producto Disponible
100	Agotado	Producto Agotado
102	Descontinuado	Producto Descontinuado
103	Pendiente de Aprobacion	Producto Pendiente de Aprobacion
104	Danhado	Producto Danhado
105	Reservado	Producto Reservado
201	Completado	Transaccion Completada
200	Cancelado	Transaccion Cancelada
202	Pendiente Trans	Transaccion Pendiente
203	En Progreso	Transaccion en Progreso
204	Fallido	Transaccion Fallida
\.


--
-- TOC entry 4989 (class 0 OID 17698)
-- Dependencies: 238
-- Data for Name: Supplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Supplier" (id, name, "contactName", email, phone, address, image_url, "createdAt", "updatedAt") FROM stdin;
1	BonvaSport	Eduardo Bonvallet	eduardobonvallet@contact.com	988959599	El Guru #2015	\N	2024-12-02 23:38:40.919	2024-12-02 23:38:40.919
2	CobreSport	El Zorro del Desierto	cdcobreloa@contacto.com	929186315	Calama	\N	2024-12-02 23:39:19.002	2024-12-02 23:39:19.002
3	AricaSport	Arica siempre Arica	arica@contact.com	9889499449	7 de Junio	\N	2024-12-03 00:06:31.617	2024-12-03 00:06:31.617
\.


--
-- TOC entry 4991 (class 0 OID 17705)
-- Dependencies: 240
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Transaction" (id, "inventoryId", "userId", "statusId", "transactionType", quantity, reason, "createdAt", "productId", "transactionCost") FROM stdin;
1	1	1	201	purchase	5	Compra de producto	2024-12-02 23:44:24.52	1	-42500
2	1	1	201	purchase	5	Compra de producto	2024-12-02 23:44:28.052	2	-17500
3	2	1	201	purchase	5	Compra de producto	2024-12-02 23:44:32.645	3	-7500
4	1	1	201	sale	4	Venta de producto	2024-12-02 23:45:28.541	1	52000
5	1	1	201	sale	3	Venta de producto	2024-12-02 23:45:33.331	2	27000
6	2	1	201	sale	2	Venta de producto	2024-12-02 23:45:38.577	3	9000
7	1	1	201	purchase	5	Compra de producto	2024-12-03 00:00:03.353	4	-7500
8	1	1	201	sale	5	Venta de producto	2024-12-03 00:03:33.577	4	25000
9	3	1	201	purchase	5	Compra de producto	2024-12-03 00:08:05.823	5	-7500
\.


--
-- TOC entry 4992 (class 0 OID 17711)
-- Dependencies: 241
-- Data for Name: TransactionHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TransactionHistory" (id, "transactionId", "userId", quantity, reason, "operationType", "performedById", "transactionDate", "createdAt") FROM stdin;
\.


--
-- TOC entry 4995 (class 0 OID 17720)
-- Dependencies: 244
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, email, password, full_name, "roleId", "statusId", "createdAt", "updatedAt", "companyId") FROM stdin;
1	test	test@gmail.com	$2a$10$Lw8bDcstrdMzSxjmc1.26e0qdguP2/f2yl2XnP6UT3hEhhKLddXYi	Test User	1	1	2024-10-11 03:18:16.24	2024-10-28 07:21:38.279	1
\.


--
-- TOC entry 4997 (class 0 OID 17727)
-- Dependencies: 246
-- Data for Name: Warehouse; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Warehouse" (id, name, location, "companyId", "createdAt") FROM stdin;
1	Bodega Principal	Senora Way 3056	1	2024-12-02 23:43:16.623
\.


--
-- TOC entry 4999 (class 0 OID 17734)
-- Dependencies: 248
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.


--
-- TOC entry 5022 (class 0 OID 0)
-- Dependencies: 218
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 3, true);


--
-- TOC entry 5023 (class 0 OID 0)
-- Dependencies: 220
-- Name: Company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Company_id_seq"', 1, true);


--
-- TOC entry 5024 (class 0 OID 0)
-- Dependencies: 223
-- Name: InventoryProduct_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."InventoryProduct_id_seq"', 5, true);


--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 224
-- Name: Inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Inventory_id_seq"', 3, true);


--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 226
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 1, false);


--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 228
-- Name: Permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Permission_id_seq"', 1, false);


--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 231
-- Name: ProductHistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductHistory_id_seq"', 1, false);


--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 232
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 1, false);


--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 235
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 1, false);


--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 237
-- Name: Status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Status_id_seq"', 1, false);


--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 239
-- Name: Supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Supplier_id_seq"', 3, true);


--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 242
-- Name: TransactionHistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TransactionHistory_id_seq"', 1, false);


--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 243
-- Name: Transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Transaction_id_seq"', 1, false);


--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 245
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 247
-- Name: Warehouse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Warehouse_id_seq"', 1, true);


--
-- TOC entry 4755 (class 2606 OID 17757)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- TOC entry 4759 (class 2606 OID 17759)
-- Name: Company Company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY (id);


--
-- TOC entry 4765 (class 2606 OID 17761)
-- Name: InventoryProduct InventoryProduct_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InventoryProduct"
    ADD CONSTRAINT "InventoryProduct_pkey" PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 17763)
-- Name: Inventory Inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY (id);


--
-- TOC entry 4767 (class 2606 OID 17765)
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- TOC entry 4770 (class 2606 OID 17767)
-- Name: Permission Permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Permission"
    ADD CONSTRAINT "Permission_pkey" PRIMARY KEY (id);


--
-- TOC entry 4775 (class 2606 OID 17769)
-- Name: ProductHistory ProductHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductHistory"
    ADD CONSTRAINT "ProductHistory_pkey" PRIMARY KEY (id);


--
-- TOC entry 4772 (class 2606 OID 17771)
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- TOC entry 4780 (class 2606 OID 17773)
-- Name: RolePermission RolePermission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId", "permissionId");


--
-- TOC entry 4778 (class 2606 OID 17775)
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 17777)
-- Name: Status Status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Status"
    ADD CONSTRAINT "Status_pkey" PRIMARY KEY (id);


--
-- TOC entry 4786 (class 2606 OID 17779)
-- Name: Supplier Supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Supplier"
    ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY (id);


--
-- TOC entry 4790 (class 2606 OID 17781)
-- Name: TransactionHistory TransactionHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransactionHistory"
    ADD CONSTRAINT "TransactionHistory_pkey" PRIMARY KEY (id);


--
-- TOC entry 4788 (class 2606 OID 17783)
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- TOC entry 4793 (class 2606 OID 17785)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4796 (class 2606 OID 17787)
-- Name: Warehouse Warehouse_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Warehouse"
    ADD CONSTRAINT "Warehouse_pkey" PRIMARY KEY (id);


--
-- TOC entry 4798 (class 2606 OID 17789)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4753 (class 1259 OID 17790)
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- TOC entry 4756 (class 1259 OID 17791)
-- Name: Company_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Company_email_key" ON public."Company" USING btree (email);


--
-- TOC entry 4757 (class 1259 OID 17792)
-- Name: Company_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Company_name_key" ON public."Company" USING btree (name);


--
-- TOC entry 4763 (class 1259 OID 17793)
-- Name: InventoryProduct_inventoryId_productId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "InventoryProduct_inventoryId_productId_key" ON public."InventoryProduct" USING btree ("inventoryId", "productId");


--
-- TOC entry 4760 (class 1259 OID 17794)
-- Name: Inventory_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Inventory_name_key" ON public."Inventory" USING btree (name);


--
-- TOC entry 4768 (class 1259 OID 17795)
-- Name: Permission_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Permission_name_key" ON public."Permission" USING btree (name);


--
-- TOC entry 4773 (class 1259 OID 17796)
-- Name: Product_sku_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_sku_key" ON public."Product" USING btree (sku);


--
-- TOC entry 4776 (class 1259 OID 17797)
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- TOC entry 4781 (class 1259 OID 17798)
-- Name: Status_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Status_name_key" ON public."Status" USING btree (name);


--
-- TOC entry 4784 (class 1259 OID 17799)
-- Name: Supplier_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Supplier_email_key" ON public."Supplier" USING btree (email);


--
-- TOC entry 4791 (class 1259 OID 17800)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4794 (class 1259 OID 17801)
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- TOC entry 4800 (class 2606 OID 17802)
-- Name: InventoryProduct InventoryProduct_inventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InventoryProduct"
    ADD CONSTRAINT "InventoryProduct_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES public."Inventory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4801 (class 2606 OID 17807)
-- Name: InventoryProduct InventoryProduct_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InventoryProduct"
    ADD CONSTRAINT "InventoryProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4799 (class 2606 OID 17812)
-- Name: Inventory Inventory_warehouseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventory"
    ADD CONSTRAINT "Inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES public."Warehouse"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4802 (class 2606 OID 17817)
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4807 (class 2606 OID 17822)
-- Name: ProductHistory ProductHistory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductHistory"
    ADD CONSTRAINT "ProductHistory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4808 (class 2606 OID 17827)
-- Name: ProductHistory ProductHistory_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductHistory"
    ADD CONSTRAINT "ProductHistory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4809 (class 2606 OID 17832)
-- Name: ProductHistory ProductHistory_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductHistory"
    ADD CONSTRAINT "ProductHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4803 (class 2606 OID 17837)
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4804 (class 2606 OID 17842)
-- Name: Product Product_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4805 (class 2606 OID 17847)
-- Name: Product Product_statusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES public."Status"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4806 (class 2606 OID 17852)
-- Name: Product Product_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."Supplier"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4810 (class 2606 OID 17857)
-- Name: RolePermission RolePermission_permissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public."Permission"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4811 (class 2606 OID 17862)
-- Name: RolePermission RolePermission_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RolePermission"
    ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4816 (class 2606 OID 17867)
-- Name: TransactionHistory TransactionHistory_performedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransactionHistory"
    ADD CONSTRAINT "TransactionHistory_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4817 (class 2606 OID 17872)
-- Name: TransactionHistory TransactionHistory_transactionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransactionHistory"
    ADD CONSTRAINT "TransactionHistory_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES public."Transaction"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4818 (class 2606 OID 17877)
-- Name: TransactionHistory TransactionHistory_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransactionHistory"
    ADD CONSTRAINT "TransactionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4812 (class 2606 OID 17882)
-- Name: Transaction Transaction_inventoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES public."Inventory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4813 (class 2606 OID 17887)
-- Name: Transaction Transaction_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4814 (class 2606 OID 17892)
-- Name: Transaction Transaction_statusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES public."Status"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4815 (class 2606 OID 17897)
-- Name: Transaction Transaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4819 (class 2606 OID 17902)
-- Name: User User_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4820 (class 2606 OID 17907)
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4821 (class 2606 OID 17912)
-- Name: User User_statusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES public."Status"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4822 (class 2606 OID 17917)
-- Name: Warehouse Warehouse_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Warehouse"
    ADD CONSTRAINT "Warehouse_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-12-03 01:13:34

--
-- PostgreSQL database dump complete
--

