import React from 'react';
import SpinnerMaterial from 'react-spinner-material';

import clsxm from '@/lib/clsxm';

type SpinnerProps = {
  radius?: number;
  color?: string;
  stroke?: number;
  visible?: boolean;
  containerClassName?: string;
};

const Spinner = ({
  radius = 120,
  color = '#333',
  stroke = 6,
  visible = true,
  containerClassName,
}: SpinnerProps) => {
  return (
    <div
      className={clsxm(
        'flex items-center justify-center py-20',
        containerClassName
      )}
    >
      <SpinnerMaterial
        radius={radius}
        color={color}
        stroke={stroke}
        visible={visible}
      />
    </div>
  );
};

export default Spinner;
