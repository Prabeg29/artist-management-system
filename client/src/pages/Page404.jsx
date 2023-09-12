import { useRouteError } from 'react-router-dom';

const Page404 = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </>
    );

};

export default Page404;
