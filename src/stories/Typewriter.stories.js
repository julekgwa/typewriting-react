import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Typewriter } from '../components/Typewriter';
const stories = storiesOf('Typewriter', module);

import './cursor.css';

const Table = ({ headers, data }) => {
  return (
    <table>
      <tr>
        {headers.map((header, idx) => (
          <th key={idx}>{header.Header}</th>
        ))}
      </tr>
      {data.map((tr, idx) => (
        <tr key={idx}>
          {headers.map((h, i) => (
            <td key={i}>{data[idx][h.accessor]}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};

const capitalize = (str, lower = false) =>
  str &&
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

const cleanTableHeader = (header, searchValue = '_') => {
  if (!header || typeof header !== 'string') {
    return;
  }

  const re = new RegExp(searchValue, 'g');

  return capitalize(header.replace(re, ' '));
};

const createHeaders = (headersData) => {
  if (
    !Array.isArray(headersData) ||
    (Array.isArray(headersData) && headersData.length <= 0)
  ) {
    return;
  }

  return Object.keys(headersData[0]).map((key) => ({
    Header: cleanTableHeader(key),
    accessor: key,
  }));
};

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
  },
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
  },
];

const tableData = [education, programming];

stories.add('Typewriter', () => {
  const [headers, setHeaders] = useState([]);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className='container'>
        <Typewriter
          className='sql-statement'
          cursorClassName='cursor'
          loop={true}
          onWordFinishTyping={(idx) => {
            setIndex(idx);
            setHeaders(createHeaders(tableData[idx]));
          }}
          words={words}
        />
      </div>
      <Table headers={headers} data={tableData[index]} />
    </>
  );
});
