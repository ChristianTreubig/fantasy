#Correctly formats JSON data.

import json

with open('C:/WebDev/fantasy/football/data/football_2015_unformatted.json', 'r') as f:
     data = json.load(f)

relevant_keys = ['Name', 'Pos', 'Team', 'PassYards', 'PassTD', 'Int', 'RushYards', 'RushTD', 'Rec', 'RecYards', 'RecTD', 'FantasyPoints', 'AverageAuction']
integer_keys = ['PassYards', 'PassTD', 'Int', 'RushYards', 'RushTD', 'Rec', 'RecYards', 'RecTD', 'FantasyPoints', 'AverageAuction']

with open("json_updated.json", "w") as outfile:
    outfile.write("[")
    for player in data:
        for key in player:
            if key in integer_keys:
                try:
                    player[key] = int(player[key])
                except:
                    player[key] = 0
        player_relevant = {}
        for key in player:
            if key in relevant_keys:
                player_relevant[key] = player[key]
        json.dump(player_relevant, outfile)
        if data[-1]["Name"] != player["Name"]: #Check if not last iteration.
            outfile.write(",")
    outfile.write("]")
    

raw_input() #So command prompt stays open.
