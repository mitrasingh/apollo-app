import Spinner from 'react-bootstrap/Spinner';

export function LoadAnimation() {
  return <Spinner style={{position: "fixed", top: "50%", left: "50%"}} animation="border" />;
}

