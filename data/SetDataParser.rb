require 'nokogiri'
require 'csv'
require 'sqlite3'

class Card
  attr_accessor :mtgid, :name, :cost, :cmc, :colors, :type, :power, :toughness, :edition

  def initialize(params)
    @mtgid = params[:mtgid].to_i
    @name = params[:name]
    @cost = params[:cost]
    @cmc = costToCMC(@cost)
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
    @colors = costToColorBitField(@cost)
  end

  def print
    puts mtgid
    puts "    name:      " + @name.to_s
    puts "    cost:      " + @cost.to_s
    puts "    cmc:       " + @cmc.to_s
    puts "    type:      " + @type.to_s
    puts "    power      " + @power.to_s
    puts "    toughness: " + @toughness.to_s
    puts "    edition:   " + @edition.to_s
    puts "    colors:    " + @colors.to_s
  end
end


def costToCMC(cost)
  if (cost)
    symbols = cost.scan(/{.*?}/)
    if (symbols.size == 0)
      return nil
    end
    cmc = 0
    for symbol in symbols
      if (symbol =~ /{([0-9]+).*}/)
        cmc = cmc + $1.to_i
      elsif (symbol =~ /{X}/)
        cmc = cmc + 0
      else
        cmc = cmc + 1
      end
    end
    return cmc
  else
    return nil
  end
end

def convertSymbolToShorthand(symbol)
  result = case symbol
           when "Red" then "R"
           when "Blue" then "U"
           when "Green" then "G"
           when "Black" then "B"
           when "White" then "W"
           when "Variable Colorless" then "X"
           when "Red or White" then "R/W"
           when "White or Black" then "W/B"
           when "Black or Red" then "B/R"
           when "Green or White" then "G/W"
           when "Red or Green" then "R/G"
           when "Two or Black" then "2/B"
           when "Two or Red" then "2/R"
           else 
             symbol
           end
  return result
end          

def convertCVSCostStyleToShorthand(csvCost)
  symbols = csvCost.scan(/<symbol>.*?<\/symbol>/)
  shorthandString = ""
  for symbol in symbols
    if (symbol =~ /<symbol>(.*)<\/symbol>/) 
      shorthandString = shorthandString + "{" + convertSymbolToShorthand($1) + "}"
    end
  end
  return shorthandString
end

def costToColorBitField(cost)
  hasBlue = false
  hasBlack = false
  hasGreen = false
  hasRed = false
  hasWhite = false
  hasColorless = false
  if (cost)
    if (cost =~ /U/)
      hasBlue = true
    end
    if (cost =~ /B/)
      hasBlack = true
    end
    if (cost =~ /G/)
      hasGreen = true
    end
    if (cost =~ /R/)
      hasRed = true
    end
    if (cost =~ /W/)
      hasWhite = true
    end
    if (!hasBlue && !hasBlack && !hasGreen && !hasRed && !hasWhite && cost.scan(/{.*?}/).size > 0)
      hasColorless = true
    end
  end
  return [hasBlue, hasBlack, hasGreen, hasRed, hasWhite, hasColorless]
end


headers = [:index, :asdf, :qwer, :mtgid, :type, :pt, :text, :name, :cost, :power, :toughness, :edition]

csvCards = []
CSV.foreach("cards.csv", {:col_sep => '|', :headers => headers}) do |row|
  if(row[:cost])
    row[:cost] = convertCVSCostStyleToShorthand(row[:cost])
  end
  csvCards << Card.new(row)
end


setFiles = Dir.new("./setData").entries

xmlCards = []
for setFile in setFiles
  if setFile =~ /.*\.xml/
    f = File.open("setData/"+setFile)
    @doc = Nokogiri::XML(f)
    for node in @doc.css("list mc")
      xmlCards << Card.new(:mtgid => node.at_css("id").inner_text(),
                        :name => node.at_css("name").inner_text(),
                        :cost => node.at_css("cost").inner_text(),
                        :type => node.at_css("type").inner_text(),
                        :power => node.at_css("power").inner_text(),
                        :toughness => node.at_css("toughness").inner_text(),
                        :edition => node.at_css("edition").inner_text())
    end
  end
end

cards = []

cards.concat(xmlCards)

for csvCard in csvCards
  hasCard = false
  for xmlCard in xmlCards
    if xmlCard.mtgid == csvCard.mtgid
      hasCard = true
    end
  end
  if !hasCard
    cards << csvCard
  end
end
