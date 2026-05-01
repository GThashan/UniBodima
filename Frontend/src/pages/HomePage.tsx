import React from 'react';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { Listings } from '../components/Listings';
import { CallToAction } from '../components/CallToAction';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Listings />
      <CallToAction />
    </>
  );
};
