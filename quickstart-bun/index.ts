import figlet from "figlet"
import text from "./text.txt"

const server = Bun.serve({
  	development: true, // On production this must be off
	port: 3535,
	hostname: "127.0.0.1", // someDomain.com
	fetch(req: Request){
    	throw new Error("woops!");

	    console.log(req.method);
	    console.log(req.url);
	    console.log(req.headers);

	    const url = new URL(req.url);
	    if (url.pathname === "/") return new Response("Home Page!"); 
	    if (url.pathname === "/blog") return new Response("Blog"); 

	    return new Response("404!");

		const body = figlet.textSync("Bun!");

		return new Response(body);
		return new Response("Bun!");

	    return new Response(Bun.file("./hello.txt")); // Stream 'hello.txt' file
	},
	// Enable HTTPS
	// tls: {
	// 	key: Bun.file('./key.pem'),
	// 	cert: Bun.file('./cert.pem'),
	//  passphrase: "my-secret-passphrase", // The password to your private key (if there is) (Optional)
	//  ca: Bun.file("./ca.pem"), // path to root CA certificate (Optional)
	//  dhParamsFile: "/path/to/dhparams.pem", // path to Diffie Helman parameters (Optional)
	// },
	// Custom Error Handler:
	// error(err){
	// 	return new Response(`<pre>${err}\n${err.stack}</pre>`, {
	// 		headers: {
    //     		"Content-Type": "text/html",
	// 		},
	// 	});
	// },
});

console.log(text);
console.log(Bun.version);
console.log(`listening on http://localhost:${server.port} . . .`);

// server.stop(); // stop the server

// Running the server as development
// bun --watch run index.ts