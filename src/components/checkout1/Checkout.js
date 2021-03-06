import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useLocation, Link } from 'react-router-dom';
import { useGlobal } from 'reactn';
import Base from '../../core/Base';




const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));



const Checkout1 = () => {

  const location=useLocation()
  console.log(location)
  const products= location.state.products.products
  const Amount = location.state.amount.finalAmount
  const reload = location.state.reload.reload

  const [activeStep1, setActiveStep2] =useGlobal('activeStep');
  console.log(`Active step is : ${activeStep1}`)
  //const [activeStep,setActiveStep] = useState(0)
  const [activeStep,setActiveStep] = useGlobal('activeStep');
  const [orderID,setOrderID] = useGlobal('orderID')

  const steps = ['Shipping address', 'Review your order','Payment details'];

  function getStepContent(step,amount,products,reload) {
    switch (step) {
      case 0:
        return <AddressForm  />;
      case 1:
        return <Review amount={amount} products={products} reload={reload} />;
      case 2:
        return <PaymentForm amount={amount} products={products} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const classes = useStyles();
  // const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
    <Base>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{orderID}. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.<Link to='/' >Go to Home</Link>
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,Amount,products,reload)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length -1 ? (
                    <Button
                    variant="contained"
                    disabled
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    View Order
                  </Button>
                  ) : (
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
      </Base>
    </React.Fragment>
  );
}

export default Checkout1;