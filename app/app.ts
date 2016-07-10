import 'pixi.js'
import { DefaultRandom } from './helpers/random'
import { Render } from './render/pixi-game-render'
import { Game } from './game/game'

let game: Game;
let render: Render;

function Run() {
    let random = new DefaultRandom();
    game = new Game(random, 10, 10);
    render = new Render(document, game);

    console.log(game);
}

Run();
