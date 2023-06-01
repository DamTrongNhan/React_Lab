import { Alert, Container } from "react-bootstrap";
const NoPermission = () => {
  return (
    <>
      <Container>
        <Alert variant="danger" dismissible className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You don't have permission to access this route</p>
        </Alert>
      </Container>
    </>
  );
};
export default NoPermission;
