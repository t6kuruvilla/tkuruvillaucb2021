var wclist = {1930: "Uruguay", 1934: "Italy", 1938: "France", 1950:"Brazil", 1954:"Switzerland",
              1958: "Sweden", 1962: "Chile", 1966: "England", 1970: "Mexico", 1974: "Germany",
              1978: "Argentina", 1982: "Spain", 1986: "Mexico", 1990: "Italy", 1994: "USA",
              1998: "France", 2002: "South Korea and Japan", 2006: "Germany", 2010: "South Africa",
              2014: "Brazil", 2018: "Russia"  
            }

var wcwon = {1930: "Uruguay", 1934: "Italy", 1938: "Italy", 1950:"Uruguay", 1954:"Germany",
                 1958: "Brazil", 1962: "Brazil", 1966: "England", 1970: "Brazil", 1974: "Germany",
                 1978: "Argentina", 1982: "Italy", 1986: "Argentina", 1990: "Germany", 1994: "Brazil",
                 1998: "France", 2002: "Brazil", 2006: "Italy", 2010: "Spain",
                 2014: "Germany", 2018: "France"  
          }

var tdlist = [1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 
              1994, 1998, 2002, 2006, 2010, 2014, 2018];

var countrylist =  ['Germany', 'Italy', 'France', 'Spain', 'England', 'Brazil', 'Argentina', 'Uruguay', 'Belgium', 'Netherlands',
          'Colombia', 'Chile', 'Paraguay', 'Mexico', "USA", "Cameroon", "Ghana", "Japan", "South Korea", "Australia", "India"].sort()


var conflist = ['AFC', 'CAF', 'CONCACAF', 'CONMEBOL', 'OFC', 'UEFA']

var metriclist = ["Points", "Position", "Goals For", "Goals Against", "Win", "Draw", "Loss", "Games Played"];


var wcwinners = [{country: 'Brazil', won: 5, confederation: "CONMEBOL"},
                 {country: 'Germany', won: 4, confederation: "UEFA"},
                 {country: 'Italy', won: 4, confederation: "UEFA"},
                 {country: 'France', won: 2, confederation: "UEFA"},
                 {country: 'Argentina', won: 2, confederation: "CONMEBOL"},
                 {country: 'Uruguay', won: 2, confederation: "CONMEBOL"},
                 {country: 'Spain', won: 1, confederation: "UEFA"},
                 {country: 'England', won: 2, confederation: "UEFA"}]

var rankyrs = [1994, 1998, 2002, 2006, 2010, 2014, 2018]

var year = 1930
var yearY1 = 1930
var metric = 'Points'
var metric1 = 'Points'
var metric2 = 'Points'
var confname = 'AFC'
var country = 'Argentina'

var countrywc = wclist[year]
var countywon = wcwinners[year]

var countrywc2 = wclist[yearY1]
var countywon2 = wcwinners[yearY1]

var wcusaname = 'United States'
var fifakorea = 'Korea Republic'