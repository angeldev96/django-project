import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Button } from '@mui/material';
import { faEnvelope, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const StyledTypographyH1 = styled(Typography)`
  && {
    font-family: 'Belleza', sans-serif; // Cambia la fuente a Belleza
    color: #757575;
    font-weight: bold;
    text-align: center;
    margin-top: 5rem;
    margin-bottom: 1rem;
    font-size: 4rem;
    padding: 1rem;
    border-radius: 10px;
    text-decoration: underline;
    text-decoration-color: transparent; // Hace que el subrayado original sea transparente
    background-image: linear-gradient(to right, #ff69b4, #98e098, #99aaff); // Gradiente de colores
    background-size: 100% 2px; // Ajusta el tamaño del fondo para que sea delgado como un subrayado
    background-repeat: no-repeat;
    background-position: 0 100%; // Posiciona el fondo en la parte inferior del texto
  }
`;

const StyledTypographyH2 = styled(Typography)`
  && {
    font-family: 'Belleza', sans-serif; // Cambia la fuente a Belleza
    color: #757575;
    font-weight: bold;
    text-align: center;
    margin-top: 2rem;
    font-size: 1.7rem;
  }
`;

const StyledTypographyH3 = styled(Typography)`
    && {
        font-family: 'Belleza', sans-serif; // Cambia la fuente a Belleza
        color: #757575;
        font-weight: bold;
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
`;

const FullPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 5rem;
  box-sizing: border-box;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #646cff;
  transition: color 0.3s ease;

  &:hover {
    color: #99aaff;
  }
`;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '5rem',
        marginBottom: '5rem', // Agregar margen inferior al contenedor
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%', // Cada box ocupa el 50% del ancho
        marginTop: '2rem', // Agregar margen superior al box
    },
    rightBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%', // Reducir el ancho del box
        height: '100%',
        marginTop: '12rem',
        padding: '1rem',    
        borderRadius: '15px',
        boxShadow: '0 0 20px #a7a7f5',
        '& > *': { // Selecciona todos los elementos hijos directos
            marginTop: '1rem', // Agrega un margen superior a todos los elementos hijos
        },
    },
    video: {
      width: '90%',
      height: 'auto',
      borderRadius: '15px',
      objectFit: 'cover',
      boxShadow: 
        '0px 4px 20px rgba(255, 105, 180, 0.5), ' +  // Rosa
        '0px 4px 20px rgba(152, 224, 152, 0.5), ' +  // Verde
        '0px 4px 20px rgba(153, 170, 255, 0.5)',     // Azul
      border: '3px solid #99aaff'  // Borde de color #99aaff
  }
};

const Contact = () => {
    const navigate = useNavigate();

    return (
        <FullPageContainer>
            <Container maxWidth={false}>
                <StyledTypographyH1 variant="h1">Estamos aquí para ayudarte</StyledTypographyH1>
                <Box sx={styles.container}>
                    <Box sx={styles.box}>
                        <video autoPlay loop muted style={styles.video}>
                            <source src="/images/contact.mp4" type="video/mp4" />
                        </video>
                         </Box>
                        <Box sx={styles.rightBox}>
                        <StyledTypographyH2 variant="h2">Ponte en contacto con nosotros</StyledTypographyH2>

                            <StyledIcon 
                                icon={faEnvelope} 
                                size="3x" 
                                onClick={() => window.location.href = "mailto:dinebookerinfo@gmail.com"}
                            />   
                                <StyledTypographyH3>Envíanos un correo electrónico</StyledTypographyH3>      
                                <Button 
                            variant="contained" 
                            onClick={() => {
                              console.log('Button clicked');
                              const intervalId = setInterval(() => {
                                if (window.Botonic && typeof window.Botonic.open === 'function') {
                                  console.log('Botonic available, opening chat');
                                  window.Botonic.open();
                                  clearInterval(intervalId);
                                }
                              }, 100);
                            }}
                            sx={{
                              backgroundColor: '#CCFFCC',
                              color: '#000',
                              border: '1px solid #000',
                              padding: '10px',
                              borderRadius: '5px',
                              border: '2px solid #535bf2',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s ease',
                              '&:hover': {
                                backgroundColor: '#99aaff',
                              },
                            }}
                          >
                            Chatear con nosotros
                          </Button>                           
                        <StyledTypographyH3>Contacta con nosotros por chat</StyledTypographyH3>
                    </Box>
                </Box>
            </Container>
        </FullPageContainer>
    );
};

export default Contact;