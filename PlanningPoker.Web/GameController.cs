using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlanningPoker.Core.Test;

namespace PlanningPoker.Web
{
    public class GameController : Controller
    {
        private static List<Game> games = new();

        [HttpGet]
        [Route("~/game")]
        public JsonResult ListGame()
        {
            return Json(games);
        }
        
        [HttpPost]
        [Route("~/game")]
        public IActionResult Index()
        {
            var game = new Game("Dennis");
            games.Add(game);

            return Redirect($"~/game/{game.Id}");
        }

        [HttpGet]
        [Route("~/game/{id?}")]
        public JsonResult Index(string id)
        {
            var game = games.FirstOrDefault(g => g.Id == id);

            if (game == default(Game))
            {
                game = new Game("Dennis");
                games.Add(game);
            }

            return Json(game);
        }

        [HttpDelete]
        [Route("~/game/{id?}")]
        public JsonResult DropGame(string id)
        {
            var game = games.FirstOrDefault(g => g.Id == id);

            if (game != default(Game))
            {
                games.Remove(game);
            }

            return Json(games);
        }

        [HttpPost]
        [Route("~/game/{gameId}/user/{userName}")]
        public JsonResult AddUser(string gameId, string userName)
        {
            var game = games.FirstOrDefault(g => g.Id == gameId);
            game?.AddPlayer(userName);
            return Json(game);
        }

        [HttpPost]
        [Route("~/game/{gameId}/user/{userId}/poll/{pick}")]
        public JsonResult Poll(string gameId, string userId, string pick)
        {
            var game = games.FirstOrDefault(g => g.Id == gameId);
            game?.Poll(userId, pick);
            return Json(game);

        }

        [HttpPost]
        [Route("~/game/{gameId}/user/{userId}/cancel")]
        public JsonResult CancelPick(string gameId, string userId)
        {
            var game = games.FirstOrDefault(g => g.Id == gameId);
            game?.CancelPoll(userId);
            return Json(game);
        }

    }
}
