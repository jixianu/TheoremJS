const t = require(__testDir + "../dist/theorem.js")

eye.describe("Array", () => {
    eye.test("Flatten", "node",
        $ => $(t.flatten([
            [1, 2],
            [3, 4], 5
        ])).Equal([1, 2, 3, 4, 5])
    )
    eye.test("Linspace", "node",
        $ => $(t.linspace(0, 100, 10)).Equal([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
    )
    eye.test("Range & Arange", "node",
        $ => $(t.range(10)).Equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    )
    eye.test("Reshape", "node",
        $ => $(t.reshape(t.range(10), 2)).Equal([
            [0, 1],
            [2, 3],
            [4, 5],
            [6, 7],
            [8, 9],
            [10]
        ])
    )
})
eye.describe("Cryptography", () => {
	eye.test("SHA256", "node",
		$ => $(t.sha256("TheoremJS")).Equal("506a3473100061c0f1237f17949e1b65b47eb8ed2ce22d1685dc3354acb700a9"),
		$ => $(t.sha256(0)).Equal("5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9")
	)
	eye.test("MD5", "node",
		$ => $(t.md5("TheoremJS")).Equal("80139a691767b8ba6c43873c40fc9fe1")
	)
	eye.test("str2bin", "node",
		$ => $(t.str2bin("TheoremJS")).Equal("01010100 01101000 01100101 01101111 01110010 01100101 01101101 01001010 01010011 ")
	)
	eye.test("bin2str", "node",
		$ => $(t.bin2str("01010100 01101000 01100101 01101111 01110010 01100101 01101101 01001010 01010011")).Equal("TheoremJS")
	)
	eye.test("Huffman", "node",
		$ => $(t.huffmanEncode("bibbity bobbity").string).Equal("01110011110010111000110100111100101"),
		$ => $(t.huffmanDecode("01110011110010111000110100111100101", t.huffmanEncode("bibbity bobbity").tree)).Equal("bibbity bobbity")
	)
})
eye.describe("Math", () => {
    eye.describe("Algebra", () => {
        eye.test("Function", "node",
            $ => $(t.run(t.f("x", "2*x+1"), 2)).isCloseTo(5)
        )
		eye.test("Fractions", "node",
			$ => $(t.toFraction(0.75)).Equal(["3", "4"]),
			$ => $(t.toFraction(3.1415926535, 10)).Equal(["22", "7"]),
			$ => $(t.toDec("3", "4").toNumber()).Equal(0.75)
		)
        eye.test("Find Roots & Polynomial", "node",
            $ => $(t.findRoots(t.polynomial(1, -1, -1))).Equal(['(1 + Math.sqrt(5)) / 2', '(1 - Math.sqrt(5)) / 2']),
            $ => {
                const roots = t.findRoots(t.polynomial(-3, 0, 2, 0))
                return $(roots[1]).isCloseTo(Math.sqrt(2 / 3))
            },
            $ => $(t.polynomial(1, -1, -1).core(0)).isCloseTo(-1),
			$ => $(t.findRoots(t.polynomial(-1, 0, -1))).Equal([])
        )
        eye.test("Numeral Solve & Graph", "node",
            $ => $(t.numeralSolve(t.f("x", "2*x+1"), 0)).Equal(-0.5),
			$ => $(t.numeralSolve(t.f("x", "x ** 0.5"), 5)).Equal(25)
        )
        eye.test("Y-Intercept", "node",
            $ => $(t.y_intercept(t.f("x", "2*x+1"))).isCloseTo(1)
        )
        eye.describe("Calculus", () => {
			eye.test("Gradient", "node",
				$ => $(t.gradient({
					2: 3
				}, {
					6: 8
				})).Equal(1.25)
			)
            eye.test("Derivative", "node",
                $ => $(t.derivate(t.polynomial(1, -1, -1)).values).Equal([2, -1]),
                $ => $(t.derivate(t.polynomial(5, 2, -1, 3)).values).Equal([15, 4, -1])
            )
            eye.test("Integral", "node",
                $ => $(t.integrate(t.polynomial(1, -1, -1)).values).Equal([0.3333333333333333, -0.5, -1, 0]),
                $ => $(t.integrate(t.polynomial(1, -1, -1)).f).Equal("0 * x**0 + -1 * x**1 + -0.5 * x**2 + 0.3333333333333333 * x**3 ")
            )
        })
    })
	eye.describe("Complex", () => {
		eye.test("Abs", "node",
			$ => $(t.complex(1, 1).abs()).Equal(t.n(2).sqrt()),
			$ => $(t.complex(32, 12).abs().toNumber()).isCloseTo(34.17601498127012)
		)
		eye.test("Arg", "node",
			$ => $(t.complex(1, 1).arg().toNumber()).isCloseTo(t.c("pi").div(4).toNumber())
		)
		eye.test("Clone", "node",
			$ => $(t.complex(1, 1).clone().toString()).Equal("1 + 1i")
		)
		eye.test("Conjugate", "node",
			$ => $(t.complex(1, 1).conjugate().toString()).Equal("1 - 1i")
		)
		eye.test("Division", "node",
			$ => $(t.complex(1, 1).div(t.complex(1, 1)).toString()).Equal("1 + 0i"),
			$ => $(t.complex(2, 3).div(t.complex(3, -5)).toString()).Equal("-0.26470588235294117647 + 0.55882352941176470588i")
		)
		eye.test("Equality", "node",
			$ => $(t.complex(2, 3).eq(t.complex(3, 3).minus(t.complex(1, 0)))).Equal(true)
		)
		eye.test("Exponential", "node",
			$ => $(t.complex(2, 3).exp().toString()).Equal("-7.31511009490109891372481413925 + 1.04274365623590274091988122355i")
		)
		eye.test("Logarithm", "node",
			$ => $(t.complex(2, 3).ln().toString()).Equal("1.28247380404213 + 0.982793723247329i"),
			$ => $(t.complex(100, 0).log(10).toString()).Equal("1.99992155781462 + 0i"),
			$ => $(t.log(t.complex(4, 2), 2).toString()).Equal("2.16095516072906501293 + 0.66890210622548354827i")
		)
		eye.test("Minus", "node",
			$ => $(t.complex(3, -4).minus(t.complex(2, 4)).toString()).Equal("1 - 8i")
		)
		eye.test("Negated", "node",
			$ => $(t.complex(2, 3).negated().toString()).Equal("-2 - 3i")
		)
		eye.test("Addition", "node",
			$ => $(t.complex(18, -12).plus(t.complex(-3, 2)).toString()).Equal("15 - 10i")
		)
		eye.test("Exponentiation", "node",
			$ => $(t.complex(3, 2).pow(t.complex(4, -2)).toString()).Equal("535.424019276695978424428817368 - 115.76768825678578727266368994i"),
			$ => $(t.complex(2, 0).pow(t.complex(2, 0)).toString()).Equal("4 + 0i"),
			$ => $(t.complex(0, 1).pow(t.complex(2, 0)).toString()).Equal("-1 + 0i")
		)
		eye.test("Multiplication", "node",
			$ => $(t.complex(2, 3).times(t.complex(4, 5)).toString()).Equal("-7 + 22i")
		)
	})
    eye.describe("Math Basic Functions", () => {
		eye.test("Exp", "node",
			$ => $(t.ln(t.exp(3)).toNumber()).isCloseTo(3)
		)
        eye.test("Factorial", "node",
            $ => $(t.factorial(5).toNumber()).Equal(120)
        )
        eye.test("Pow", "node",
            $ => $(t.pow(2, 8).toNumber()).Equal(256)
        )
        eye.test("Root", "node",
            $ => $(t.root(256, 8).toNumber()).Equal(2)
        )
        eye.test("Sqrt", "node",
            $ => $(t.sqrt(4).toNumber()).Equal(2),
			$ => $(t.sqrt(-9).toString()).Equal("0 + 3i")
        )
        eye.test("Sigmoid", "node",
            $ => $(t.y_intercept(t.f(x => t.sigmoid(x).toNumber()))).Equal(0.5)
        )
    })
    eye.describe("Numbers", () => {
        eye.test("Pi", "node",
            $ => $(t.pi.toNumber()).Equal(3.141592653589793)
        )
        eye.test("e", "node",
            $ => $(t.e.toNumber()).Equal(2.718281828459046)
        )
        eye.test("Golden Ratio", "node",
            $ => $(t.goldenRatio.toNumber()).Equal(1.618033988749895)
        )
        eye.test("Constants", "node",
            $ => $(t.c("pi")).isCloseTo(t.pi, 14),
            $ => $(t.c("e")).isCloseTo(t.e, 14),
            $ => $(t.c("goldenRatio")).isCloseTo(t.goldenRatio, 14)
        )
        eye.describe("Primes", () => {
            eye.test("isPrime", "node",
                $ => $(t.isPrime(31013)).Equal(true),
                $ => $(t.isPrime(1)).Equal(false),
                $ => $(t.isPrime(2)).Equal(true)
            )
        })
		eye.test("Round, Ceil & Floor", "node",
			$ => $(t.round(5.5).toNumber()).Equal(6),
			$ => $(t.ceil(1.1).toNumber()).Equal(2),
			$ => $(t.floor(1.7).toNumber()).Equal(1)
		)
    })
    eye.describe("Other", () => {
        eye.test("Apply", "node",
            $ => $(t.apply(2, x => 2 * x)).Equal(4)
        )
        eye.test("Min, Max & Sort", "node",
            $ => $(t.min(1, 3, 2)).Equal(1),
            $ => $(t.max(1, 3, 2)).Equal(3),
            $ => $(t.sort(1, 3, 2)).Equal([1, 2, 3])
        )
        eye.test("Product", "node",
            $ => $(t.product(1, 3, 2).toNumber()).Equal(6)
        )
        eye.test("Sum", "node",
            $ => $(t.sum(1, 3, 3).toNumber()).Equal(7)
        )
    })
    eye.describe("Statistiques", () => {
        eye.test("Average", "node",
            $ => $(t.average(10, 20, 15).toNumber()).Equal(15)
        )
        eye.test("Median", "node",
            $ => $(t.median(10, 20, 15).toNumber()).Equal(15)
        )
		eye.test("Quantile", "node",
			$ => $(t.quantile(1 / 2, 10, 20, 15).toNumber()).Equal(15),
			$ => $(t.quantile(1 / 4, 4, 3, 5, 1, 2).toNumber()).Equal(2)
		)
        eye.test("Correlation", "node",
            $ => $(t.correlation([3, 2, 4, 5, 6], [9, 7, 12, 15, 17]).toNumber()).isCloseTo(0.997054486, 5)
        )
        eye.test("Regression", "node",
            $ => $(t.regression({
                0: 2,
                2: 4,
                3: 5
            }, 2).values).Equal([-1.973729821555837e-15, 1.000000000000006, 1.9999999999999984]),
            $ => $(t.regression({
                0: 2,
                1: 5,
                3: 11
            }, 1).values).Equal([3, 2])
        )
    })
    eye.describe("Trigonometry", () => {
        eye.describe("Basic", () => {
            eye.test("Sin", "node",
                $ => $(t.sin(0)).isCloseTo(0),
                $ => $(t.sin(t.pi)).isCloseTo(0),
                $ => $(t.sin(60)).isCloseTo(Math.sin(60)),
				$ => $(t.sin(t.complex(3, 2)).toString()).Equal("0.5309210862485197 - 3.59056458998578i")
            )
            eye.test("Cos", "node",
                $ => $(t.cos(0)).isCloseTo(1),
                $ => $(t.cos(t.pi)).isCloseTo(-1),
                $ => $(t.cos(60)).isCloseTo(Math.cos(60)),
				$ => $(t.cos(t.complex(t.c("pi"), 1)).toString()).Equal("-1.5430806348152437 - 1.4392063801500302e-16i")
            )
            eye.test("Tan", "node",
                $ => $(t.tan(0)).isCloseTo(0),
                $ => $(t.tan(t.pi)).isCloseTo(0),
                $ => $(t.tan(60)).isCloseTo(Math.tan(60)),
				$ => $(t.tan(t.complex(3, 2)).toString()).Equal("-0.009884375038322494 + 0.965385879022133i")
            )
        })
        eye.describe("Hyperbolic", () => {
            eye.test("Sinh", "node",
                $ => $(t.sinh(0)).isCloseTo(0),
                $ => $(t.sinh(t.pi)).isCloseTo(Math.sinh(Math.PI)),
				$ => $(t.sinh(t.complex(2, 3)).toString()).Equal("-3.59056458998578 + 0.5309210862485197i")
            )
            eye.test("Cosh", "node",
                $ => $(t.cosh(0)).isCloseTo(1),
                $ => $(t.cosh(t.pi)).isCloseTo(Math.cosh(Math.PI)),
				$ => $(t.cosh(t.complex(2, 3)).toString()).Equal("-3.7245455049153224 + 0.5118225699873846i")
            )
            eye.test("Tanh", "node",
                $ => $(t.tanh(0)).isCloseTo(0),
                $ => $(t.tanh(t.pi)).isCloseTo(Math.tanh(Math.PI)),
				$ => $(t.tanh(t.complex(2, 3)).toString()).Equal("0.965385879022133 - 0.009884375038322494i")
            )
        })
        eye.describe("Arc", () => {
            eye.test("Asin", "node",
                $ => $(t.asin(0)).isCloseTo(0),
                $ => $(t.asin(1)).isCloseTo(t.pi.div(2))
            )
            eye.test("Acos", "node",
                $ => $(t.acos(0)).isCloseTo(Math.acos(0)),
                $ => $(t.acos(1)).isCloseTo(0)
            )
            eye.test("Atan", "node",
                $ => $(t.atan(0)).isCloseTo(0),
                $ => $(t.atan(t.pi)).isCloseTo(Math.atan(Math.PI))
            )
        })
        eye.describe("Arc Hyperbolic", () => {
            eye.test("Asinh", "node",
                $ => $(t.asinh(0)).isCloseTo(0),
                $ => $(t.asinh(1)).isCloseTo(Math.asinh(1))
            )
            eye.test("Acosh", "node",
                $ => $(t.acosh(10)).isCloseTo(Math.acosh(10)),
                $ => $(t.acosh(1)).isCloseTo(0)
            )
            eye.test("Atanh", "node",
                $ => $(t.atanh(0)).isCloseTo(0),
                $ => $(t.atanh(0.5)).isCloseTo(Math.atanh(0.5))
            )
        })
        eye.test("Atan2", "node",
            $ => $(t.atan2(90, 15)).isCloseTo(Math.atan2(90, 15))
        )

		 eye.describe("Units", () => {
			eye.test("Speed", "node",
				$ => $(t.convert(1, "speed", "m/s", "km/h").toNumber()).Equal(3.6),
				$ => $(t.convert(20, "speed", "m/h", "km/h").toNumber()).isCloseTo(32.19)
			)
			eye.test("Length / Distance", "node",
				$ => $(t.convert(1, "distance", "mi", "km").toNumber()).Equal(1.609344),
				$ => $(t.convert(10, "length", "cm", "m").toNumber()).Equal(0.1),
				$ => $(t.convert(1, "distance", "ly", "m")).Equal(t.n("9460730472580.8").times(1000))
			)
			eye.test("Time", "node",
				$ => $(t.convert(12, "time", "mo", "y").toNumber()).isCloseTo(1, 1)
			)
			eye.test("Mass", "node",
				$ => $(t.convert(1024, "mass", "kg", "t").toNumber()).Equal(1.024),
				$ => $(t.convert(24, "mass", "t", "oz").toNumber()).isCloseTo(846575, 0)
			)
			eye.test("Temperature", "node",
				$ => $(t.convert(0, "temperature", "c", "k").toNumber()).Equal(273.15),
				$ => $(t.convert(12, "temperature", "f", "k").toNumber()).isCloseTo(262, 1)
			)
			eye.test("Area", "node",
				$ => $(t.units(3, "area", "km2", "cm2").toNumber()).Equal(3e+10),
				$ => $(t.convert(5, "area", "mi2", "km2").toNumber()).isCloseTo(12.95)
			)
			eye.test("Volume", "node",
				$ => $(t.units(3, "volume", "l", "mm3").toNumber()).Equal(3e+6),
				$ => $(t.convert(12, "volume", "gal", "m3").toNumber()).isCloseTo(0.045424944, 5)
			)
		})

		eye.describe("Other", () => {
			eye.test("Deg & Rad convertions", "node",
	            $ => $(t.deg2rad(180)).Equal(t.pi),
	            $ => $(t.rad2deg(t.pi).toNumber()).Equal(180)
	        )
	        eye.test("Draw Circular Points", "node",
	            $ => $(parseFloat(Object.keys(t.drawCircularPoints(3))[0])).Equal(-1),
	            $ => $(parseFloat(Object.keys(t.drawCircularPoints(3))[1])).isCloseTo(0.5),
	            $ => $(parseFloat(Object.keys(t.drawCircularPoints(3))[2])).isCloseTo(0.5),
	        )
			eye.test("Angle to Vector", "node",
				$ => $(t.angle2Vec(Math.PI / 6)[0]).isCloseTo(Math.sqrt(3) / 2),
				$ => $(t.angle2Vec(Math.PI / 6)[1]).isCloseTo(0.5)
			)
		})
    })
    eye.describe("Other", () => {
        eye.test("Convert to base", "node",
            $ => $(t.convertToBase(2, 2)).Equal('10'),
            $ => $(t.convertToBase(400, 64)).Equal('6g')
        )
    })
})
