import React from 'react';
import './Footer.css';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer>
      <hr />
      <p>
        ●{' '}
        <a target='_blank' href='https://github.com/azerothcore/wow-statistics' rel='noreferrer'>
          <strong>Wow Statistics</strong>
        </a>{' '}
        for{' '}
        <a target='_blank' href='http://www.chromiecraft.com' rel='noreferrer'>
          ChromieCraft
        </a>{' '}
        is free software created by{' '}
        <a target='_blank' href='https://github.com/Hacaw' rel='noreferrer'>
          <strong>Hacaw</strong>
        </a>{' '}
        and{' '}
        <a target='_blank' href='https://github.com/Helias' rel='noreferrer'>
          <strong>Helias</strong>
        </a>{' '}
        and released under the{' '}
        <a
          target='_blank'
          href='https://github.com/azerothcore/wow-statistics/blob/master/LICENSE'
          rel='noreferrer'>
          GNU AGPL license
        </a>{' '}
        ●
      </p>
    </footer>
  );
};
