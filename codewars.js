//exercicio 1 code wars
function opposite(number) {
	if (typeof number !== 'number') {
		return 'invalid number';
	}

	if (number > 0) {
		return number - (number + number);
	}

	if (number < 0) {
		return number - (number + number);
	}

	return 0;
}
