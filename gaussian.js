// Credits to https://github.com/errcw/gaussian

// Initialize Standard Deviation, Variance, and Mean
const standardDeviation = 1
const variance = 1
const mean = 0

function erfc(x) {
    var z = Math.abs(x);
    var t = 1 / (1 + z / 2);
    var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
            t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
            t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
            t * (-0.82215223 + t * 0.17087277)))))))))
    return x >= 0 ? r : 2 - r;
};

function ierfc(x) {
    if (x >= 2) { return -100; }
    if (x <= 0) { return 100; }

    var xx = (x < 1) ? x : 2 - x;
    var t = Math.sqrt(-2 * Math.log(xx / 2));

    var r = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);

    for (var j = 0; j < 2; j++) {
      var err = erfc(r) - xx;
      r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
    }

    return (x < 1) ? r : -r;
};

// Z-score to Probability
export function cdf(x) {
    return 0.5 * erfc(-(x - mean) / (standardDeviation * Math.sqrt(2)));
};

export function pdf(x) {
    var m = standardDeviation * Math.sqrt(2 * Math.PI);
    var e = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
    return e / m;
};

// Probability to Z-score
export function ppf(x) {
    return mean - standardDeviation * Math.sqrt(2) * ierfc(2 * x);
};
