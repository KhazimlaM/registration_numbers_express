sudo -u postgres createdb registration;
sudo -u postgres createuser pythagorus;
 

create table towns (
	id serial primary key,
	town text not null,
    town_code text not null
);

create table registrationNumbers (
	id serial not null primary key,
    RegNumbers text not null,
    registration_code int not null,
    foreign key (registration_code) references towns (id)
   
);

