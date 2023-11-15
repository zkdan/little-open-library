import {useRouteError} from 'react-router-dom';
const ErrorBoundary = ({name}) => {
  const error = useRouteError();
  console.error(name, error);
  return <div>ahhhh</div>;
}
export default ErrorBoundary;