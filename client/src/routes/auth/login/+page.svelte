<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let password = '';
	let email = '';
</script>

<form
    on:submit={() => {}}
	class="flex flex-col gap-3 m-auto w-[500px] p-5 border-stone-300 border-2 rounded-md"
>
	<label for="email">Email</label>
	<input
		name="email"
		id="email"
		bind:value={email}
		autocomplete="off"
		class="h-8 pl-1 text-black border-0 rounded-md caret-black bg-stone-300 "
	/>
	<label for="password">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		bind:value={password}
		autocomplete="off"
		class="h-8 pl-1 text-black border-0 rounded-md caret-black bg-stone-300"
	/>
	<button type="submit" class="self-center p-2 mb-3 bg-blue-600 rounded-md">Login</button>
	<p class="text-center">Don't have an account? <a href="/auth/login" class="underline">Jump in!</a></p>
</form>

