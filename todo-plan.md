The plan
========

Mostly inspired by myanimelist, since imdb list and other apps are either not good enough and global between media types. myanimelist has the best list system I know.

- Fullstack react app using next.js
- Permanent storage: ? (backup plan is sqlite. Will definitely be good enough since I'm the only user)
- User+password system to protect your data?
- Data backup system: ? (if using sqlite, safe in git. Its nonsensitive data anyways. - Bad system, cause will need to continually git commit it)
- Using eslint, prettier, both with pre-commit (staged files) git hook
- Using shadcn ui component library


## UI
Figma link: https://www.figma.com/make/3KEShIoAfIvGeL5tRS2zWN/Media-Tracker-App?node-id=0-4&t=UECCAUkRw4amd6Tg-1

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
    - [] Upon adding to list, default to plan to watch with 0 episodes watched
    - [] Upon marking as completed: ask for rating?
    
- [] Watch list (entries in plan to watch)
    - [] Separate for each list / media type
    - [] Able to reorder the watch lists so as to prioritize what to watch first etc.
- [] Rating system of watched entries with 1 decimal point, [0.0,10.0] (potentially just steps of 0.5 instead of 0.1)
- [] Date log system:
    - [] Date of started watching
    - [] Date of finished watching
- [] Rewatch system. Reset the episode count and up the rewatch counter
- [] Easy toggle system for where it can be streamed/watched. e.g. "Netflix", "Local Plex", and whatever other services you have. Use icons for these instead of names.
- [] Fuzzy search for entries globally between all lists for max ease of use, at home page.
- [] Fuzzy Search for entries in specific list page.
- [] Profile/settings tab.
    - [] Change password
- [] Export all data. E.g to JSON
- [] Release/airing state
    - [] Not yet aired / Upcoming
    - [] Currently airing
    - [] Finished airing
- [] My links (github, linkedin) in footer of home page or somewhere else.

Wishlist of potential extra features:
- [] details like images, release dates, episode count, categories, etc. from API's like imdb (movies+tv) and myanimelist (anime) if possible. Alternatively just a link to imdb / mal if found, needs api too.
- [] Custom lists, e.g. "tv + anime" in one
- [] Nested lists, e.g. "Movies -> war movies / comedies"
- [] Global watch list between all lists - Maybe drop this?
- [] one list that composes tv + anime?
- [] Feature to reorder the entries that have the same ratings, to decide what you like the most e.g between three 9.0 ratings.
- [] Share list with read-only url. 

## Database structure
- [] Table: list / (media) Type.
- [] (media) Entry /  Item. Columns: enum state.
