require 'csv'
require 'sqlite3'

class Card
  attr_accessor :mtgid, :name

  def initialize(params)
    @mtgid = params[:mtgid].to_i
    @name = params[:name]
  end

end

headers = [:index, :asdf, :qwer, :mtgid, :type, :pt, :text, :name, :cost]

cards = []
CSV.foreach("cards.csv", {:col_sep => '|', :headers => headers}) do |row|
  cards << Card.new(row)
end

File.delete("cards.db")
db = SQLite3::Database.new( "cards.db" )

@@card_table_name = "Cards"
@@deck_table_name = "Decks"
@@run_table_name = "Runs"
@@pile_table_name = "Piles"
@@printing_table_name = "Printings"
@@set_table_name = "Sets"

db.execute("
  CREATE TABLE #{@@card_table_name} (
  id INTEGER PRIMARY KEY,
  current_multiverse_id INTEGER,
  name TEXT,
  cardtype TEXT,
  cc TEXT,
  cmc INTEGER,
  color TEXT,
  power TEXT,
  toughness TEXT,
  oracle_text TEXT
  )")

db.execute("
  CREATE TABLE #{@@deck_table_name} (
  id INTEGER PRIMARY KEY,
  name TEXT,
  format TEXT
  )")

db.execute("
  CREATE TABLE #{@@run_table_name} (
  card_id INTEGER,
  deck_id INTEGER,
  count INTEGER,
  pile INTEGER
  )")

db.execute("
  CREATE TABLE #{@@set_table_name} (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE,
  block TEXT
  )")

db.execute("
  CREATE TABLE #{@@printing_table_name} (
  set_id INTEGER,
  card_id INTEGER,
  multiverse_id INTEGER,
  rarity TEXT,
  artist TEXT,
  printed_text TEXT,
  flavor_text TEXT
  )")

cards.each do |card|
  begin
    db.execute("INSERT INTO #{@@card_table_name} (multiverse_id, name) VALUES (?, ?)",
               card.mtgid, card.name)
  rescue => e
    puts "#{card.name} (#{card.mtgid})"
    puts e
  end
end


db.execute( "select count(*) from Cards" ) do |row|
  puts "Count is #{row.first}"
end
