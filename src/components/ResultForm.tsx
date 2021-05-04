import TeX from '@matejmazur/react-katex';
import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { useFormik } from 'formik';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12,
  },
  input: {
    marginTop: 10,
    width: '100%',
  },
}));

const initialValues = {
  u10: 'sin(2*pi*x)',
  u20: 'sin(5*pi*x)',
  rho10: 'cos(pi*x)+3/2',
  rho20: 'x+1',
  v11: 0.3,
  v12: 0,
  v21: 0,
  v22: 0.3,
  epsilon: 0.1,
  a: 0.5,
  N: 50,
  M: 50,
  T: 1,
  epsilon0: 0.1,
};

export type FormTypes = typeof initialValues;

interface IProps {
  runWorker: (data: FormTypes) => void;
  isLoading: boolean;
}

const ResultForm: React.FC<IProps> = ({ runWorker, isLoading }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log('Sending data to worker...');
      runWorker(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="classes.main">
      <TextField
        id="u10"
        className={classes.input}
        label={<TeX math="u^0_1(x)" />}
        {...formik.getFieldProps('u10')}
      />
      <TextField
        id="u20"
        className={classes.input}
        label={<TeX math="u^0_2(x)" />}
        {...formik.getFieldProps('u20')}
      />
      <TextField
        id="rho10"
        className={classes.input}
        label={<TeX math="\rho^0_1(x)" />}
        {...formik.getFieldProps('rho10')}
      />
      <TextField
        id="rho20"
        className={classes.input}
        label={<TeX math="\rho^0_2(x)" />}
        {...formik.getFieldProps('rho20')}
      />
      <TextField
        id="v11"
        className={classes.input}
        type="number"
        label={<TeX math="v_{11}" />}
        {...formik.getFieldProps('v11')}
      />
      <TextField
        id="v12"
        className={classes.input}
        type="number"
        label={<TeX math="v_{12}" />}
        {...formik.getFieldProps('v12')}
      />
      <TextField
        id="v21"
        className={classes.input}
        type="number"
        label={<TeX math="v_{21}" />}
        {...formik.getFieldProps('v21')}
      />
      <TextField
        id="v22"
        className={classes.input}
        type="number"
        label={<TeX math="v_{22}" />}
        {...formik.getFieldProps('v22')}
      />
      <TextField
        id="epsilon"
        className={classes.input}
        type="number"
        label={<TeX math="\varepsilon" />}
        {...formik.getFieldProps('epsilon')}
      />
      <TextField
        id="a"
        className={classes.input}
        type="number"
        label={<TeX math="a" />}
        {...formik.getFieldProps('a')}
      />
      <TextField
        className={classes.input}
        label={<TeX math="T" />}
        type="number"
        {...formik.getFieldProps('T')}
      />
      <TextField
        id="N"
        className={classes.input}
        label="Кол-во разбиений по t"
        type="number"
        {...formik.getFieldProps('N')}
      />
      <TextField
        id="M"
        className={classes.input}
        label="Кол-во разбиений по x"
        type="number"
        {...formik.getFieldProps('M')}
      />
      <TextField
        id="epsilon0"
        className={classes.input}
        label={
          <span>
            Допустимая погрешность
            <TeX math="\varepsilon_0" />
          </span>
        }
        type="number"
        {...formik.getFieldProps('epsilon0')}
      />
      <div className={classes.wrapper}>
        <Button
          style={{ marginTop: 10 }}
          color="primary"
          variant="contained"
          disabled={isLoading}
          type="submit"
        >
          Вычислить
        </Button>
        {isLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </form>
  );
};

export default React.memo(ResultForm);
