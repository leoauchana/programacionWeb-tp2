import PageContent from "../components/PageContent";
import './pagesStyles.css';

const MainPage = () => {
    return (
        <PageContent
        headerTitle="Pagina Principal">
            <CardMain/>
        </PageContent>
    )
};

const CardMain = () => {
    return (
        <div className="card-style">
            <h1>Módulo Alumnos</h1>
        </div>
    )
}

export default MainPage;