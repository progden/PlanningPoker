using System;
using System.Collections.Generic;
using System.Linq;

namespace PlanningPoker.Core.Test
{
    public class Game
    {
        public Game(string host)
        {
            Id = Guid.NewGuid().ToString();
            AddPlayer(host);
        }

        public string Id { get; set; }
        public List<Player> Players { get; set; } = new List<Player>();

        public Player AddPlayer(string playerName)
        {
            var existsPlayer = Players.FirstOrDefault(p => p.Name == playerName);
            if (existsPlayer == default)
            {
                var player = new Player(playerName);
                Players.Add(player);
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
            player.Pick = null;
            return this;
        }
		
        protected string[] _colors = new string[]{
            "red", "blue", "green", "#FF8C00", 
            "#678", "#234", "#A52A2A", "#8A2BE2",
            "#7FFFD4", "#D2691E"
        };
    }
}