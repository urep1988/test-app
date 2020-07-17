import React, { FC, Fragment, useState, useEffect } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from '@material-ui/core';
import { connect } from 'react-redux';

import {
  State,
  Question,
} from '../../types/store';

interface Props {
  question?: Question;
}

const QuestionView: FC<Props> = ({ question }) => {
  const [activeAnswer, setActiveAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [correctIndex, setCorrectIndex] = useState<number>(0);

  useEffect(() => {
    const incorrectAnswers = [...(question?.incorrect_answers || [])];
    const correctIndex = Math.floor(Math.random() * incorrectAnswers.length);
    const correctAnswer = question?.correct_answer || '';
    incorrectAnswers.splice(correctIndex, 0, correctAnswer);

    setAnswers(incorrectAnswers);
    setCorrectIndex(correctIndex);
    setActiveAnswer(null);
  }, [question]);

  return (
    <Card className="card">
      {question ? (
        <Fragment>
          <Typography variant="h5" component="h2">
            Question
          </Typography>
          <Typography gutterBottom>
            {question?.question}
          </Typography>
          <Typography variant="h5" component="h2">
            Answer
          </Typography>
          {activeAnswer !== null && (
            <Typography>
              {correctIndex === activeAnswer
                ? 'Correct answer'
                : 'Incorrecr answer'}
            </Typography>
          )}
          <List>
            {answers.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={() => setActiveAnswer(index)}
                    checked={index === activeAnswer}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Fragment>
        ) : (
        <Typography variant="h5" component="h2">
          Choose a question
        </Typography>
      )}
    </Card>
  );
}

const mapStateToProps = ({ questions, activeQuestion }: State) => ({
  question: questions.find(({ question }) => question === activeQuestion),
});

export default connect(
  mapStateToProps,
)(QuestionView);
