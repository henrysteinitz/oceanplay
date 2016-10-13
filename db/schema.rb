# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161013144029) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string   "body",       null: false
    t.integer  "user_id",    null: false
    t.integer  "time",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "track_id",   null: false
  end

  create_table "follows", force: :cascade do |t|
    t.integer  "followed_id", null: false
    t.integer  "follower_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "likes", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "track_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "retracks", force: :cascade do |t|
    t.integer  "track_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tracks", force: :cascade do |t|
    t.string   "title",                          null: false
    t.integer  "artist_id",                      null: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "audio_file_name"
    t.string   "audio_content_type"
    t.integer  "audio_file_size"
    t.datetime "audio_updated_at"
    t.string   "art_file_name"
    t.string   "art_content_type"
    t.integer  "art_file_size"
    t.datetime "art_updated_at"
    t.text     "description"
    t.integer  "play_count",         default: 0, null: false
    t.index ["title"], name: "index_tracks_on_title", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",              null: false
    t.string   "password_digest",       null: false
    t.string   "session_token",         null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "profpic_file_name"
    t.string   "profpic_content_type"
    t.integer  "profpic_file_size"
    t.datetime "profpic_updated_at"
    t.string   "panelpic_file_name"
    t.string   "panelpic_content_type"
    t.integer  "panelpic_file_size"
    t.datetime "panelpic_updated_at"
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
