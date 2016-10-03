


## Auth Cycles

### Session API Request Actions

`signUp`

`signIn`

`signOut`

`fetchCurrentUser`

### Session API Response Actions

`receiveCurrentUser`

`removeCurrentUser`


## Tracks Cycles

### Track API Request Actions

`fetchAllTracksForStream`

`createTrack`
  - Invoked from UploadForm

`fetchSingleTrackForStream`

`updateTrack`

`destroyTrack`

### Track API Response Actions

`receiveAllTracksForStream`

`receiveSingleTrackForStream`

### Other Track Actions

`playNextTrack`
  -Invoked from NextButton 'onClick' and custom event on NowPlaying

`playLastTrack`
  -Invoked from LastButton 'onClick'

`pauseTrack`
  -Invoked from PlayButton 'onClick'
