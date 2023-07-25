<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAccessToken } from '$shared/tokensWorkshop';
	import { page } from '$app/stores';
	import Coin from '$components/Coin.svelte';
	import './styles.css';
	import './app.css';

	let tokens: any;
	let route: any;

	onMount(() => {
		tokens = getAccessToken();
		route = $page.route.id;
	});

	$: page.subscribe((value) => {
		route = value.route.id;
	});

	const submitLogout = async () => {
		goto('/');
	};
</script>

<div class="w-screen p-8 app">
	<nav class="flex items-center justify-between pb-4">
		<div class="flex gap-3">
			{#if tokens}
				<div class="flex items-center gap-2">
					<h1 class="text-3xl">Specie</h1>
					<Coin />
				</div>
			{:else}
				<div class="flex items-center gap-2">
					<h1 class="text-3xl">Specie</h1>
					<Coin />
				</div>
			{/if}
		</div>
		{#if tokens}
			<form action="/logout" method="POST" on:submit={submitLogout}>
				<button type="submit" class="btn btn-primary">Logout</button>
			</form>
		{:else}
			<div class="flex gap-3">
				{#if route === '/auth/register'}
					<a href="/auth/login" class="btn btn-primary">Login</a>
				{/if}
				{#if route === '/auth/login'}
					<a href="/auth/register" class="btn btn-secondary">Register</a>
				{/if}
			</div>
		{/if}
	</nav>

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
