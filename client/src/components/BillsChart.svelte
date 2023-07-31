<script lang="ts">
	// @ts-nocheck
	// @ts-ignore
	import * as d3 from 'd3';
	import BillModal from './BillModal.svelte';
	import { bills, subcategories } from '$store/store';
	import { getName } from '$shared/utils';
	import SubcategoryBillChart from './SubcategoryBillChart.svelte';

	export let data;
	let open = false;
	let billsData;

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
	const ids = Object.keys(data[0])[2]; // given d in data, returns the (quantitative) y-value
	// @ts-ignore
	const xVals = data.map((el) => el[x]);
	// @ts-ignore
	let yVals = data.map((el) => Number(el[y]));
	let catIds = data.map((el) => el[ids]);
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

	const openSubcategoryModal = (id: number) => {
		open = !open;
		let temporary = $bills.filter((bill) => bill.categoryID == id);
		billsData = temporary.map((bill) => {
			return {
				subcategory: getName(bill.subcategoryID, $subcategories),
				price: Number(bill.price), //da hell?!
				subcategoryID: bill.subcategoryID
			};
		});
	};
</script>

<svg
	width={width - 100}
	height={height - 100}
	viewBox="{-width / 2} {-height / 2} {width} {height}"
>
	{#each wedges as wedge, i}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<path
			fill={colors[i] || '#8f0da4'}
			d={arcPath(wedge)}
			{stroke}
			stroke-width={strokeWidth}
			stroke-linejoin={strokeLinejoin}
			on:click={() => openSubcategoryModal(catIds[i])}
			class="cursor-pointer"
		/>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<g text-anchor="middle" transform="translate({arcLabel.centroid(wedge)})" class="cursor-pointer" on:click={() => openSubcategoryModal(catIds[i])}>
			<text font-size={fontSize}>
				<tspan font-weight="bold">{xVals[i]}</tspan>
				<tspan x="0" dy="1.1em"
					>{percent ? `${(yVals[i] * 100).toFixed(2)}%` : yVals[i].toLocaleString('en-US')}</tspan
				>
			</text>
		</g>
	{/each}
</svg>

{#if open === true}
	<BillModal bind:open>
		<SubcategoryBillChart data={billsData} />
	</BillModal>
{/if}
