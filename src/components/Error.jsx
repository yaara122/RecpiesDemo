import classes from "./Error.module.css";
import Card from "./UI/Card";
import Button from "./UI/Button";

const Error = (props) => {
  const submitHandler = () => {
    props.onSubmitError();
  };

  return (
    <div className={classes.backdrop}>
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={submitHandler}>okay</Button>
        </footer>
      </Card>
    </div>
    //new
  );
};

export default Error;
