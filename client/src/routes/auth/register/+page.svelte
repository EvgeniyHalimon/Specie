<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let password = '';
	let email = '';
	let firstname = '';
	let lastname = '';
</script>

<form
	on:submit={() => {}}
	class="flex flex-col gap-3 m-auto w-[500px] p-5 border-stone-400 border-2 rounded-md"
>
	<label for="firstname">First name</label>
	<input
		type="text"
		id="firstname"
		name="firstname"
		bind:value={firstname}
		autocomplete="off"
		class="h-8 pl-2 text-black border-0 rounded-md caret-black bg-stone-400"
	/>
	<label for="lastname">Last name</label>
	<input
		type="text"
		id="lastname"
		name="lastname"
		bind:value={lastname}
		autocomplete="off"
		class="h-8 pl-2 text-black border-0 rounded-md caret-black bg-stone-400"
	/>
	<label for="email">Email</label>
	<input
		name="email"
		id="email"
		bind:value={email}
		autocomplete="off"
		class="h-8 pl-2 text-black border-0 rounded-md caret-black bg-stone-400"
	/>
	<label for="password">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		bind:value={password}
		autocomplete="off"
		class="h-8 pl-2 mb-2 text-black border-0 rounded-md caret-black bg-stone-400"
	/>
	<button type="submit" class="self-center p-2 bg-gray-600 rounded-md">Register</button>
	<p class="text-center">
		Don't have an account? <a href="/auth/login" class="underline">Jump in!</a>
	</p>
</form>
