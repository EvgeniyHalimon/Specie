<script>
	// @ts-nocheck
	// @ts-ignore
	import * as d3 from 'd3';

	let data = [
		{ ages: '<18', count: '727432' },
		{ ages: '18-24', count: '341435' },
		{ ages: '25-34', count: '444509' },
		{ ages: '35-44', count: '426967' },
		{ ages: '45-54', count: '480565' },
		{ ages: '55-64', count: '515347' },
		{ ages: '≥65', count: '629032' }
	]; // or pass data to component as prop

	const width = 600; // the outer width of the chart, in pixels
	const height = width; // the outer height of the chart, in pixels
	const percent = false; // format values as percentages (true/false)
	const fontSize = 16; // the font size of the x and y values
	const strokeWidth = 1; // the width of stroke separating wedges
	const strokeLinejoin = 'round'; // line join style of stroke separating wedges
	const outerRadius = Math.min(width, height) * 0.5 - 60; // the outer radius of the circle, in pixels
	const innerRadius = 125; // the inner radius of the chart, in pixels
	const labelPosition = 0.4; // the position of the label offset from center
	const labelRadius = innerRadius * labelPosition + outerRadius * 0.6; // center radius of labels
	const strokeColorWOR = 'white'; //stroke color when inner radius is greater than 0
	const strokeColorWIR = 'none'; //stroke color when inner radius is 0
	const stroke = innerRadius > 0 ? strokeColorWIR : strokeColorWOR; // stroke separating widths
	const padAngle = stroke === 'none' ? 1 / outerRadius : 0; // angular separation between wedges

	const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
	const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
	// @ts-ignore
	const xVals = data.map((el) => el[x]);
	// @ts-ignore
	let yVals = data.map((el) => Number(el[y]));
	if (percent) {
		const total = yVals.reduce((a, b) => a + b, 0);
		yVals = yVals.map((el) => el / total);
	}
	// @ts-ignore
	const iVals = data.map((el, i) => i);

	// colors can be adjusted manually by creating a color array which length matches length of data set.
	// @ts-ignore
	let colors;
	// @ts-ignore
	if (!colors) colors = d3.quantize((t) => d3.interpolatePlasma(t * 0.7 + 0.3), xVals.length);

	const wedges = d3
		.pie()
		.padAngle(padAngle)
		.sort(null)
		// @ts-ignore
		.value((i) => yVals[i])(iVals);

	const arcPath = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

	const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
</script>

<svg {width} {height} viewBox="{-width / 2} {-height / 2} {width} {height}">
	{#each wedges as wedge, i}
		<path
			fill={colors[i]}
			d={arcPath(wedge)}
			{stroke}
			stroke-width={strokeWidth}
			stroke-linejoin={strokeLinejoin}
		/>
		<g text-anchor="middle" transform="translate({arcLabel.centroid(wedge)})">
			<text font-size={fontSize}>
				<tspan font-weight="bold">{xVals[i]}</tspan>
				<tspan x="0" dy="1.1em"
					>{percent ? `${(yVals[i] * 100).toFixed(2)}%` : yVals[i].toLocaleString('en-US')}</tspan
				>
			</text>
		</g>
	{/each}
</svg>
