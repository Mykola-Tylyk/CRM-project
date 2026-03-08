import { Error } from "../../components/error/Error";

const ErrorPage = ({ errorMessage }: { errorMessage: string }) => {
    return (
        <div>
            <Error errorMessage={errorMessage} />
        </div>
    );
};

export { ErrorPage };
