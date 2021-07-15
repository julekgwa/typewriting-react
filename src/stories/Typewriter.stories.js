import {
  storiesOf
} from '@storybook/react';

import {
  Table
} from 'ds-react-table';

import React, {
  useState
} from 'react';

import {
  Typewriter
} from '../index';

const stories = storiesOf('Typewriter', module);

import './cursor.css';

const words = ['SELECT * FROM EDUCATION', 'SELECT * FROM SKILL'];

const programming = [
  {
    language: 'JavaScript',
    level: '5',
  },
  {
    language: 'NodeJS',
    level: '3',
  },
  {
    language: 'React',
    level: '5',
  },
  {
    language: 'React Native',
    level: '5',
  }
];

const education = [
  {
    qualification: 'Software Engineering',
    school: 'UJ',
    period: '04/2016 – 08/2018',
    location: 'JOHANNESBURG, SOUTH AFRICA',
  },
  {
    qualification: 'PC Technician',
    school: 'Boston City Campus & business College',
    period: '01/2011 – 11/2011',
    location: 'RANDBURG, SOUTH AFRICA',
  },
  {
    qualification: 'UX Designer',
    school: 'UCT',
    period: '01/2008 – 12/2010',
    location: 'CAPE TOWN, SOUTH AFRICA',
  }
];

const tableData = [education, programming];

stories.add('Typewriter', () => {

  const [index, setIndex] = useState(0);

  return (
    <>
      <div className='container'>
        <h2>Hello: <Typewriter
          className='sql-statement'
          cursorClassName='cursor'
          loop={true}
          onWordFinishTyping={(idx) => {

            setIndex(idx);

          }}
          words={words}
        />
        </h2>
      </div>
      <Table data={tableData[index]} />
    </>
  );

});
