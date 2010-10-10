from HTMLParser import HTMLParser
    
class MagicParser(HTMLParser):
    cardList = []
    pagingList = []
    currentCard = False
    currentTagType = False
    inPagingControl = False

    def handle_data(self, data):
        if(self.currentTagType):
            if(not self.currentTagType in self.currentCard):
                self.currentCard[self.currentTagType] = []
            self.currentCard[self.currentTagType].append(data)

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
                    self.currentCard[self.currentTagType].append("<symbol>" + attr[1] + "</symbol>")
                    

    def handle_endtag(self, tag):
        if(tag == 'tr'):
            self.cardList.append(self.currentCard)
            self.currentCard = False
        if(self.currentTagType and (tag == "span" or tag == "div")):
            self.currentTagType = False
        if(self.inPagingControl and tag == "div"):
            self.inPagingControl = False
            


import httplib

magicParser = MagicParser()
conn = httplib.HTTPConnection("gatherer.wizards.com")

f = open("/Users/dnmcgoy/magicTestOutput.txt","w")

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
    if (not magicParser.cardList[0] or magicParser.cardList[0]["name"] == lastCardName):
        break
    else:
        lastCardName = magicParser.cardList[0]["name"]
