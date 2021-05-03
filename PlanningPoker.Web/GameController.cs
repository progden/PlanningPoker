using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PlanningPoker.Core.Test;

namespace PlanningPoker.Web
{
    public class GameController : Controller
    {
        private static List<Game> games = new();
        private readonly IHubContext<GameHub> _hubContext;

        public GameController(IHubContext<GameHub> hubContext)
        {
            _hubContext = hubContext;
        }

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

            _hubContext.Clients.All.SendAsync("ReceiveGame", games);
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
                _hubContext.Clients.All.SendAsync("ReceiveGame", games);
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
                _hubContext.Clients.All.SendAsync("ReceiveGame", games);
            }

            return Json(games);
        }

        [HttpPost]
        [Route("~/game/{gameId}/user/{userName}")]
        public JsonResult AddUser(string gameId, string userName)
        {
            var game = games.FirstOrDefault(g => g.Id == gameId);
            game?.AddPlayer(userName);
            
            _hubContext.Clients.All.SendAsync("ReceiveGame", games);
            return Json(game);
        }

        [HttpPost]
        [Route("~/game/{gameId}/user/{userId}/poll/{pick}")]
        public JsonResult Poll(string gameId, string userId, string pick)
        {
            var game = games.FirstOrDefault(g => g.Id == gameId);
            game?.Poll(userId, pick);
            _hubContext.Clients.All.SendAsync("ReceiveGame", games);
            return Json(game);

        }

        [HttpPost]
        [Route("~/game/{gameId}/user/{userId}/cancel")]
        public JsonResult CancelPick(string gameId, string userId)
        {
            var game = games.FirstOrDefault(g => g.Id == gameId);
            game?.CancelPoll(userId);

            _hubContext.Clients.All.SendAsync("ReceiveGame", games);
            return Json(game);
        }

        public class GameHub : Hub
        {
        }
    }
}
