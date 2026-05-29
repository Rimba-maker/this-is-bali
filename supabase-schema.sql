create table bookings (
  id            uuid default gen_random_uuid() primary key,
  reference     text unique not null,
  date          date not null,
  time          text not null,
  party_size    integer not null check (party_size >= 1 and party_size <= 20),
  seating       text not null default 'no_preference',
  occasions     text[] default '{}',
  notes         text default '',
  name          text not null,
  whatsapp      text not null,
  email         text default '',
  status        text not null default 'pending'
                  check (status in ('pending','confirmed','seated','completed','cancelled')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index bookings_date_idx       on bookings(date);
create index bookings_status_idx     on bookings(status);
create index bookings_created_at_idx on bookings(created_at desc);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger bookings_updated_at
  before update on bookings
  for each row execute function update_updated_at();

alter table bookings enable row level security;

create policy "Public can insert bookings"
  on bookings for insert to anon with check (true);
