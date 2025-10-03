# The plan

Mostly inspired by myanimelist, since imdb list and other apps are either not good enough and global between media types. myanimelist has the best list system I know.

- Fullstack react app using next.js
- Permanent storage: ? (backup plan is sqlite. Will definitely be good enough since I'm the only user)
- User+password system to protect your data?
- Data backup system: ? (if using sqlite, safe in git. Its nonsensitive data anyways. - Bad system, cause will need to continually git commit it)


## UI
Should the lists be route based i.e /movies /movies/completed /movies/plan-to-watch? Alternative is state-based on same route.

### Home 
1. Rectangles of lists/media types like google keep. Either they can work side by side / above&below without needing to open a list, or clicking one opens a full view of that list.
2. Simple name/image link to the actual list, better for mobile. Top&bottom mobile, side by side web?
3. Top or side panel to jump between the lists.
4. Like myanimelist app: Bottom tabs navigation between lists, then top scrollable tab for watch states.

4 is best, works great on myanimelist app. 3 is maybe easier

### List view
Filter by watch state:
1. Dropdown filter, for states and others
2. Tab menu for states like myanimelist has
3. Nested entries in the side panel
Probably 2, but needs a solution for mobile. 


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
    - [] one for combined tv (live action series) + anime under the media type "series" or just call it "TV+anime" for simplicity
    - [] Able to reorder the watch lists so as to prioritize what to watch first etc.
- [] Rating system of watched entries with 1 decimal point, [0.0,10.0]
- [] Date log system:
    - [] Date of started watching
    - [] Date of finished watching
- [] Rewatch system. Reset the episode count and up the rewatch counter

Wishlist of potential extra features:
- [] details like images, release dates, episode count, categories, etc. from API's like imdb (movies+tv) and myanimelist (anime) if possible. Alternatively just a link to imdb / mal if found, needs api too.
- [] Custom lists, e.g. "tv + anime" in one
- [] Nested lists, e.g. "Movies -> war movies / comedies"
- [] Global watch list between all lists - Maybe drop this?
- [] one list that composes tv + anime?

## Database structure

