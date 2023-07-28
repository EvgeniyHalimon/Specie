<script lang="ts">
	import type { IMergedBySubcategory } from '$shared/types';
	import BillsChart from './BillsChart.svelte';
	export let data: IMergedBySubcategory[];
</script>

<BillsChart {data} />
