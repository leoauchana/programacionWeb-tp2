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
        </PageContent>
    )
};

const TableAlumns = () => {

    const [students, setStudents] = useState([]);
    const [fetchingStudents, setFetchingStudents] = useState(false);
    const [valuePagination, setValuePagination] = useState(5);
    const [inputValueSearch, setInputValueSearch] = useState('');
    const [valueCurrentPage, setValueCurrentPage] = useState(1);
    const [studentsLength, setStudentsLength] = useState(0);


    const handleDelete = async (sid) => {
        try{
            if(sid){
                const response = await fetch(`/api/students/${sid}`,{
                   method: 'DELETE',
                });
                if(response.ok){
                    window.alert(`El estudiante de legajo ${sid} se borro correctamente`);
                    resetTable();
                } else {
                    window.alert(`Error al borrar`);
                }
            }
        }catch(err){
            console.error(err);
        }
    }

    // const handleSearch = async () => {
    //     try{
    //         if(!inputValueSearch)   return;
    //         const response = await fetch('/api/students',{
    //             method: 'GET',
    //         })
    //         if(response.ok){

    //         }
    //     }catch(err){
    //         console.error(err);
    //     }
    // }

    const handleNewPagination = (value) => {
        setValuePagination(value)
    }

    const resetTable = () => {
        findAll();
        fetchStudents();
        setInputValueSearch('');
    };

    const handleSearch = async () => {
    if(inputValueSearch){
        const response = await fetch(`/api/students?search=${inputValueSearch}&currentPage=${1}&pageSize=${valuePagination}`,{
            method: 'GET'
        });
        const newStudents = await response.json();
        setStudents(newStudents)
    }
    };

    useEffect(() => {
        findAll();
        fetchStudents();
        resetTable();
    }, [valueCurrentPage, valuePagination]);


    const findAll = async () => {
        try{
            const response = await fetch('/api/students/lenghtStudents',{
                method: 'GET'
            })
            if(response.ok){
                const studentsAll = await response.json();
                console.log(studentsAll);
                setStudentsLength(studentsAll);
            }
        }catch(err){
            console.err(err);
        }
    }

    const fetchStudents = async() => {
        try{
        setFetchingStudents(true);
        const response = await fetch(`/api/students?search=${inputValueSearch}&currentPage=${valueCurrentPage}&pageSize=${valuePagination}`,{
            method: 'GET',
        });
        const data = await response.json();
        setStudents(data.rows);
    } catch(err) {
        console.error(err);
    } finally {
        setFetchingStudents(false);
    }
    };

    return (
        <>
        <div className="search-alumn">
            <input 
            type="text" 
            className="text-search" 
            placeholder="Buscar por Apellido" 
            value={inputValueSearch}
            onChange={(e) => setInputValueSearch(e.target.value)}
            />
            <ButtonComponent key={'search'}
            type='submit'
            text="Buscar"
            className="button-search"
             onClick={() => handleSearch()}
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
                                            onClick={() => (handleDelete(student.sid))}
                                    >
                                    </ButtonComponent>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                <div className="pagination-style">
                    <label htmlFor="pagesValues">
                        Items {valuePagination ? valuePagination : 0} en cada página
                    </label>
                    <select 
                    name="pagesValues" 
                    id="pages-values" 
                    value={valuePagination}
                    onChange={(e) => handleNewPagination(e.target.value)}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <nav>
                        <ul className="nav-button">
                            {
                            Array(Math.ceil(studentsLength / valuePagination)) .fill() .map((_, i) => 
                                ( <li key={i + 1} className="li-button"> {valueCurrentPage === i + 1 
                                    ? 
                                    ( <button className="button-nav button-selected" onClick={() => setValueCurrentPage(i + 1)} > {i + 1} </button> ) 
                                    : ( <button className="button-nav" onClick={() => setValueCurrentPage(i + 1)} > {i + 1} </button> )} </li> ))
                            }
                        </ul>
                    </nav>
                </div>
                </>
            }
        </div>
        </>
    );
}

export default AlumnsPage;