import React, { Fragment, FC, useEffect } from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
  LinearProgress,
  Divider,
  ListItemSecondaryAction,
  Button,
  CardHeader,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  fetchQuestions,
  fetchMoreQuestions,
  setQuestion,
  deleteQuestion,
} from "../../actions";
import {
  State,
  Error,
  Question,
} from '../../types/store';

interface Props {
  loading: boolean;
  error: Error | null;
  questions: Array<Question>;
  fetch: () => void;
  fetchMore: () => void;
  setQuestion: (payload: string) => void;
  deleteQuestion: (payload: number) => void;
}

const Questions: FC<Props> = ({
  loading,
  error,
  questions,
  fetch,
  fetchMore,
  setQuestion,
  deleteQuestion,
}) => {
  useEffect(() => {
    fetch();
  }, []);
  const handleClick = () => fetchMore();

  return (
    <Card className="card">
      <CardHeader
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            LOAD MORE QUESTIONS
          </Button>
        }
        title="Questions"
      />
      {loading && (
        <LinearProgress />
      )}
      {error && (
        <Typography>
          {error.message}
        </Typography>
      )}
      <List className="list-questions">
        {questions.map((item, index) => (
          <div key={index}>
            <Divider />
            <ListItem>
              <ListItemText primary={
                <Fragment>
                  <Typography>
                    {item.question}
                  </Typography>
                  <Typography>
                    {item.category}
                  </Typography>
                  <Typography>
                    {item.difficulty}
                  </Typography>
                </Fragment>
              } />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setQuestion(item.question)}
                >
                  EDIT
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteQuestion(index)}
                >
                  DELETE
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        ))}
      </List>
    </Card>
  );
}

const mapStateToProps = ({ loading, error, questions }: State) => ({
  loading,
  error,
  questions,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetch: () => dispatch(fetchQuestions()),
    fetchMore: () => dispatch(fetchMoreQuestions()),
    setQuestion: (payload: string) => dispatch(setQuestion(payload)),
    deleteQuestion: (payload: number) => dispatch(deleteQuestion(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);
