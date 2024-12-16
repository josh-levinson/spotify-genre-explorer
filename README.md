# Spotify Genre Explorer

This is a React application for exploring hidden Spotify genres through API calls

It generates an access token through client-side authorization, and then uses that access token to make searches through Spotify's API search, exposing genres, and allowing the user to then click on genres for further genre exploration.

It is currently in alpha and works for:

1. Basic artist search
2. Basic genre search (click only)

## To Do List:

The following features need to be included in order for this application to be considered "working":

1. Refresh Token: Access tokens from Spotify expire after one hour. The application should gracefully refresh the token based on the existing access token. It should not required another permission grant from Spotify.
2. Artist/Genre Search: Allow user to select either genre or artist search (both?) via the text box
