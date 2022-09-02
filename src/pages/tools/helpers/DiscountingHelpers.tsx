export function getExponentialProjection(x: number, k: number[]): number {
  return Math.exp(-k[0] * x);
}

export function getHyperbolicProjection(x: number, k: number[]): number {
  return Math.pow(1 + k[0] * x, -1);
}

export function getQuasiHyperbolicProjection(x: number, k: number[]): number {
  return k[0] * Math.pow(k[1], x);
}

export function getMyersonProjection(x: number, k: number[]): number {
  return Math.pow(1 + k[0] * x, -k[1]);
}

export function getRachlinProjection(x: number, k: number[]): number {
  return Math.pow(1 + k[0] * Math.pow(x, k[1]), -1);
}

export function getRodriguezLogueProjection(x: number, k: number[]): number {
  return Math.pow(1 + x * k[0], -k[1] / k[0]);
}

export function getEbertPrelecProjection(x: number, k: number[]): number {
  return Math.exp(-Math.pow(k[0] * x, k[1]));
}

export function getbleichrodtProjection(x: number, k: number[]): number {
  return k[2] * Math.exp(-k[0] * Math.pow(x, k[1]));
}

export function getNoise(obj: any, isTop: boolean): string {
  var mReturn = '';
  mReturn += 'Noise Mean (c): ' + parseFloat(obj.Params[0]).toFixed(6) + '<br>';
  mReturn += 'Noise AIC: ' + obj.AIC.toFixed(6) + '<br>';
  mReturn += 'Noise BIC: ' + obj.BIC.toFixed(6) + '<br>';
  mReturn += 'Noise RMS error: ' + obj.RMSE.toFixed(6) + '<br>';
  mReturn += 'Noise avg error: ' + obj.MSE.toFixed(6) + '<br>';
  mReturn += '<b>Noise Probability: ' + obj.Probability.toFixed(6) + '</b><br>';

  if (isTop) {
    mReturn += '<b>Noise Area (Natural): ' + obj.AUC.toFixed(6) + '</b><br>';
    mReturn += '<b>Noise Area (Log10 Scale): ' + obj.AUClog10.toFixed(6) + '</b><br>';
  }

  return mReturn;
}

export function getExponential(obj: any, isTop: boolean): string {
  var mReturn = '';
  mReturn += 'Exponential (k): ' + obj.Params[0].toFixed(6) + '<br>';
  mReturn += 'Exponential AIC: ' + obj.AIC.toFixed(6) + '<br>';
  mReturn += 'Exponential BIC: ' + obj.BIC.toFixed(6) + '<br>';
  mReturn += 'Exponential RMS error: ' + obj.RMSE.toFixed(6) + '<br>';
  mReturn += 'Exponential avg error: ' + obj.MSE.toFixed(6) + '<br>';
  mReturn += '<b>Exponential Probability: ' + obj.Probability.toFixed(6) + '</b><br>';

  if (isTop) {
    mReturn += '<b>Exponential ln(ED50): ' + obj.ED50.toFixed(6) + '</b><br>';
    mReturn += '<b>Exponential Area (Natural): ' + obj.AUC.toFixed(6) + '</b><br>';
    mReturn += '<b>Exponential Area (Log10 Scale): ' + obj.AUClog10.toFixed(6) + '</b><br>';
  }

  return mReturn;
}

export function getHyperbolic(obj: any, isTop: boolean): string {
  var mReturn = '';
  mReturn += 'Hyperbolic (k): ' + obj.Params[0].toFixed(6) + '<br>';
  mReturn += 'Hyperbolic AIC: ' + obj.AIC.toFixed(6) + '<br>';
  mReturn += 'Hyperbolic BIC: ' + obj.BIC.toFixed(6) + '<br>';
  mReturn += 'Hyperbolic RMS error: ' + obj.RMSE.toFixed(6) + '<br>';
  mReturn += 'Hyperbolic avg error: ' + obj.MSE.toFixed(6) + '<br>';
  mReturn += '<b>Hyperbolic Probability: ' + obj.Probability.toFixed(6) + '</b><br>';

  if (isTop) {
    mReturn += '<b>Hyperbolic ln(ED50): ' + obj.ED50.toFixed(6) + '</b><br>';
    mReturn += '<b>Hyperbolic Area (Natural): ' + obj.AUC.toFixed(6) + '</b><br>';
    mReturn += '<b>Hyperbolic Area (Log10 Scale): ' + obj.AUClog10.toFixed(6) + '</b><br>';
  }

  return mReturn;
}

