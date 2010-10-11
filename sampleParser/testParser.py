from HTMLParser import HTMLParser

class MagicParser(HTMLParser):
    cardList = []
    pagingList = []
    currentCard = False
    currentTagType = False
    inPagingControl = False

    inSingleCardPage = False
    singleCardTag = False
    inValueClass = False

    divCount = 0

    def handle_data(self, data):
        if(self.currentTagType):
            if(not self.currentTagType in self.currentCard):
                self.currentCard[self.currentTagType] = []
            self.currentCard[self.currentTagType].append(data)

        if(self.singleCardTag and self.inValueClass):
            if(not self.singleCardTag in self.currentCard):
                self.currentCard[self.singleCardTag] = []
            self.currentCard[self.singleCardTag].append(data)


    def handle_starttag(self, tag, attrs):
        evenCardItemAttr = ('class', 'cardItem evenItem')
        oddCardItemAttr = ('class', 'cardItem oddItem')
        cardTitleAttr = ('class', 'cardTitle')
        cardTypeAttr = ('class', 'typeLine')
        cardRulesAttr = ('class', 'rulesText')
        manaCostAttr = ('class', 'manaCost')

        pagingControlAttr = ('class', 'pagingControls')

        if(self.inPagingControl and tag == "a"):
            self.pagingList.append(attrs[0][1])

        if(pagingControlAttr in attrs):
            self.inPagingControl = True
        
        if(cardTitleAttr in attrs):
            self.currentTagType = "name"

        if(cardTypeAttr in attrs):
            self.currentTagType = "type"

        if(cardRulesAttr in attrs):
            self.currentTagType = "rules"

        if(manaCostAttr in attrs):
            self.currentTagType = "manaCost"
            
        if(evenCardItemAttr in attrs or oddCardItemAttr in attrs):
            self.currentCard = dict()

        if(tag == "img" and self.currentTagType):
            for attr in attrs:
                if(attr[0]=="alt"):
                    if(not self.currentTagType in self.currentCard):
                        self.currentCard[self.currentTagType] = []
                    self.currentCard[self.currentTagType].append("<symbol>" + attr[1] + "</symbol>")


        #this if for the single card parser
        cardDetailsAttr = ('class', 'cardDetails')
        classValueAttr = ('class', 'value')

        if(self.singleCardTag and classValueAttr in attrs):
            self.inValueClass = True

        if(self.singleCardTag and tag == "div"):
            self.divCount = self.divCount + 1

        if(self.inSingleCardPage):
            for attr in attrs:
                if(attr[0] == "id"):
                    if("nameRow" in attr[1]):
                        self.singleCardTag = "name"
                    elif("manaRow" in attr[1]):
                        self.singleCardTag = "manaCost"
                    elif("cmcRow" in attr[1]):
                        self.singleCardTag = "convertedManaCost"
                    elif("textRow" in attr[1]):
                        self.singleCardTag = "rules"
                    elif("typeRow" in attr[1]):
                        self.singleCardTag = "type"
                    elif("flavorRow" in attr[1]):
                        self.singleCardTag = "flavorText"
                    elif("ptRow" in attr[1]):
                        self.singleCardTag = "powerToughness"
                    elif("setRow" in attr[1]):
                        self.singleCardTag = "set"
                    elif("rarityRow" in attr[1]):
                        self.singleCardTag = "rarity"
                    elif("otherSetsRow" in attr[1]):
                        self.singleCardTag = "otherSets"
                    elif("artistRow" in attr[1]):
                        self.singleCardTag = "artist"
                 
        if(cardDetailsAttr in attrs):
            self.inSingleCardPage = True
            self.currentCard = dict()


        #FIXME copy pasta of the multicard version
        if(tag == "img" and self.singleCardTag and self.inValueClass):
            for attr in attrs:
                if(attr[0]=="alt"):
                    if(not self.singleCardTag in self.currentCard):
                        self.currentCard[self.singleCardTag] = []
                    self.currentCard[self.singleCardTag].append("<symbol>" + attr[1] + "</symbol>")
                    

    def handle_endtag(self, tag):
        if(tag == 'tr'):
            self.cardList.append(self.currentCard)
            self.currentCard = False
        if(self.currentTagType and (tag == "span" or tag == "div")):
            self.currentTagType = False
        if(self.inPagingControl and tag == "div"):
            self.inPagingControl = False

        #single card parsing
        if(tag == "div" and self.inValueClass):
            self.inValueClass = False
        if(self.singleCardTag and tag == "div"):
           if(self.divCount == 0):
               self.singleCardTag = False
           else:
               self.divCount = self.divCount - 1
            


import httplib
magicParser = MagicParser()
conn = httplib.HTTPConnection("gatherer.wizards.com")

#Test 1

f = open("/Users/dnmcgoy/code/magicTestOutput.txt","w")

lastCardName = "invalid value"
pageNumber = 0
while pageNumber < 500:
    magicParser.reset()
    magicParser.cardList = []

    value = "/Pages/Search/Default.aspx?page="+ str(pageNumber) + "&action=advanced&cmc=+=%5B7%5D"
    conn.request("GET", value)
    magicParser.feed(conn.getresponse().read().decode("UTF-8"))
    for card in magicParser.cardList:
        if(card):
            f.write(' '.join(card["name"]).encode("utf-8").strip())
            f.write("\n")
            f.write(' '.join(card["manaCost"]).encode("utf-8").strip())
            f.write("\n")
            f.write(' '.join(card["type"]).encode("utf-8").strip())
            f.write("\n")
            f.write(' '.join(card["rules"]).encode("utf-8").strip())
            f.write("\n")
            f.write("\n")
    pageNumber = pageNumber + 1
    if (not magicParser.cardList[0] or 
        len(magicParser.cardList) == 1 or
        magicParser.cardList[0]["name"] == lastCardName):
        break
    else:
        lastCardName = magicParser.cardList[0]["name"]


#Test 2

magicParser.reset()
magicParser.cardList = []
value = "/Pages/Card/Details.aspx?multiverseid=158109"
conn.request("GET", value)
magicParser.feed(conn.getresponse().read().decode("UTF-8"))
card = magicParser.cardList[0]
if(card):
    f.write(' '.join(card["name"]).encode("utf-8").strip())
    f.write("\n")
    f.write(' '.join(card["manaCost"]).encode("utf-8").strip())
    f.write("\n")
    f.write(' '.join(card["type"]).encode("utf-8").strip())
    f.write("\n")
    f.write(' '.join(card["rules"]).encode("utf-8").strip())
    f.write("\n")
    f.write("\n")
