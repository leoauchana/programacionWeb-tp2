import PageContent from "../components/PageContent";
import { useNavigate }  from 'react-router-dom';
import './pagesStyles.css';
import ButtonComponent from "../components/Button";
const AlumnsPage = () => {
    const navigate = useNavigate();

    
    return (
        <PageContent
        headerTitle="Alumnos"
        actions={[
            <ButtonComponent key={'add'}
            text="Agregar"
            navigation={() => navigate('/alumns/form')}
            className='actions-class'
            ></ButtonComponent>,
            <ButtonComponent key={'back'}
            text="Atrás"
            navigation={() => navigate(-1)}
            className='actions-class-back'
            ></ButtonComponent>,
        ]}
        >
            <SearchAlumn/>  
            <TableAlumns/>  
            <Pagination/>
        </PageContent>
    )
};

const SearchAlumn = () => {
    return(
        <div className="search-alumn">
            <input type="text" className="text-search" placeholder="Buscar por Apellido" />
            <ButtonComponent
            text="Buscar"
            className="button-search"
            >
            </ButtonComponent>
        </div>
    )
}

const TableAlumns = () => {
    return (
        <div className="table-style">
            <table>
                <thead>
                    <tr>
                    <th>Legajo</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {

                    }
                </tbody>
            </table>
        </div>
    );
}

const Pagination = () => {
    return (
        <div className="">
            
        </div>
    )
}

export default AlumnsPage;