# alchimia for Playdate

Lazy port of my Ludum Dare 51 game - [alchimia](https://github.com/Deseteral/alchimia) for [Playdate](https://play.date/) console.

For more information about the original game check out its [repo](https://github.com/Deseteral/alchimia) and [itch.io page](https://deseteral.itch.io/alchimia).

## Process
This port takes the original TypeScript source, runs it through [TypeScriptToLua](https://typescripttolua.github.io/) transpiler and compiles resulting Lua into pdx bundle.

TypeScript source is the original Ludum Dare version with minimal changes for platform specific stuff.

Special thanks to [Orta Therox](https://github.com/orta) and [Andy Bayer](https://github.com/anderoonies) for creating the foundations of TSTL plugin required to get transpilation for Playdate up and running (more info in [this thread](https://devforum.play.date/t/playdate-sdk-with-typescript/369/20)).

## Building
```sh
yarn install && yarn build
```

To run the game in Playdate simulator:
```sh
yarn start
```

## License
This game is licensed under the [MIT license](LICENSE).
