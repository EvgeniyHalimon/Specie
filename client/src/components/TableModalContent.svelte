<script lang="ts">
	import { getDate } from '$shared/date';
	import type { IBill } from '$shared/types';
	import { getName } from '$shared/utils';
	import { categories, subcategories } from '$store/store';
	export let bill: IBill;
	console.log('🚀 ~ file: TableModalContent.svelte:7 ~ bill:', bill);
</script>

<div class="flex flex-col gap-2">
	<h2>{getName(bill.categoryID, $categories)}</h2>
	<h3>{getName(bill.subcategoryID, $subcategories)}</h3>
	<p>{bill.price} {'₴'}</p>
	<p>Comment: {bill.comment}</p>
	<p>When: {getDate(bill.createdAt)}</p>
</div>
