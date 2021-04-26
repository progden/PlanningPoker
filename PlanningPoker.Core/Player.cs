using System;

namespace PlanningPoker.Core.Test
{
    public record Player(string Id, string Name)
    {
        public Player(string name) : this(Guid.NewGuid().ToString(), name)
        {
        }
		
        public string Pick {set; get;}
        public string Color {set; get;}
    }
}