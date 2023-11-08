import figlet from "figlet"
import text from "./text.txt"

const server = Bun.serve({
	port: 3535,
	fetch(req: Request){
	    console.log(req.url);

		const body = figlet.textSync("Bun!");

		return new Response(body);
		return new Response("Bun!");
	},
});

console.log(text);
console.log(Bun.version);
console.log(`listening on http://localhost:${server.port} . . .`);