export function getQuasiHyperbolic(obj: any, isTop: boolean): string {
  var mReturn = '';
  mReturn += 'Quasi Hyperbolic (b): ' + obj.Params[0].toFixed(6) + '<br>';
  mReturn += 'Quasi Hyperbolic (d): ' + obj.Params[1].toFixed(6) + '<br>';
  mReturn += 'Quasi Hyperbolic AIC: ' + obj.AIC.toFixed(6) + '<br>';
  mReturn += 'Quasi Hyperbolic BIC: ' + obj.BIC.toFixed(6) + '<br>';
  mReturn += 'Quasi Hyperbolic RMS error: ' + obj.RMSE.toFixed(6) + '<br>';
  mReturn += 'Quasi Hyperbolic avg error: ' + obj.MSE.toFixed(6) + '<br>';
  mReturn += '<b>Quasi Hyperbolic Probability: ' + obj.Probability.toFixed(6) + '</b><br>';

  if (isTop) {
    mReturn += '<b>Quasi Hyperbolic ln(ED50): ' + obj.ED50.toFixed(6) + '</b><br>';
    mReturn += '<b>Quasi Hyperbolic Area (Natural): ' + obj.AUC.toFixed(6) + '</b><br>';
    mReturn += '<b>Quasi Hyperbolic Area (Log10 Scale): ' + obj.AUClog10.toFixed(6) + '</b><br>';
  }

  return mReturn;
}

export function getRachlin(obj: any, isTop: boolean): string {
  var mReturn = '';
  mReturn += 'Rachlin (k): ' + obj.Params[0].toFixed(6) + '<br>';
  mReturn += 'Rachlin (s): ' + obj.Params[1].toFixed(6) + '<br>';
  mReturn += 'Rachlin AIC: ' + obj.AIC.toFixed(6) + '<br>';
  mReturn += 'Rachlin BIC: ' + obj.BIC.toFixed(6) + '<br>';
  mReturn += 'Rachlin RMSE error: ' + obj.RMSE.toFixed(6) + '<br>';
  mReturn += 'Rachlin avg error: ' + obj.MSE.toFixed(6) + '<br>';
  mReturn += '<b>Rachlin Probability: ' + obj.Probability.toFixed(6) + '</b><br>';

  if (isTop) {
    mReturn += '<b>Rachlin ln(ED50): ' + obj.ED50.toFixed(6) + '</b><br>';
    mReturn += '<b>Rachlin Area (Natural): ' + obj.AUC.toFixed(6) + '</b><br>';
    mReturn += '<b>Rachlin Area (Log10 Scale): ' + obj.AUClog10.toFixed(6) + '</b><br>';
  }

  return mReturn;
}

export function getMyerson(obj: any, isTop: boolean): string {
  var mReturn = '';
  mReturn += 'Myerson (k): ' + obj.Params[0].toFixed(6) + '<br>';
  mReturn += 'Myerson (s): ' + obj.Params[1].toFixed(6) + '<br>';
  mReturn += 'Myerson AIC: ' + obj.AIC.toFixed(6) + '<br>';
  mReturn += 'Myerson BIC: ' + obj.BIC.toFixed(6) + '<br>';
  mReturn += 'Myerson RMS error: ' + obj.RMSE.toFixed(6) + '<br>';
  mReturn += 'Myerson avg error: ' + obj.MSE.toFixed(6) + '<br>';
  mReturn += '<b>Myerson Probability: ' + obj.Probability.toFixed(6) + '</b><br>';

  if (isTop) {
    mReturn += '<b>Myerson ln(ED50): ' + obj.ED50.toFixed(6) + '</b><br>';
    mReturn += '<b>Myerson Area (Natural): ' + obj.AUC.toFixed(6) + '</b><br>';
    mReturn += '<b>Myerson Area (Log10 Scale): ' + obj.AUClog10.toFixed(6) + '</b><br>';
  }

  return mReturn;
}

