CREATE TABLE product_cat(
    cat_name VARCHAR(20) PRIMARY KEY
);

CREATE TABLE provinces(
    name VARCHAR(20) PRIMARY KEY
);

CREATE TABLE suppliers(
    supplier_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    contact_name VARCHAR(50),
    contact_phone VARCHAR(12),
    street_address VARCHAR(50),
    city VARCHAR(30),
    prov VARCHAR(20),
    postal_code VARCHAR(7),
    FOREIGN KEY (prov) REFERENCES provinces(name)
);

CREATE TABLE warehouses(
    name VARCHAR(50) PRIMARY KEY,
    street_address VARCHAR(50),
    city VARCHAR(30)
    prov VARCHAR(20)
    postal_code VARCHAR(7),
    FOREIGN KEY (prov) REFERENCES provinces(name)
);

CREATE TABLE inventory(
    item_id VARCHAR(20) PRIMARY KEY,
    item_name VARCHAR(50),
    category VARCHAR(50),
    supplier_id VARCHAR(50),
    w_unit_price INTEGER,
    r_unit_price INTEGER,
    warehouse VARCHAR(50),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    FOREIGN KEY (category) REFERENCES product_cat(cat_name),
    FOREIGN KEY (warehouse) REFERENCES warehouses(name)
);

INSERT INTO provinces
VALUES('Alberta', 'AB'),
('Quebec', 'QC'),
('New Brunswick', 'NB'),
('Manitoba', 'MB'),
('British Columbia', 'BC'),
('Prince Edward Island', 'PE'),
('Saskatchewan', 'SK'),
('Newfoundland and Labrador', 'NL'),
('Northwest Territories', 'NT'),
('Yukon', 'YT'),
('Nunavut', 'NU'),
('Nova Scotia', 'NS')

INSERT INTO product_cat
VALUES('Sporting Goods'),
('Kitchen'),
('Home'),
('Seasonal'),
('Automotive'),
('Hardware'),
('Apparel'),
('Ontario', 'ON');

INSERT INTO public.suppliers(
	supplier_id, name, contact_name, contact_phone, street_address, city, prov, postal_code)
	VALUES ('1234', 'Sporting Goods Distributor LTD.', 'Bob Truman', 7786489284, '12 Main St', 'Hamilton', 'Ontario', 'L8P 4S8'),
	('6543', 'Hardware and More', 'Joe Hammer', 6046668888, '14 Granville St', 'Vancouver', 'British Columbia', 'V5N 5L9'),
	('9843', 'Home and Kitchen Supplies', 'Jamie Oliver', 7785559999, '16 Arbutus St', 'Vancouver', 'British Columbia', 'V5R 5L8');
	
INSERT INTO public.warehouses(
	name, street_address, city, prov, postal_code)
	VALUES ('Metro Van Storage', '555 Industrial ave', 'Burnaby', 'British Columbia', 'V5N 5L9'),
	('Hamilton Warehouse Services', '222 Main St', 'Hamilton', 'Ontario', 'L8P 4S8'),
	('Giga Warehouse', '444 Forgotten Ave', 'Prince George', 'British Columbia', 'V5R 5L8');
	

INSERT INTO public.inventory(
	item_id, item_name, category, supplier_id, w_unit_price, r_unit_price, warehouse)
	VALUES ('k-111', 'Cuisineart Steak Knife Set', 'Kitchen', '9843', '10000', '15000', 'Metro Van Storage'),
	('k-222', 'Kitchen AidBlender', 'Kitchen', '9843', '28000', '30000', 'Giga Warehouse'),
	('h-111', 'Martha Stewwart Cushions', 'Home', '9843', '2000', '4000', 'Metro Van Storage'),
	('h-222', 'Article Patio Chair', 'Home', '9843', '5000', '15000', 'Giga Warehouse'),
	('s-111', 'Joy Christmas Tree', 'Seasonal', '9843', '8400', '11000', 'Metro Van Storage'),
	('s-222', 'Joy Christmas Lights', 'Seasonal', '9843', '2000', '4500', 'Hamilton Warehouse Services'),
	('a-111', 'Kenda Winter Tires', 'Automotive', '6543', '60000', '78000', 'Metro Van Storage'),
	('a-222', 'Goodyear Rims', 'Automotive', '6543', '50000', '65000', 'Hamilton Warehouse Services'),
	('hw-111', 'Hard Hammer', 'Hardware', '6543', '3000', '4500', 'Metro Van Storage'),
	('hw-222', 'K3 Screw Driver', 'Hardware', '6543', '500', '1000', 'Hamilton Warehouse Services'),
	('ap-111', 'North Face Jacket', 'Apparel', '1234', '8000', '16000', 'Giga Warehouse'),
	('ap-222', 'Columbia Pants', 'Apparel', '1234', '5000', '10000', 'Metro Van Storage'),
	('sg-111', 'Adidas ball', 'Sporting Goods', '1234', '2000', '4000', 'Hamilton Warehouse Services'),
	('dg-222', 'North Face Tent', 'Sporting Goods', '1234', '40000', '60000', 'Hamilton Warehouse Services');