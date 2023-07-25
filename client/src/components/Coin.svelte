<div class="coin show-back">
	<div class="font-bold coin_front">1</div>
	<div class="coin_back">🛡️</div>
</div>

<style>
	:root {
		--gold: #ffd700;
		--goldenrod: #d4af37;
	}
	.coin {
		width: 32px;
		height: 32px;
		background-color: var(--gold);
		border: 2px solid var(--goldenrod);
		border-radius: 50%;
		position: relative;
		animation: spinCoin 1.5s linear infinite;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
		display: flex;
		align-items: center;
		justify-content: center;
		transform-style: preserve-3d;
	}

	@keyframes spinCoin {
		0% {
			transform: rotateY(0deg);
		}
		100% {
			transform: rotateY(360deg);
		}
	}

	/* Show the back face of the coin */
	.coin.show-back .coin_back {
		transform: rotateY(0deg);
	}

	/* Hide the front face of the coin */
	.coin.show-back .coin_front {
		transform: rotateY(180deg);
	}

	.coin_front,
	.coin_back {
		position: absolute;
		width: 32px;
		height: 32px;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		border-radius: 50%;
		color: var(--goldenrod);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.coin_back {
		background-color: var(--gold);
		border: 2px solid var(--goldenrod);
	}
</style>
