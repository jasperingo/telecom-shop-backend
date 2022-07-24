--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-07-20 17:35:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 839 (class 1247 OID 40975)
-- Name: admin_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.admin_role AS ENUM (
    'super',
    'sub'
);


ALTER TYPE public.admin_role OWNER TO postgres;

--
-- TOC entry 863 (class 1247 OID 41175)
-- Name: transaction_deposit_method; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.transaction_deposit_method AS ENUM (
    'direct',
    'paystack'
);


ALTER TYPE public.transaction_deposit_method OWNER TO postgres;

--
-- TOC entry 857 (class 1247 OID 41124)
-- Name: transaction_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.transaction_status AS ENUM (
    'created',
    'pending',
    'failed',
    'approved'
);


ALTER TYPE public.transaction_status OWNER TO postgres;

--
-- TOC entry 854 (class 1247 OID 41118)
-- Name: transaction_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.transaction_type AS ENUM (
    'deposit',
    'payment',
    'bonus'
);


ALTER TYPE public.transaction_type OWNER TO postgres;

--
-- TOC entry 833 (class 1247 OID 32784)
-- Name: user_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_status AS ENUM (
    'activated',
    'deactivated'
);


ALTER TYPE public.user_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 41022)
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name text NOT NULL,
    api_code integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 41021)
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brands_id_seq OWNER TO postgres;

--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 213
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- TOC entry 216 (class 1259 OID 41082)
-- Name: photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photos (
    id integer NOT NULL,
    brand_id integer,
    name text NOT NULL,
    mimetype text NOT NULL,
    size double precision NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.photos OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 41081)
-- Name: photos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_id_seq OWNER TO postgres;

--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 215
-- Name: photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.photos_id_seq OWNED BY public.photos.id;


--
-- TOC entry 218 (class 1259 OID 41097)
-- Name: product_units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_units (
    id integer NOT NULL,
    brand_id integer NOT NULL,
    product_id integer NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    duration integer,
    api_code integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    available boolean DEFAULT true,
    type text
);


ALTER TABLE public.product_units OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 41096)
-- Name: product_units_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_units_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_units_id_seq OWNER TO postgres;

--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 217
-- Name: product_units_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_units_id_seq OWNED BY public.product_units.id;


--
-- TOC entry 212 (class 1259 OID 40980)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    available boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 40979)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 211
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 220 (class 1259 OID 41154)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_unit_id integer,
    reference text NOT NULL,
    amount double precision NOT NULL,
    type public.transaction_type NOT NULL,
    status public.transaction_status NOT NULL,
    recipient_number text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fee double precision NOT NULL,
    deposit_method public.transaction_deposit_method,
    referral_id integer
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 41153)
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_id_seq OWNER TO postgres;

--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 219
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- TOC entry 210 (class 1259 OID 32790)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone_number text NOT NULL,
    password text NOT NULL,
    status public.user_status NOT NULL,
    admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    admin_role public.admin_role,
    password_reset_token text,
    referral_id integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 32789)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3210 (class 2604 OID 41025)
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 41085)
-- Name: photos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos ALTER COLUMN id SET DEFAULT nextval('public.photos_id_seq'::regclass);


--
-- TOC entry 3214 (class 2604 OID 41100)
-- Name: product_units id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_units ALTER COLUMN id SET DEFAULT nextval('public.product_units_id_seq'::regclass);


--
-- TOC entry 3207 (class 2604 OID 40983)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 41157)
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 32793)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3382 (class 0 OID 41022)
-- Dependencies: 214
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (id, name, api_code, created_at) FROM stdin;
2	GLO	2	2022-06-11 20:52:37.787375
3	GOTV	1	2022-06-11 20:54:22.380926
1	MTN	1	2022-06-11 20:17:56.433059
4	9mobile	4	2022-07-01 15:40:13.336802
\.


--
-- TOC entry 3384 (class 0 OID 41082)
-- Dependencies: 216
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photos (id, brand_id, name, mimetype, size, created_at) FROM stdin;
2	2	3wHWBpBJCSnLgKcU3sXH7Rf3C3neoopa.jpg	image/jpeg	5767	2022-06-11 20:52:20.941208
3	3	qwaAudDJDfYfyHajEYWstGagtZEuE7Yz.png	image/png	2322	2022-06-11 20:53:09.583552
4	\N	5YtMSS9V7kF6CAh06iHAvCP0vAGEVYpo.jpg	image/jpeg	20206	2022-06-11 22:56:03.898229
1	1	lw4onXbaxZNrzlnAgpLpYMA1CaycjHbS.jpg	image/jpeg	20206	2022-06-11 16:03:51.033556
5	4	RCuQesm9GACAX3fGihgLqdstjlOBfrda.jpg	image/jpeg	5543	2022-07-01 15:40:13.287196
6	\N	XDaQwx5gPSCgvjERjHWMp89YkmkxPDiv.jpg	image/jpeg	6423	2022-07-01 15:41:17.426736
\.


