# Cities & Movies
### For a clean and neat experience, Make sure to get all the files in the repo to your local system

### Description :

It is an Rest_Api about the Inox cinemas in all over India.

### It has following methods
* Get
* Post
* Delete

### We have certain endpoints for Get methods which are mentioned below
- /cinemas : Which gives us all the available Cities list.
- /cinemas/city : which gives the required city details which includes the 
               no.of areas inox located.
- /cinemas/city/area_name : Which gives all the details about the screens
                         and price range in the mentioned area.
- /cinemas/city/area_name/screen_name : Which gives all the details about
                                        the price range in the mentioned screen.

### we have similar kind of endpoints for Delete method 
- /cinemas/city : which deletes the city details which includes the 
               no.of areas inox located.
- /cinemas/city/area_name : Which deletes all the details about the screens
                         and price range in the mentioned area.