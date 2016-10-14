json.extract! user, :id, :username

json.panelUrl user.panelpic.url
json.profUrl user.profpic.url

json.followers user.followers
json.following user.followeds