--
-- TOC entry 3386 (class 0 OID 41097)
-- Dependencies: 218
-- Data for Name: product_units; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_units (id, brand_id, product_id, name, price, duration, api_code, created_at, available, type) FROM stdin;
3	1	1	1.0GB	230.5	30	7	2022-06-11 22:59:20.207354	t	SME
4	1	1	2.0GB	460	30	8	2022-06-11 23:06:57.931198	f	SME
2	1	1	500MB	128	30	212	2022-06-11 22:50:03.818506	t	CORPORATE GIFTING
5	2	2	NGN 100	100	\N	0	2022-06-21 02:12:35.749537	t	VTU
6	3	3	GOTV Max	2500	30	3	2022-06-22 11:33:07.531057	t	\N
7	3	3	GOTV prime	5500	30	32	2022-07-03 21:54:48.726291	f	\N
8	3	3	GOTV pro max	7600	30	31	2022-07-04 09:49:26.336315	t	[null]
9	2	1	600MB	200	21	21	2022-07-15 17:18:27.085284	t	SME
10	2	1	1200MB	740	30	23	2022-07-15 17:19:23.189671	t	SME
\.


--
-- TOC entry 3380 (class 0 OID 40980)
-- Dependencies: 212
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, available, created_at) FROM stdin;
3	Cable subscription	Buy subscription to your television cable	t	2022-06-10 22:48:00.947661
4	Electricity payment	Pay for your electricity bills	t	2022-06-10 22:48:00.947661
1	Internet data	Buy data to browse the internet	t	2022-06-10 22:48:00.947661
2	Call airtime	Buy airtime to make phone calls in Nigeria	t	2022-06-10 22:48:00.947661
\.


--
-- TOC entry 3388 (class 0 OID 41154)
-- Dependencies: 220
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, user_id, product_unit_id, reference, amount, type, status, recipient_number, created_at, fee, deposit_method, referral_id) FROM stdin;
18	5	\N	O5x9wHyT3htx5Nu8gKfxaYP6koOWOjlC	500	deposit	approved	\N	2022-06-29 13:03:43.098302	0	direct	\N
1	3	\N	uHUo2EV7MDotzbYZNPbHUVzb9Hrc9l3T	2000	deposit	approved	\N	2022-06-20 02:54:38.557234	0	\N	\N
2	3	\N	eQRzIp0mJGsPlInTgbN1z0R0ev1letbP	1500	deposit	created	\N	2022-06-20 02:56:17.989921	0	\N	\N
10	3	2	fP3rxYxoxPDwBHsbK87BLBxAyq0hO3SM	-128	payment	approved	09030572411	2022-06-21 00:52:53.288085	0	\N	\N
11	3	2	WQI3edPQnmMRSyyKRk9wTxAvfOBzJiaT	-128	payment	approved	09030572411	2022-06-21 00:56:33.433424	0	\N	\N
12	3	2	chQeLcj5IglDMTUnxBtTUk1pxJd9RZxa	-128	payment	approved	09030572411	2022-06-21 00:59:22.258992	0	\N	\N
13	3	3	md56YOvYQrIhMayHf9xP1AqLelW9mQDt	-230.5	payment	approved	09030572411	2022-06-21 01:04:18.028042	0	\N	\N
14	3	5	QX2ve9Oqxt72vju8YZIxdqOyGn0VyiUL	-100	payment	approved	09030572411	2022-06-21 01:54:45.674235	0	\N	\N
15	3	2	rdPWOSvJjU8KndTJ4fNSM2fPChlUjVTE	-128	payment	approved	jndjfdsjlfjsdl	2022-06-21 10:15:01.550696	0	\N	\N
16	3	2	H5jhNM1N19w7lvwfcDSN8taUqpnXOnit	-128	payment	approved	IDU938JSIJ	2022-06-21 10:29:28.506044	0	\N	\N
17	2	\N	OujUnUaE6bNSIGqjYaJk93wJJWLsyUf3	500	deposit	approved	\N	2022-06-21 11:03:32.869603	0	\N	\N
19	4	\N	IiT0bHOx36h0YYOCix9yP5ryEP7N4V6l	1200	deposit	approved	\N	2022-06-30 22:34:50.601379	0	direct	\N
20	2	2	tPdL0jntm9M8adiu1t6sHujKB1b9fFQu	-128	payment	approved	09030572411	2022-07-04 22:14:50.791322	0	\N	\N
21	2	\N	4UeS8qUF5HA6rXAWeoammU4Woilu6pkH	10000	deposit	created	\N	2022-07-05 09:56:41.580773	32.5	paystack	\N
22	2	\N	406vcBgoQxt4uYdmCbbpnnvsFTilF8QK	10000	deposit	created	\N	2022-07-05 09:57:23.59679	32.5	paystack	\N
23	2	\N	x7lWc4aVzk5N2GfiKjcUPU4bSsN7Rnu7	10000	deposit	created	\N	2022-07-05 09:57:48.790031	32.5	paystack	\N
24	2	\N	zWGwqOhZsmbKdFPaCZTPY87RhKdyxT71	10000	deposit	pending	\N	2022-07-05 10:01:28.005254	32.5	paystack	\N
25	2	\N	AdmipixI6yIFmm9iov38NYCHF2o9MXm3	3500	deposit	pending	\N	2022-07-05 10:15:29.579987	32.5	paystack	\N
26	5	\N	RYS_M9LTG1WHL5	500	deposit	approved	\N	2022-07-05 12:18:11.939336	0	direct	\N
27	2	\N	RYS_8NRCQKQ6PD	2100	deposit	pending	\N	2022-07-05 12:29:09.616139	12.5	paystack	\N
28	7	\N	RYS_8ZW3Z6GJYG	3000	deposit	approved	\N	2022-07-15 16:12:48.484083	32.5	paystack	\N
29	2	\N	RYS_I7PMHBS7AQ	30	bonus	approved	\N	2022-07-15 16:16:19.701611	0	\N	7
30	7	\N	RYS_7WNZUHMG2G	4000	deposit	approved	\N	2022-07-15 16:17:22.348004	32.5	paystack	\N
\.


