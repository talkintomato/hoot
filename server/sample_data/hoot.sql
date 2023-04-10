-- SQL script to create the schema for hoot's database

DROP TABLE IF EXISTS Users, Hoots, Replies, Drafts CASCADE;

CREATE TABLE Users (
	uid 			VARCHAR(36),
    username		TEXT,
    hashed_password	TEXT,
    email			TEXT,
	PRIMARY KEY (uid)
);

CREATE TABLE Hoots (
	hid 			VARCHAR(36),
	uid				VARCHAR(36) REFERENCES Users,
    content			TEXT,
	PRIMARY KEY (hid)
);

CREATE TABLE Drafts (
	did 			VARCHAR(36),
	uid				VARCHAR(36) REFERENCES Users,
    content			TEXT,
	PRIMARY KEY (did)
);

CREATE TABLE Replies (
	rid 			VARCHAR(36),
	hid				VARCHAR(36) REFERENCES Hoots,
    uid				VARCHAR(36) REFERENCES Users,
    content			TEXT,
	PRIMARY KEY (rid)
);
