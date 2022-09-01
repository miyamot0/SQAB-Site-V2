/*
   Copyright 2018 Shawn Gilroy

   This file is part of Demand Curve Analyzer, web port.

   Demand Curve Analyzer is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, version 3.

   Demand Curve Analyzer is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with Demand Curve Analyzer.  If not, see http://www.gnu.org/licenses/.
*/

function unIHS(x) {
  return 1/Math.pow(10, (1 * x))*(Math.pow(10, (2 * x))-1);
}

function ihsTransform(x) {
  return Math.log(0.5*x + Math.sqrt((Math.pow(0.5, 2)) * (Math.pow(x, 2))+1))/Math.log(10);
}

function costFunctionExponential(inputs, cost) {
  return Math.log10(inputs[0]) + setK * (Math.exp(-inputs[1] * inputs[0] * cost) - 1);
}

function costFunctionExponentialWithK(inputs, cost) {
  return Math.log10(inputs[0]) + inputs[2] * (Math.exp(-inputs[1] * inputs[0] * cost) - 1);
}

function costFunctionExponentiated(inputs, cost) {
  return inputs[0] * Math.pow(10, setK * (Math.exp(-inputs[1] * inputs[0] * cost) - 1));
}

function costFunctionExponentiatedWithK(inputs, cost) {
  return inputs[0] * Math.pow(10, inputs[2] * (Math.exp(-inputs[1] * inputs[0] * cost) - 1));
}

function costFunctionIHS3(inputs, cost) {
  return ihsTransform(inputs[0]) + setK * (Math.exp(-inputs[1] * inputs[0] * cost) - 1);
}

function costFunctionIHS3WithK(inputs, cost) {
  return ihsTransform(inputs[0]) + inputs[2] * (Math.exp(-inputs[1] * inputs[0] * cost) - 1);
}

function costFunctionIHS2(inputs, cost) {
  const tQ = ihsTransform(inputs[0]);
  return tQ * (Math.exp((-inputs[1]/tQ) * inputs[0] * cost))
}

/*-*-*-*-*-*-*-*-*-*-*-* Functions with Error Codes *-*-*-*-*-*-*-*-*-*-*-*/
function gsl_sf_lambert_W0_e(x) {
  const one_over_E = 1.0 / Math.E;
  const q = x + one_over_E;

  var result = {};

  if (x === 0.0) {
    result.val = 0.0;
    result.err = 0.0;
    result.success = true;

    return result;
  } else if (q < 0.0) {
    /* Strictly speaking this is an error. But because of the
     * arithmetic operation connecting x and q, I am a little
     * lenient in case of some epsilon overshoot. The following
     * answer is quite accurate in that case. Anyway, we have
     * to return GSL_EDOM.
     */
    result.val = -1.0;
    result.err = Math.sqrt(-q);
    result.success = false; // GSL_EDOM

    return result;
  } else if (q === 0.0) {
    result.val = -1.0;
    result.err = GSL_DBL_EPSILON;
    /* cannot error is zero, maybe q == 0 by "accident" */
    result.success = true;

    return result;
  } else if (q < 1.0e-3) {
    /* series near -1/E in sqrt(q) */
    const r = Math.sqrt(q);
    result.val = series_eval(r);
    result.err = 2.0 * GSL_DBL_EPSILON * Math.abs(result.val);
    result.success = true;

    return result;
  } else {
    const MAX_ITERS = 100;

    var w;

    if (x < 1.0) {
      /* obtain initial approximation from series near x=0;
       * no need for extra care, since the Halley iteration
       * converges nicely on this branch
       */
      const p = Math.sqrt(2.0 * Math.E * q);
      w = -1.0 + p * (1.0 + p * (-1.0 / 3.0 + (p * 11.0) / 72.0));
    } else {
      /* obtain initial approximation from rough asymptotic */
      w = Math.log(x);
      if (x > 3.0) w -= Math.log(w);
    }

    return halley_iteration(x, w, MAX_ITERS, result);
  }
}

/*
  lambertw by protobi
  Source: https://github.com/protobi/lambertw

  Javascript port of the Lambert W function from the GNU Scientific Library
  Original Source: https://www.gnu.org/software/gsl/

  Licensed by the General Public License - Version 3
*/

const GSL_DBL_EPSILON = 2.2204460492503131e-16;

function halley_iteration(x, w_initial, max_iters) {
  var w = w_initial,
    i;

  for (i = 0; i < max_iters; i++) {
    var tol;
    var e = Math.exp(w);
    var p = w + 1.0;
    var t = w * e - x;

    if (w > 0) {
      t = t / p / e;
      /* Newton iteration */
    } else {
      t /= e * p - (0.5 * (p + 1.0) * t) / p;
      /* Halley iteration */
    }

    w -= t;

    tol = GSL_DBL_EPSILON * Math.max(Math.abs(w), 1.0 / (Math.abs(p) * e));

    if (Math.abs(t) < tol) {
      return {
        val: w,
        err: 2.0 * tol,
        iters: i,
        success: true,
      };
    }
  }
  /* should never get here */

  return {
    val: w,
    err: Math.abs(w),
    iters: i,
    success: false,
  };
}

/* series which appears for q near zero;
 * only the argument is different for the different branches
 */
function series_eval(r) {
  const c = [
    -1.0, 2.331643981597124203363536062168, -1.812187885639363490240191647568,
    1.936631114492359755363277457668, -2.353551201881614516821543561516,
    3.066858901050631912893148922704, -4.17533560025817713885498417746,
    5.858023729874774148815053846119, -8.401032217523977370984161688514, 12.250753501314460424,
    -18.100697012472442755, 27.02904479901056165,
  ];

  const t_8 = c[8] + r * (c[9] + r * (c[10] + r * c[11]));
  const t_5 = c[5] + r * (c[6] + r * (c[7] + r * t_8));
  const t_1 = c[1] + r * (c[2] + r * (c[3] + r * (c[4] + r * t_5)));
  return c[0] + r * t_1;
}

function getModelTag(obj) {
  var tag = obj.Exponential ? 'Exponential' : 'Exponentiated';

  tag = obj.KFit ? tag + ' w/ K' : tag + ' w/o K';

  return tag;
}
