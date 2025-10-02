# The plan

- Fullstack react app using next.js
- Permanent storage: ? (backup plan is sqlite. Will definitely be good enough since I'm the only user)
- User+password system to protect your data?
- Data backup system: ? (if using sqlite, safe in git. Its nonsensitive data anyways. - Bad system, cause will need to continually git commit it)

Mostly inspired by myanimelist, since imdb list and other apps are either not good enough and global between media types. myanimelist has the best list system I know.

## UI
Suggestions:
1. Rectangles of lists/media types like google keep. Either they can work side by side / above&below without needing to open a list, or clicking one opens a full view of that list.
2. Simple name/image link to the actual list, better for mobile. Top&bottom mobile, side by side web?
3. Top or side panel to jump between the lists
Right now I'm thinking testing out 2.

## Features
Core:
- [] Media list OR just a media type system in the db. Default movie/tv/anime.
- [] Watch states
    - [] Plan to watch (watchlist)
    - [] Watching
    - [] On-hold/waiting
    - [] Dropped 
    - [] Completed
    - [] Easy one-click toggle between plan to watch / have watched from preview and in detailed view
    - [] Upon marking as completed: ask for rating?
- [] Simple view for watch list (entries in plan to watch)
    - [] Global watch list between all lists ()
    - [] Separate watch list (one for each media type)
    - [] Able to reorder watch list so as to prioritize what to watch first etc.
- [] Rating system of watched entries with 1 decimal point, [0.0,10.0]
- [] Date log:
    - [] Date of started watching
    - [] Date of finished watching

Wishlist of potential extra features:
- [] details like images, release dates, episode count, categories, etc. from API's like imdb (movies+tv) and myanimelist (anime) if possible. Alternatively just a link to imdb / mal if found, needs api too.
- [] Custom lists, e.g. "tv + anime" in one
- [] Nested lists, e.g. "Movies -> war movies / comedies"

## Database structure

