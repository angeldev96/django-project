import styled from 'styled-components';
import { Stepper, Step, StepLabel, Button,Typography, TextField,Box, InputAdornment } from "@mui/material";
import { useState,useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import StepZero from './StepZero';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import PaymentComponent from './PaymentComponent';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Align items to the center horizontally
  justify-content: flex-start; // Align items to the start vertically
  width: 100vw;  // viewport width
  min-height: 100vh; // minimum viewport height
  padding-top: 5px;
  padding-bottom: 2px;

  `;


const StyledStep = styled(Step)`
    margin-bottom: 10px;
    
`;

const StyledStepLabel = styled(StepLabel)`
    color: #333;
    font-size: 1em;
    margin-left: 100px;
    margin-right: 100px;
    
   
`;

const StepContent = styled(Typography)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #7198E0;
    font-size: 1em;
    font-family: 'Belleza', sans-serif; // Cambia la familia de fuentes
  }
`;



const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
    border-radius: 20px;
    box-shadow: 5px 5px 5px #333;
`;


const StyledStepper = styled(Stepper)`
  background-color: transparent;
  padding: 20px;
  margin-top: 150px; // Increase the top margin
  margin-bottom: 10px;
  width: 100% !important; // Ensure the Stepper takes up all available width
`;



const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
    margin-bottom: 50px;
`;

const StyledButton = styled(Button)`
  background-color: #7198E0 !important;
  border: 2px solid #333;
  color: white !important; // Cambia el color del texto a blanco para asegurar la legibilidad
  &:hover {
    background-color: #5674b9 !important; // Un color más oscuro para el efecto hover
  }
  && {
    margin-right: 10px; // Agrega un margen a la derecha
    margin-left: 30px; // Agrega un margen más grande a la izquierda
    margin-top: 20px;
    margin-bottom: 60px;
    font-size: 1em;
    padding: 10px 20px;
    font-family: 'Belleza', sans-serif; // Cambia la familia de fuentes

  }
`;

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7575f5',
          },
        },
      },
    },
  },
});
const GiftCardPurchase = () => {
  const steps = ['Diseño', 'Monto', 'Personalización', 'Entrega'];
  const [selectedImage, setSelectedImage] = useState('images/gift1.jpg');
  const [amount, setAmount] = useState(50);
  const { activeStep, setActiveStep } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientLastName, setRecipientLastName] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('now');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date()); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const price = 50;
  const { order, setOrder, cart,addToCart, setCart } = useContext(AppContext);

  const handleNext = () => {
    if (activeStep === 2) {
      // Si estamos en el tercer paso (StepTwo), verifica que los campos requeridos estén llenos
      if (senderName.trim() === "" || recipientName.trim() === "" || recipientLastName.trim() === "" || message.trim() === "") {
        alert('Por favor, llena todos los campos requeridos.');
        return;  // Si los campos requeridos no están llenos, no avanza al siguiente paso
      }
    } else if (activeStep === 3) {
      // Si estamos en el cuarto paso (StepThree), verifica que el correo electrónico esté lleno
      if (email.trim() === "") {
        alert('Por favor, llena el campo de correo electrónico.');
        return;  // Si el correo electrónico no está lleno, no avanza al siguiente paso
      }
    }
  
    // Si no estamos en el tercer o cuarto paso, o si todos los campos requeridos están llenos, avanza al siguiente paso
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };
  useEffect(() => {
    console.log(order);
  }, [order]);
  
  const addOrderToCart = (newOrder) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart, newOrder];
      Cookies.set('cart', JSON.stringify(updatedCart));  // Guarda el carrito en las cookies
      console.log('updatedCart', updatedCart);  // Agrega esta línea
      return updatedCart;
    });
  
    // Actualiza el estado order aquí
    setOrder(newOrder);
  }
  
  const handleAddToCart = () => {
    if (recipientLastName.trim() === "") {
      alert('Por favor, llena el campo del apellido del destinatario.');
      return;
    }
  
    const newOrder = {
      ...order,
      image: selectedImage,
      product: 'Gift Card',
      amount: amount,
      price: price,
      from: senderName,
      to: recipientName,
      toLastName: recipientLastName,
      email: email,
      deliveryTime: deliveryTime,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      message: message,
    };
  
    console.log('handleAddToCart called in GiftCardPurchase', newOrder);
    addOrderToCart(newOrder);
  };

  return (
    <MainContainer>
      <StyledStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <StyledStep key={label}>
            <StyledStepLabel>
              <StepContent>{label}</StepContent>
            </StyledStepLabel>
          </StyledStep>
        ))}
      </StyledStepper>
      <div>
        {activeStep === 0 && <StepZero selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
        {activeStep === 1 && <StepOne selectedImage={selectedImage} setAmount={setAmount} />}        
        {activeStep === 2 && <StepTwo setSenderName={setSenderName} setRecipientName={setRecipientName} setRecipientLastName={setRecipientLastName} setMessage={setMessage} />}
        {activeStep === 3 && <StepThree email={order.email} setEmail={setEmail} deliveryTime={deliveryTime} setDeliveryTime={setDeliveryTime} selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />}     
           <div>
        <ButtonContainer>
            {activeStep === 0 ? (
              <>
              <StyledButton onClick={() => navigate('/GiftCardInfo')}>Cancelar</StyledButton>
              <StyledButton variant="contained" onClick={handleNext}>Continuar</StyledButton>
              </>
            ) : (
              <>
                <StyledButton disabled={activeStep === 0} onClick={handleBack}>Volver</StyledButton>
                <StyledButton 
                  variant="contained" 
                  color="primary" 
                  onClick={() => {
                    if (activeStep === steps.length - 1) {
                      handleAddToCart();
                      navigate('/PaymentComponent');
                    } else {
                      handleNext();
                    }
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Añadir a la cesta' : 'Continuar'}
                </StyledButton>
              </>
            )}
          </ButtonContainer>
        </div>
      </div>
    </MainContainer>
  );
};

export default GiftCardPurchase;