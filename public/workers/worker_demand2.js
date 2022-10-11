self.importScripts('random.min.js');
self.importScripts('math.min.js');
self.importScripts('utilities_demand2.js');
self.importScripts('utilities_de.js');
self.importScripts('numeric.min.js');

// eslint-disable-next-line no-undef
// importScripts('https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js');

var boundUpper, boundLower, hiP, loP;

var setK = null;

function unIHS(x) {
  return (1 / Math.pow(10, 1 * x)) * (Math.pow(10, 2 * x) - 1);
}

function ihsTransform(x) {
  return Math.log(0.5 * x + Math.sqrt(Math.pow(0.5, 2) * Math.pow(x, 2) + 1)) / Math.log(10);
}

function setKValue(obj) {
  switch (obj.KFit) {
    case 'Log Range':
      setK = Math.log10(hiQ) - Math.log10(loQ) + 0.5;
      break;
    case 'Custom':
      setK = parseFloat(obj.KValue);
      break;
    default:
      return;
  }
}

function beginLooper(obj) {
  setKValue(obj);

  // Prep data
  switch (obj.model) {
    case 'Exponential Model':
      yValues = yValues.map(Math.log10);

      if (obj.KFit === 'Fit as Parameter') {
        boundsU = [hiQ * 2, Math.pow(10, -1), Math.log10(hiQ)];
        boundsL = [1, Math.pow(10, -10), 0.5];

        Optimize(costFunctionExponentialWithK);
      } else {
        boundsU = [hiQ * 2, Math.pow(10, -1)];
        boundsL = [1, Math.pow(10, -10)];

        Optimize(costFunctionExponential);
      }

      break;
    case 'Exponentiated Model':
      if (obj.KFit === 'Fit as Parameter') {
        boundsU = [hiQ * 2, Math.pow(10, -1), Math.log10(hiQ)];
        boundsL = [1, Math.pow(10, -10), 0.5];

        Optimize(costFunctionExponentiatedWithK);
      } else {
        boundsU = [hiQ * 2, Math.pow(10, -1)];
        boundsL = [1, Math.pow(10, -10)];

        Optimize(costFunctionExponentiated);
      }
      break;
    case 'Zero-bounded Model (with K)':
      yValues = yValues.map(ihsTransform);

      //if (obj.KFit === 'Fit as Parameter') {
      boundsU = [hiQ * 2, Math.pow(10, -1), ihsTransform(hiQ)];
      boundsL = [1, Math.pow(10, -10), 0.25];

      Optimize(costFunctionIHS3WithK);
      //} else {
      //  if (obj.FitK === 'Log Range') {
      //    setK = ihsTransform(hiQ) - ihsTransform(loQ) + 1;
      //  } else if (obj.FitK === 'Custom') {
      //    setK = parseFloat(obj.KValue);
      //  }
      //
      //  boundsU = [hiQ * 2, Math.pow(10, -1)];
      //  boundsL = [1, Math.pow(10, -10)];
      //
      //  Optimize(costFunctionIHS3);
      //}

      break;
    case 'Zero-bounded Model (no K)':
      yValues = yValues.map(ihsTransform);

      boundsU = [hiQ * 2, Math.pow(10, -1)];
      boundsL = [1, Math.pow(10, -10)];

      Optimize(costFunctionIHS2);
      break;
    default:
      return;
  }

  result.Model = obj.model;

  result.FitK = obj.KFit;
  result.SetK = setK;
  result.Params = GetBestAgent();

  if (obj.KFit === 'Fit as Parameter') {
    result.SetK = result.Params[2];
  }

  result.Q0 = result.Params[0];
  result.Alpha = result.Params[1];
  result.K = result.SetK;

  if (obj.model === 'Zero-bounded Model (no K)') {
    result.K = undefined;
  }

  result.MSE = GetBestCost();
  result.RMSE = Math.sqrt(GetBestCost());
  result.Y = yValues;
  result.X = xValues;
  result.HQ = hiQ;
  result.LQ = loQ;

  CalculateAIC(result);
  CalculateBIC(result);
  CalculatePmax(result);

  // generate preds
  switch (obj.model) {
    case 'Exponential Model':
      if (obj.KFit === 'Fit as Parameter') {
        result.K = result.Params[2];
        result.OmaxA = costFunctionExponential(result.Params, result.PmaxA);
      } else {
        result.OmaxA = costFunctionExponential([...result.Params, setK], result.PmaxA);
      }

      result.OmaxA = Math.pow(10, result.OmaxA) * result.PmaxA;

      break;
    case 'Exponentiated Model':
      if (obj.KFit === 'Fit as Parameter') {
        result.K = result.Params[2];
        result.OmaxA = costFunctionExponentiated(result.Params, result.PmaxA);
      } else {
        result.OmaxA = costFunctionExponentiatedWithK([...result.Params, setK], result.PmaxA);
      }

      result.OmaxA = result.OmaxA * result.PmaxA;

      break;
    case 'Zero-bounded Model (with K)':
      if (obj.KFit === 'Fit as Parameter') {
        result.K = result.Params[2];
        result.OmaxA = costFunctionIHS3(result.Params, result.PmaxA);
      } else {
        result.OmaxA = costFunctionIHS3WithK([...result.Params, setK], result.PmaxA);
      }

      result.OmaxA = unIHS(result.OmaxA) * result.PmaxA;

      break;
    case 'Zero-bounded Model (no K)':
      result.OmaxA = costFunctionIHS2(result.Params, result.PmaxA);
      result.OmaxA = unIHS(result.OmaxA) * result.PmaxA;

      break;
    default:
      return;
  }

  postMessage({
    done: true,
    ...result,
  });
}

onmessage = function (passer) {
  generator = Random.engines.mt19937().seed(123);
  random = new Random(generator);
  maxits = passer.data.maxIterations;

  xValues = passer.data.x.slice();
  xValues = [...xValues];
  xValues = [].concat.apply([], xValues);
  xValues = xValues.map(Number);

  yValues = passer.data.y.slice();
  yValues = [...yValues];
  yValues = [].concat.apply([], yValues);
  yValues = yValues.map(Number);

  hiQ = Math.max(...yValues);

  hiP = Math.max(...xValues);

  var nonZeroValues = yValues.filter(function (val) {
    return val > 0;
  });

  loQ = Math.min(...nonZeroValues);

  beginLooper(passer.data);
};
