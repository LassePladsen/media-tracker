===== The plan =====

Mostly inspired by myanimelist, since imdb list and other apps are either not good enough and global between media types. myanimelist has the best list system I know.

- Fullstack react app using next.js
- Permanent storage: ? (backup plan is sqlite. Will definitely be good enough since I'm the only user)
- User+password system to protect your data?
- Data backup system: ? (if using sqlite, safe in git. Its nonsensitive data anyways. - Bad system, cause will need to continually git commit it)
- Using eslint, prettier, both with pre-commit (staged files) git hook
- Using shadcn ui component library


## UI
Should the lists be route based i.e /movies /movies/completed /movies/plan-to-watch? Alternative is state-based on same route.

#### Prompt for UI to ai agents:
Its a web applicaton Media Tracker. You have three lists: movies, shows, anime. Each list has media entries with watch states and other details which are not important as of now.

This needs to have good ux for both desktop and mobile units. 
Home page you get a search bar for searching entries globally, and then a button link to the three lists. In the footer there is a link to the project on github, and at the end it says "made by Lasse Pladsen" with image links to my github and my linkedIn

In each list page there should be an easy switching between the three lists with buttons always shown.
Also easy switching between watch states (all,plan to watch, completed,on hold, dropped) with one click for each and always shown. Also a search bar for this current list. Also a filter feature to filter other details.

No other page than home page and each list view.

### Home 
1. Rectangles of lists/media types like google keep. Either they can work side by side / above&below without needing to open a list, or clicking one opens a full view of that list.
2. Simple name/image link to the actual list, better for mobile. Top&bottom mobile, side by side web?
3. Top or side panel to jump between the lists.
5. Global search bar for fuzzy search in all lists. Below is the list links

4 is best, for mobile. Could be ok for desktop too. works great on myanimelist app. 3 is maybe easier

### List view
Desktop:
1. A side panel for navigation between lists and a search at the top 

Mobile:
1. Like myanimelist app: Bottom tabs navigation between lists, then top scrollable tab for watch states.

View for filtering by watch state:
1. Dropdown filter, for states and others. -
2. Buttons at the top for the states like myanimelist has. See ux-design/ image watch-state-filters.png
3. Nested entries in a side panel
I think 


## Pages
Home page

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
