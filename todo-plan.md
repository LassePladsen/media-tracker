The plan
========

Mostly inspired by myanimelist, since imdb list and other apps are either not good enough and global between media types. myanimelist has the best list system I know.

- Fullstack react app using next.js
- Hostes i vercel.
- Permanent storage: vercel postgres. F.eks Neon or supabase. (alternative Azure). https://vercel.com/docs/postgres
- User+password system to protect your data?
- Data backup system: ? 
- Using eslint, prettier, both with pre-commit (staged files) git hook
- Using shadcn ui component library


## UI
Figma link: https://www.figma.com/make/3KEShIoAfIvGeL5tRS2zWN/Media-Tracker-App?node-id=0-4&t=UECCAUkRw4amd6Tg-1

## Features
Core:
- [] Media list OR just a media type system in the db. Default movie/tv/anime. Can support custom lists later.
- [] Watch states
    - [] Plan to watch (watchlist)
    - [] Watching
    - [] On-hold/waiting
    - [] Dropped 
    - [] Completed
    - [] Easy one-click toggle between plan to watch / have watched from preview and in detailed view
    - [] Upon adding to list, default to plan to watch with 0 episodes watched
- [] Watch list (entries in plan to watch)
    - [] Separate for each list / media type
    - [] Able to reorder the watch lists so as to prioritize what to watch first etc.
- [] Rating system of watched entries with 1 decimal point, [0.0,10.0] (potentially just steps of 0.5 instead of 0.1)
- [] Rewatch system. Reset the episode count and up the rewatch counter
- [] Easy toggle system for where it can be streamed/watched. e.g. "Netflix", "Local Plex", and whatever other services you have. Use icons for these instead of names.
- [] Easily visible delete button, maybe in a corner.
- [] Fuzzy search for entries globally between all lists for max ease of use, at home page.
- [] Fuzzy Search for entries in specific list page.
- [] Profile/settings tab.
    - [] Change password
- [] Export all data. E.g to JSON
- [] import data. E.g to JSON. TODO: check how MAL exports as its my biggest list
- [] Release/airing state
    - [] Not yet aired / Upcoming
    - [] Currently airing
    - [] Finished airing
- [x] My links (github, linkedin) in footer of home page or somewhere else.
- [] Entry metadata / details:
    - [] Genre. Support multiple? Could have normalized db, separate table linking to media entry
    - [] Categories. Support multiple? 
    - [] Year of release.
    - [] Date of started watching
    - [] Date of finished watching
    - [] Number of times rewatched
    - [] Date of last rewatch finish
- [] Links to imdb (movies,shows) / mal (anime)
- [] user+password system. Should be secure, hash passord system.
- [] Create a readme for installation and possibly demo functionality on my site so they don't have to open their own website. Must then have demo functionality
- [] Extract current hardcoded list labels (movies,tv shows, anime) to the actual data (db or dummy)
- [] Right now the routes seem to be much slower than before i moved them into (lists). Im guessing its not prefetching correctly anymore. Look into that. POSSIBLY this will be fixed on production build. Needs testing.
- [x] Toggleable state for minimum view, i.e showing the cards as small as possible, since they take up a lot of screen room. Especially this for mobile (maybe default it if on mobile). Persistent settings in user db (or separate user_settings db...)
- [x] Sorting entries. Year, genre, rating, custom (drag & drop would be cool, but on wishlist)
- [] Upon marking as completed: ask for rating. Small popup with stars, should support clicking between or a good solution for this. Easiest is dropdown...

Wishlist of potential extra features:
- [] details like images, release dates, episode count, categories, etc. from API's like imdb (movies+tv) and myanimelist (anime) if possible. Alternatively just a link to imdb / mal if found, needs api too.
- [] Custom lists, e.g. "tv + anime" in one. Im thinking a sort of 'parentType' metadata to use for what icon to show etc.
- [] Nested lists, e.g. "Movies -> war movies / comedies"
- [] Global watch list between all lists - Maybe drop this?
- [] one list that composes tv + anime?
- [] Custom sorting. Feature to reorder the entries that have the same ratings, to decide what you like the most e.g between three 9.0 ratings. Drag and drop would be coolest, but hardest. Look into packages.
- [] Share list with read-only url. 
- [] White / dark mode?
- [] Color style. E.g default nextjs neat black/white vs the figma dock purple-based theme.
- [] Demo showcase on the github project, for example either using dummy data hardcoded for demo or using a demo user in db (this wont work well because any demo tester could mess up the data for next person. Solution is to create a new demo user for each tester. I dont like this approach cause it will need automatic cleanup logic).
- [] Action user feedback: Popup dialog slides in and out after a timeout to show what happened, e.g. "Saved movie" "Set status to watching"

## Database structure
- [] Table: list / (media) Type.
- [] (media) Entry /  Item. Columns: enum state.
- [] user
