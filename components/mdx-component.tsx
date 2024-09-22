'use client';

import React from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Callout from './callout';

const components = {
  Image,
  Callout,
};

const Mdx = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code);
  return (
    <div className="prose lg:prose-xl max-w-full">
      <Component components={components} />
    </div>
  );
};

export default Mdx;
