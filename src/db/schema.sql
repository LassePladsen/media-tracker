DROP TYPE IF EXISTS media_type CASCADE;
DROP TABLE IF EXISTS list CASCADE;
DROP TYPE IF EXISTS watch_status CASCADE;
DROP TABLE IF EXISTS ENTRY CASCADE;

CREATE TYPE media_type AS ENUM ('movie', 'tv', 'anime');

CREATE TYPE watch_status AS ENUM (
    'plan-to-watch',
    'watching',
    'completed',
    'on-hold',
    'dropped',
    'rewatching'
);

CREATE TABLE IF NOT EXISTS list(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    slug TEXT UNIQUE NOT NULL,
    type media_type NOT NULL,
    title TEXT NOT NULL
);

INSERT INTO list(slug, type, title) VALUES 
    ('movies', 'movie', 'Movies'),
    ('tv', 'tv', 'TV Shows'),
    ('anime', 'anime', 'Anime')
;

CREATE TABLE IF NOT EXISTS entry(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    list_id INT REFERENCES list(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status watch_status NOT NULL,
    genre TEXT NOT NULL,
    year SMALLINT NOT NULL,
    rating NUMERIC(3, 1),
    episodes_watched SMALLINT CHECK (episodes_watched > 0),
    date_started DATE,
    date_ended DATE
);
