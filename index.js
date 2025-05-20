let owlPath = [];
let drawNextOwl = false;
const canvasWidth = 500;
const canvasHeight = 500;

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('form');
	// TODO: use your own val.town endpoint
	// remix: https://val.town/remix/ff6347-openai-api
	const apiEndpoint = 'https://ff6347-openai-api.val.run';
	if (apiEndpoint.includes('ff6347')) {
		console.error('Please use your own val.town endpoint!!!');
		alert('Please use your own val.town endpoint!!!');
		throw new Error('Please use your own val.town endpoint!!!');
	}

	const systemPrompt = `
	You are a p5js artist that is drawing owls. In the example below you can see some JSON that contains points for the owl. These points will be used as p5 vertex path points.
	The canvas has a width of ${canvasWidth} and a height of ${canvasHeight}.
	The values are just examples. Draw the owl and return the JSON.
~~~json
{
	paths:[
			[{x:10, y:10}, {x:20, y:20}, {x:30, y:30}],
			[{x:40, y:40}, {x:50, y:50}, {x:60, y:60}],
			[{x:70, y:70}, {x:80, y:80}, {x:90, y:90}, {x:100, y:100}, ],
	]

}
~~~
`;
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const originalButtonText = form.querySelector('button').textContent;
		let dotsCount = 0;
		const dots = ['.', '..', '...'];
		const interval = setInterval(() => {
			dotsCount++;
			form.querySelector('button').textContent = dots[dotsCount % 3];
		}, 200);
		const prompt = {
			response_format: { type: 'json_object' },
			messages: [
				{
					role: 'system',
					content: systemPrompt,
				},
				{
					role: 'user',
					content: 'create the svg in the JSON',
				},
			],
		};
		const response = await fetch(apiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(prompt),
		});
		if (!response.ok) {
			clearInterval(interval);
			form.querySelector('button').textContent = originalButtonText;
			console.log(await response.text());
			console.error('Failed to fetch');
			return;
		}
		const json = await response.json();
		const data = JSON.parse(json.completion.choices[0].message.content);

		console.log(data);
		clearInterval(interval);
		owlPath = data.paths;
		drawNextOwl = true;
		form.querySelector('button').textContent = originalButtonText;
	});
});

function setup() {
	createCanvas(canvasWidth, canvasHeight);
}

function draw() {
	if (drawNextOwl) {
		background(255);
		console.log('drawing owl');
		push();
		noFill();
		stroke(0);
		strokeWeight(1);
		drawNextOwl = false;
		owlPath.forEach((path) => {
			beginShape();
			path.forEach((point) => {
				vertex(point.x, point.y);
			});
			endShape();
		});
		pop();
	}
}
