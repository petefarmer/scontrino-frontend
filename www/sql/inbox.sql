CREATE TABLE inbox(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255),
	address VARCHAR(255),
	filename VARCHAR(255),
	ocr_text TEXT,
	PRIMARY KEY (id)
);
