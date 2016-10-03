## Component Heirarchy

**AuthForm (Container)**
 - AuthForm

 **MenuBar (Container)**
  - Logo
  - SearchBar

 **Profile**
  - Stream

**Stream (Container)**
 - Track(s)

**Track (Container)**
 - PlayButton
 - PlayBar (Container)
 - CommentBar (Container)

**Library (Container)**
 - FilterBar
 - TrackSquare

**UploadForm**

**NowPlaying**
  - PlayButton
  - PlayBar
  - NextButton
  - LastButton

**TrackPage**
  - Track
  - CommentsList




## Routes

|Path   | Component   |
|-------|-------------|
| "/sign-up"    | "AuthForm"  |
| "/sign-in"    | "AuthForm"  |
| "/stream"     | "Stream"    |
| "/library"    | "Library"   |
| "/upload"     | "UploadForm"|
| "/user/:id"   | "Profile"   |
| "/track/:id"  | "Track"     |
