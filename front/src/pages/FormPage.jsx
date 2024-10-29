import { useNavigate } from 'react-router-dom';
import PageContent from '../components/PageContent';
import './pagesStyles.css';
import ButtonComponent from '../components/Button';
const FormPage = () => {

    const navigate = useNavigate();
    return (
        <PageContent
        headerTitle='Nuevo Alumno'
        actions={[
            <ButtonComponent key={'back'}
            text="Atrás"
            navigation={() => navigate(-1)}
            className='actions-class-back'
            ></ButtonComponent>
        ]}
        >    
        <div className='content-form'>
            <form>
            <div className="form-style">
                        <div className="content-label-name">
                            <label htmlFor="inputName">Nombre:</label>    
                        </div>
                        <div className="content-input-name">
                            <input type="text" id="inputName" name="Name" placeholder="Ingrese un nombre.." required/>
                        </div>
                        <div className="content-label-last">
                            <label htmlFor="inputLast">Apellido:</label>
                        </div>
                        <div className="content-input-last">
                            <input type="text" name="Last" id="inputLast" placeholder="Ingrese un apellido.." required/>    
                        </div>
                        <div className="content-label-dni">
                            <label htmlFor="inputLast">Dni:</label>
                        </div>
                        <div className="content-input-dni">
                            <input type="text" name="Dni" id="inputDni" placeholder="Ingrese un dni.." required/>    
                        </div>
                        <div className="content-label-email">
                            <label htmlFor="inputLast">Email:</label>
                        </div>
                        <div className="content-input-email">
                            <input type="text" name="Dni" id="inputDni" placeholder="Ingrese un email.." required/>    
                        </div>
                        <div className='content-input-button action-accepted '>
                            <ButtonComponent
                            text='Aceptar'
                            className='actions-class'
                            >
                            </ButtonComponent>
                        </div>
            </div>
            </form>
        </div>
        </PageContent>
    )
};

export default FormPage;