export function getRodriguezLogue(obj: any, isTop: boolean): string {
  var mReturn = '';
  mReturn += 'Loewenstein & Prelec (k): ' + obj.Params[0].toFixed(6) + '<br>';
  mReturn += 'Loewenstein & Prelec (b): ' + obj.Params[1].toFixed(6) + '<br>';
  mReturn += 'Loewenstein & Prelec AIC: ' + obj.AIC.toFixed(6) + '<br>';
  mReturn += 'Loewenstein & Prelec BIC: ' + obj.BIC.toFixed(6) + '<br>';
  mReturn += 'Loewenstein & Prelec RMS error: ' + obj.RMSE.toFixed(6) + '<br>';
  mReturn += 'Loewenstein & Prelec avg error: ' + obj.MSE.toFixed(6) + '<br>';
  mReturn += '<b>Loewenstein & Prelec Probability: ' + obj.Probability.toFixed(6) + '</b><br>';

  if (isTop) {
    mReturn += '<b>Loewenstein & Prelec ln(ED50): ' + obj.ED50.toFixed(6) + '</b><br>';
    mReturn += '<b>Loewenstein & Prelec Area (Natural): ' + obj.AUC.toFixed(6) + '</b><br>';
    mReturn +=
      '<b>Loewenstein & Prelec Area (Log10 Scale): ' + obj.AUClog10.toFixed(6) + '</b><br>';
  }

  return mReturn;
}

export function getEbertPrelec(obj: any, isTop: boolean): string {
  var mReturn = '';
  mReturn += 'Ebert & Prelec (k): ' + obj.Params[0].toFixed(6) + '<br>';
  mReturn += 'Ebert & Prelec (s): ' + obj.Params[1].toFixed(6) + '<br>';
  mReturn += 'Ebert & Prelec AIC: ' + obj.AIC.toFixed(6) + '<br>';
  mReturn += 'Ebert & Prelec BIC: ' + obj.BIC.toFixed(6) + '<br>';
  mReturn += 'Ebert & Prelec RMS error: ' + obj.RMSE.toFixed(6) + '<br>';
  mReturn += 'Ebert & Prelec avg error: ' + obj.MSE.toFixed(6) + '<br>';
  mReturn += '<b>Ebert & Prelec Probability: ' + obj.Probability.toFixed(6) + '</b><br>';

  if (isTop) {
    mReturn += '<b>Ebert & Prelec ln(ED50): ' + obj.ED50.toFixed(6) + '</b><br>';
    mReturn += '<b>Ebert & Prelec Area (Natural): ' + obj.AUC.toFixed(6) + '</b><br>';
    mReturn += '<b>Ebert & Prelec Area (Log10 Scale): ' + obj.AUClog10.toFixed(6) + '</b><br>';
  }

  return mReturn;
}

export function getBleichrodt(obj: any, isTop: boolean): string {
  var mReturn = '';
  mReturn += 'Beleichrodt et al. (b): ' + obj.Params[2].toFixed(6) + '<br>';
  mReturn += 'Beleichrodt et al. (k): ' + obj.Params[0].toFixed(6) + '<br>';
  mReturn += 'Beleichrodt et al. (s): ' + obj.Params[1].toFixed(6) + '<br>';
  mReturn += 'Beleichrodt et al. AIC: ' + obj.AIC.toFixed(6) + '<br>';
  mReturn += 'Beleichrodt et al. BIC: ' + obj.BIC.toFixed(6) + '<br>';
  mReturn += 'Beleichrodt et al. RMS error: ' + obj.RMSE.toFixed(6) + '<br>';
  mReturn += 'Beleichrodt et al. avg error: ' + obj.MSE.toFixed(6) + '<br>';
  mReturn += '<b>Beleichrodt et al. Probability: ' + obj.Probability.toFixed(6) + '</b><br>';

  if (isTop) {
    mReturn += '<b>Beleichrodt et al. ln(ED50): ' + obj.ED50.toFixed(6) + '</b><br>';
    mReturn += '<b>Beleichrodt et al. Area (Natural): ' + obj.AUC.toFixed(6) + '</b><br>';
    mReturn += '<b>Beleichrodt et al. Area (Log10 Scale): ' + obj.AUClog10.toFixed(6) + '</b><br>';
  }

  return mReturn;
}
