import PageContent from "../components/PageContent";
import { useNavigate }  from 'react-router-dom';
import './pagesStyles.css';
import ButtonComponent from "../components/Button";
import { useEffect, useState } from "react";



const AlumnsPage = () => {
    const navigate = useNavigate();

    
    return (
        <PageContent
        headerTitle="Alumnos"
        actions={[
            <ButtonComponent key={'add'}
            text="Agregar"
            onClick={() => navigate('/alumns/form')}
            className='actions-class'
            ></ButtonComponent>,
            <ButtonComponent key={'back'}
            text="Atrás"
            onClick={() => navigate(-1)}
            className='actions-class-back'
            ></ButtonComponent>,
        ]}
        >
            <TableAlumns/>  
            <Pagination/>
        </PageContent>
    )
};

// const SearchAlumn = () => {

//     const handleSarch = (lastName) => {
    
//     };

//     return(
//         <div className="search-alumn">
//             <form onSubmit={handleSarch(input)}>
//                 <input type="text" className="text-search" placeholder="Buscar por Apellido" value='inputSearchLastName'
//                 />
//                 <ButtonComponent
//                 type='submit'
//                 text="Buscar"
//                 className="button-search"
//                 onClick={handleSarch()}
//                 >
//                 </ButtonComponent>
//             </form>
//         </div>
//     )
// }

const TableAlumns = () => {

    const [students, setStudents] = useState([]);
    const [fetchingStudents, setFetchingStudents] = useState(false)

    const handleDelete = () => {

    }
    // const handleSearch = async () => {
    // if(searchStudent){
    //     const student = await fetch(`/api/students?search=${searchStudent}`);
        
    // }
    // }

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async() => {
        try{
        setFetchingStudents(true);
        const response = await fetch('/api/students',{
            method: 'GET'
        });
        const data = await response.json();
        setStudents(data);
    } catch(err) {
        console.error(err);
    } finally {
        setFetchingStudents(false);
    }
    };

    return (
        <>
        <div className="search-alumn">
            <input type="text" className="text-search" placeholder="Buscar por Apellido" 
            />
            <ButtonComponent key={'search'}
            type='submit'
            text="Buscar"
            className="button-search"
            >
            </ButtonComponent>
        </div>
        <div className="table-style">
            {
                fetchingStudents
                ? <p>Recuperando información...</p>
                : <>
                {
                    !students.length && <p>No hay estudiantes</p>
                }
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
                        students.map(student => (
                            <tr key={student.sid}>
                                <td>{student.sid}</td>
                                <td>{student.name}</td>
                                <td>{student.lastName}</td>
                                <td>
                                    <ButtonComponent key={'delete'}
                                            text="Borrar"
                                            className='actions-class-back'
                                            onClick={handleDelete}
                                    >
                                    </ButtonComponent>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                </>
            }
        </div>
        </>
    );
}

const Pagination = () => {
    return (
        <div className="">
            
        </div>
    )
}

export default AlumnsPage;