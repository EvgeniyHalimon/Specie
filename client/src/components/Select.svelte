<script lang="ts">
	import type { ICategory, ISubcategory } from '$shared/types';

	export let value: number;
	export let selectData: Array<ICategory | ISubcategory> = [];
</script>

<select bind:value class="h-8 mb-2 text-black border-0 rounded-md bg-stone-400">
	{#each selectData as category}
		<option value={category._id}>
			{category.name}
		</option>
	{/each}
</select>
