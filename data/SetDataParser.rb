require 'nokogiri'
require 'csv'
require 'sqlite3'

class Card
  attr_accessor :mtgid, :name

  def initialize(params)
    @mtgid = params[:mtgid].to_i
    @name = params[:name]
    @cost = params[:cost]
    @type = params[:type]
    if params[:power]
      @power = params[:power]
      @toughness = params[:toughness]
    elsif params[:pt] && params[:pt] =~ /\((.*)\/(.*)\)/
      @power = $1
      @toughness = $2
    end
    if params[:edition]
      @edition = params[:edition]
    end
  end

end

headers = [:index, :asdf, :qwer, :mtgid, :type, :pt, :text, :name, :cost, :power, :toughness, :edition]

cards = []
CSV.foreach("cards.csv", {:col_sep => '|', :headers => headers}) do |row|
  cards << Card.new(row)
end

setFiles = Dir.new("./setData").entries

newCards = []
for setFile in setFiles
  if setFile =~ /.*\.xml/
    f = File.open("setData/"+setFile)
    @doc = Nokogiri::XML(f)
    for node in @doc.css("list mc")
      newCards << Card.new(:mtgid => node.at_css("id").inner_text(),
                           :name => node.at_css("name").inner_text(),
                           :cost => node.at_css("cost").inner_text(),
                           :type => node.at_css("type").inner_text(),
                           :power => node.at_css("power").inner_text(),
                           :toughness => node.at_css("toughness").inner_text(),
                           :edition => node.at_css("edition").inner_text())
    end
  end
end


#Commented out because its heavy, inefficient, and unneccessary once we have a full list.

# cardsInXMLButNotInCSV = []

# for newCard in newCards
#   hasCard = false
#   for card in cards
#     if newCard.mtgid == card.mtgid
#       hasCard = true
#     end
#   end
#   if !hasCard
#     cardsInXMLButNotInCSV << newCard
#   end
# end

# cardsInCSVButNotInXML = []

# for card in cards
#   hasCard = false
#   for newCard in newCards
#     if newCard.mtgid == card.mtgid
#       hasCard = true
#     end
#   end
#   if !hasCard
#     cardsInCSVButNotInXML << newCard
#   end
# end

# puts "cardsInXMLButNotInCSV count: " + cardsInXMLButNotInCSV.count.to_s()
# puts "cardsInCSVButNotInXML count: " + cardsInCSVButNotInXML.count.to_s()
