-- SQL script to create the schema for hoot's database and populate it with some example values

DROP TABLE IF EXISTS Users, Hoots, Replies, Drafts CASCADE;

CREATE TABLE Users (
	uid 			INTEGER,
    name			TEXT,
    username		TEXT,
    password		TEXT,
    email			TEXT,
	PRIMARY KEY (uid)
);

CREATE TABLE Hoots (
	hid 			INTEGER,
	uid				INTEGER,
    content			TEXT,
	PRIMARY KEY (hid)
);

CREATE TABLE Drafts (
	did 			INTEGER,
	uid				INTEGER,
    content			TEXT,
	PRIMARY KEY (did)
);

CREATE TABLE Replies (
	rid 			INTEGER,
	hid				INTEGER,
    uid				INTEGER,
    content			TEXT,
	PRIMARY KEY (rid)
);

INSERT  INTO Users VALUES 
(0, 'Darin Loh Han Sum', 'darinlohsexy', 'darintoosexy', 'darindamnsexy@sexymail.com'),
(1, 'Tan Chin Kiat', 'chinkiatsexy', 'chinsexy', 'chindamnsexy@sexymail.com'),
(2, 'Thumb Jin Lin', 'jinlinsexy', 'jinlintoosexy', 'jinlindamnsexy@sexymail.com'),
(3, 'Andy Lamb', 'andysexy', 'andytoosexy', 'andydamnsexy@sexymail.com');

INSERT  INTO Hoots VALUES 
(0, 2, 'What should i do about this?'),
(1, 0, 'Why am I so handsome?'),
(2, 2, 'I might be too smart?'),
(3, 3, 'I like pigs, what should I do?'),
(4, 0, 'I am kinda hungry, what should I eat?');

INSERT  INTO Drafts VALUES 
(0, 0, 'Is this the real life?'),
(1, 0, 'Or is this just fantasy?'),
(2, 0, 'Caught in a landslide?'),
(3, 3, 'No escape from reality?'),
(4, 0, 'Am I queen?');

INSERT  INTO Replies VALUES 
(0, 2, 2, 'You should get a girlfriend!'),
(1, 1, 3, 'Good to be confident!'),
(2, 4, 1, 'Get some pizza!'),
(3, 1, 3, 'I am pretty handsome too!'),
(4, 1, 2, 'I agree!');
