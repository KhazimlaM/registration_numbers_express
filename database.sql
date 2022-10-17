sudo -u postgres createdb registration;
sudo -u postgres createuser pythagorus;
 

create table towns (
	id serial primary key,
	town text not null,
    town_code text not null
);

create table registrationNumbers (
	id serial primary key,
    RegNumbers text not null,
    town_id int not null,
    foreign key (town_id) references towns (id)
);

INSERT INTO towns (town, town_code) 
VALUES ('Cape Town', 'CA'),
('Belville', 'CJ'),
('Paarl', 'CY');