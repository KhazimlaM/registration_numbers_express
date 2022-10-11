sudo -u postgres createdb registration;
sudo -u postgres createuser pythagorus;
 

create table town (
	id serial primary key,
	Halmesbay text not null,
    Bellville text not null,
    CapeTown text not null
);

create table registrationNumbers (
	id serial not null primary key,
    town_id integer not null,
    RegNumbers text not null,
    foreign key (town_id) references town (id)
   
);