--
-- TOC entry 3378 (class 0 OID 32790)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, phone_number, password, status, admin, created_at, admin_role, password_reset_token, referral_id) FROM stdin;
3	Fred	Ben	fred@gmail.com	09030572412	$2b$10$PLvuxK9cgp8ZlIgJykFSZO7Ks3iS/tykBGLfNTZTte3WLrk6Vs1aS	activated	f	2022-06-09 16:09:51.626335	\N	\N	\N
5	Peace	Buns	peacebuns@gmail.com	09032094822	$2b$10$G5239xZ33QEk/nVC4O7FJepJiLvnB.X7FhdoXZkTCkMPtdZKLQkm2	activated	f	2022-06-22 13:54:43.98224	\N	\N	\N
4	Jane	Doe	janedoe@gmail.com	07030572411	$2b$10$Wc1wqpqYi.iNuFxmxYdzxuZvKez1b2RLzLLAzDYyDUDsHKaR5x3Y.	activated	f	2022-06-22 13:26:25.963052	\N	\N	\N
2	Jasper	Anelechukwu	jasperanels@gmail.com	09030572411	$2b$10$5IUTUAt/xg4nI5BQmSDU6uSaE32agRr7PlFLV7sZ9Zi3agjJNdVZS	activated	t	2022-06-08 23:36:57.964726	super	U07TVY	\N
7	John	Black	johnblack@gmail.com	09030572421	$2b$10$vvUPjc6S20AELrnrgsZ8mOraIboSLDsSMpdmiBVAowlhgpwrL73ya	activated	f	2022-07-15 15:16:00.124663	\N	\N	2
8	Tina	Fisher	tinafisher@yahoo.com	08082838488	$2b$10$4SaYyL57HqRAZsHjIpdV4eRJ4ZAd/Gi6KIA0eyhcEutydaCYuc2om	activated	f	2022-07-15 22:57:12.001356	\N	\N	2
\.


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 213
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 4, true);


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 215
-- Name: photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.photos_id_seq', 6, true);


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 217
-- Name: product_units_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_units_id_seq', 10, true);


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 211
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 4, true);


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 219
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 30, true);


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- TOC entry 3224 (class 2606 OID 41030)
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- TOC entry 3226 (class 2606 OID 41090)
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- TOC entry 3228 (class 2606 OID 41105)
-- Name: product_units product_units_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_pkey PRIMARY KEY (id);


--
-- TOC entry 3222 (class 2606 OID 40989)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 41162)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 3220 (class 2606 OID 32799)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3232 (class 2606 OID 41091)
-- Name: photos photos_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id);


--
-- TOC entry 3233 (class 2606 OID 41106)
-- Name: product_units product_units_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id);


--
-- TOC entry 3234 (class 2606 OID 41111)
-- Name: product_units product_units_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_units
    ADD CONSTRAINT product_units_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 3236 (class 2606 OID 41168)
-- Name: transactions transactions_product_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_product_unit_id_fkey FOREIGN KEY (product_unit_id) REFERENCES public.product_units(id);


--
-- TOC entry 3237 (class 2606 OID 41185)
-- Name: transactions transactions_referral_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_referral_id_fkey FOREIGN KEY (referral_id) REFERENCES public.users(id);


--
-- TOC entry 3235 (class 2606 OID 41163)
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3231 (class 2606 OID 41179)
-- Name: users users_referral_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_referral_id_fkey FOREIGN KEY (referral_id) REFERENCES public.users(id);


-- Completed on 2022-07-20 17:35:02

--
-- PostgreSQL database dump complete
--

