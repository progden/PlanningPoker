using System.Collections;
using System.Linq;
using NUnit.Framework;

namespace PlanningPoker.Core.Test
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void InitGame_Should_HasAHost()
        {
            // Arrange
            var host = "Dennis";

            // Act
            var game = new Game(host);

            // Assert
            Assert.NotNull(game.Id);
            Assert.AreEqual(1, game.Players.Count());
            Assert.AreEqual("Dennis", game.Players.First().Name);
        }

        [Test]
        public void ExistsGameAddUser_Should_HasTwoPlayer()
        {
            // Arrange
            var host = "Dennis";
            var playerName = "Hank";
            // Act
            var game = new Game(host);
            var player = game.AddPlayer(playerName);

            // Assert
            Assert.NotNull(game.Id);
            Assert.AreEqual(2, game.Players.Count());
            Assert.AreEqual(true, game.Players.Any(p => p.Name == "Hank"), "Hank should in list");
            Assert.NotNull(player.Id);
            Assert.AreEqual("Hank", player.Name);
        }

        [Test]
        public void ExistsGameAddSameUser_Should_AddFail()
        {
            // Arrange
            var host = "Dennis";
            var playerName = "Hank";
            // Act
            var game = new Game(host);
            var player = game.AddPlayer(playerName);
            var player2 = game.AddPlayer(playerName);

            // Assert
            Assert.NotNull(game.Id);
            Assert.AreEqual(2, game.Players.Count());
            Assert.AreEqual(true, game.Players.Any(p => p.Name == "Hank"), "Hank should in list");
            Assert.NotNull(player.Id);
            Assert.AreEqual("Hank", player.Name);
            Assert.AreEqual(player.Id, player2.Id);
        }
		
        [Test]
        public void ExistsGameRemoveUser_Should_Success()
        {
            // Arrange
            var game = new Game("Dennis");
            var player = game.AddPlayer("Hank");
            var player2 = game.AddPlayer("Daneil");
            // Act
			game.RemoveUser(player2.Id);

            // Assert
            Assert.NotNull(game.Id);
            Assert.AreEqual(2, game.Players.Count());
            Assert.AreEqual(default, game.Players.FirstOrDefault(p => p.Name == "Daneil"));

        }

        [Test]
        public void PlayerPoll_Should_ShowInGameStatus()
        {
            // Arrange
            var host = "Dennis";
            var playerName = "Hank";
            // Act
            var game = new Game(host);
            var player = game.AddPlayer(playerName);
			game.Poll(player.Id, "13");

            // Assert
            Assert.NotNull(game.Id);
			Assert.AreEqual("13", game.Players.FirstOrDefault(p => p.Name == "Hank").Pick);
        }
		
        [Test]
        public void PlayerCancelPoll_Should_ShowInGameStatus()
        {
            // Arrange
            var game = new Game("Dennis");
            var player = game.AddPlayer("Hank");
            var player2 = game.AddPlayer("John");
			
            // Act
			game.Poll(player.Id, "13");
			game.Poll(player2.Id, "5");
			var rs = game.CancelPoll(player2.Id);
			
			var pick = rs.Players
						.FirstOrDefault(p => p.Name == "John")
						.Pick;

            // Assert
            Assert.NotNull(game.Id);
			Assert.AreEqual("13", game.Players.FirstOrDefault(p => p.Name == "Hank").Pick);
			Assert.True(string.IsNullOrEmpty(pick));
        }
    }
}