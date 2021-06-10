import * as math from 'mathjs';
import { FormTypes } from '../components/result/ResultForm';
import { calcAbsoluteDeviation } from '../utils/calcAbsoluteDeviation';
import { calcFGMatrix } from '../utils/calcFunctions';
import { calcResult } from '../utils/calcResult';
import {
  createScatterPlotData,
  createSurfacePlotData,
} from '../utils/createPlotData';
import { getValueMatrix } from '../utils/getValueMatrix';
import { makeArray } from '../utils/makeArray';
import { matrixToObject } from '../utils/matrixToObject';

const ctx: Worker = self as any;

ctx.onmessage = (e) => {
  const {
    M,
    N,
    T,
    a,
    v11,
    v12,
    v21,
    v22,
    epsilon,
    gamma1,
    gamma2,
    plotType,
    ...data
  } = e.data as FormTypes;

  const h = 1 / M;
  const tau = T / N;

  const x = makeArray(M + 1, (i) => i * h);
  const t = makeArray(N + 1, (i) => i * tau);

  const X0 = makeArray(M + 1, (i) =>
    math.matrix([
      [math.evaluate(data.rho10, { x: x[i] })],
      [math.evaluate(data.rho20, { x: x[i] })],
      [math.evaluate(data.u10, { x: x[i] })],
      [math.evaluate(data.u20, { x: x[i] })],
    ])
  );

  if (data.rho1 && data.rho2 && data.u1 && data.u2) {
    const Phi = calcFGMatrix({
      a,
      N,
      M,
      tau,
      h,
      gamma1,
      gamma2,
      rho1: data.rho1,
      rho2: data.rho2,
      u1: data.u1,
      u2: data.u2,
      V: math.matrix([
        [v11, v12],
        [v21, v22],
      ]),
      epsilon,
      beta1: data.beta1,
      beta2: data.beta2,
      delta: data.delta,
    });

    const result = calcResult(
      X0,
      gamma1,
      gamma2,
      v11,
      v12,
      v21,
      v22,
      a,
      epsilon,
      data.delta,
      data.beta1,
      data.beta2,
      M,
      N,
      tau,
      h,
      Phi
    );

    const results = matrixToObject(result);

    const real = {
      rho1: getValueMatrix(data.rho1, N, M, tau, h),
      rho2: getValueMatrix(data.rho2, N, M, tau, h),
      u1: getValueMatrix(data.u1, N, M, tau, h),
      u2: getValueMatrix(data.u2, N, M, tau, h),
    };

    const diffs = {
      diffRho1: calcAbsoluteDeviation(real.rho1, results.rho1),
      diffRho2: calcAbsoluteDeviation(real.rho2, results.rho2),
      diffU1: calcAbsoluteDeviation(real.u1, results.u1),
      diffU2: calcAbsoluteDeviation(real.u2, results.u2),
    };

    if (plotType === 'scatter') {
      ctx.postMessage({
        ...createScatterPlotData(x, T, { ...results, ...real, ...diffs }),
        plotType: 'scatter',
        results,
      });
    } else {
      ctx.postMessage({
        ...createSurfacePlotData(x, t, { ...results, ...real, ...diffs }),
        plotType,
      });
    }

    return;
  }

  const result = calcResult(
    X0,
    gamma1,
    gamma2,
    v11,
    v12,
    v21,
    v22,
    a,
    epsilon,
    data.delta,
    data.beta1,
    data.beta2,
    M,
    N,
    tau,
    h
  );

  const results = matrixToObject(result);

  if (plotType === 'scatter') {
    ctx.postMessage({
      ...createScatterPlotData(x, T, results),
      plotType: 'scatter',
      results,
    });
  } else {
    ctx.postMessage({
      ...createSurfacePlotData(x, t, results),
      plotType,
    });
  }
};

export default {} as typeof Worker & { new (): Worker };
