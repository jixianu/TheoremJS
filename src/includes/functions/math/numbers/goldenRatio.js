get goldenRatio() {
	const n = 15
	const BN = BigNumber.clone({ DECIMAL_PLACES: n + 1 })
	return new BN(BN(1).plus(this.sqrt(5)).div(2).toFixed(n + 1))
}
