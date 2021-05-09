using System;
using System.Collections.Generic;
using System.Linq;

namespace PlanningPoker.Core
{
    public class Game
    {
        protected List<string> Colors = new(){
            "red", "blue", "green", "#FF8C00", 
            "#678", "#234", "#A52A2A", "#8A2BE2",
            "#7FFFD4", "#D2691E"
        };

        public Game(string host)
        {
            Id = Guid.NewGuid().ToString();
            var player = AddPlayer(host);

            player.Color = GetFirstUnuseColor();

        }

        private string GetFirstUnuseColor()
        {
           return Colors.AsEnumerable().First(c => !Players.Select(p => p.Color).Contains(c));
        }

        public string Id { get; set; }
        public List<Player> Players { get; set; } = new ();

        public Player AddPlayer(string playerName)
        {
            var existsPlayer = Players.FirstOrDefault(p => p.Name == playerName);
            // 沒有現有的使用者
            if (existsPlayer == default(Player))
            {
                var player = new Player(playerName);
                Players.Add(player);
                player.Color = GetFirstUnuseColor();
                existsPlayer = player;
            }
            return existsPlayer;
        }
		
        public Player RemoveUser(string playerId)
        {
            var existsPlayer = Players.FirstOrDefault(p => p.Id == playerId);
            if (existsPlayer != default)
            {
                Players.Remove(existsPlayer);
            }
            return existsPlayer;
        }
		
        public Game Poll(string playerId, string pick)
        {
            var player = Players.FirstOrDefault(p => p.Id == playerId);
            player.Pick = pick;
            return this;
        }
		
        public Game CancelPoll(string playerId)
        {
            var player = Players.FirstOrDefault(p => p.Id == playerId);
            player.Pick = "not-yet";
            return this;
        }
		
    }
}