<table>
	<thead>
		<tr>
			<th>Category</th>
			<th>Subcategory</th>
			<th>Price</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Cell 1</td>
			<td>Cell 2</td>
			<td>Cell 3</td>
		</tr>
		<tr>
			<td>Cell 1</td>
			<td>Cell 2</td>
			<td>Cell 3</td>
		</tr>
		<tr>
			<td>Cell 1</td>
			<td>Cell 2</td>
			<td>Cell 3</td>
		</tr>
		<tr>
			<td>Cell 1</td>
			<td>Cell 2</td>
			<td>Cell 3</td>
		</tr>
		<tr>
			<td>Cell 1</td>
			<td>Cell 2</td>
			<td>Cell 3</td>
		</tr>
	</tbody>
</table>

<style>
	table {
		width: 400px;
		border-collapse: collapse;
		overflow: hidden;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		border-radius: 6px;
	}

	th,
	td {
		padding: 15px;
		background-color: grey;
		text-align: center;
		color: #fff;
	}

	th {
		text-align: center;
		width: calc(100% / 3);
	}

	thead th {
		background-color: #55608f;
	}

	tbody tr:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}

	tbody td {
		position: relative;
	}

	tbody td:hover:before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: -9999px;
		bottom: -9999px;
		background-color: rgba(255, 255, 255, 0.2);
		z-index: -1;
	}
</style>
