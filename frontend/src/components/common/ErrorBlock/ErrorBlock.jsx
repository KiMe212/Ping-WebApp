import React from 'react';
import './ErrorBlock.css';

export const ErrorBlock = ({ errorArr }) => {
  return (
    <>
      {errorArr.length !== 0 ? errorArr.map(error =>
					<>
						<span key={error} className='error-span' >
							{error}
						</span>
						<br />
					</>
				) 
				: null
			}
    </>
  );
};
