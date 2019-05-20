import * as React from 'react';

interface WrapperProps {
  learnosityRootId: string;
}

/**
 * Learnosity Wrapper - the expected structure Learnosity expects to render itself into
 */
const LearnosityAssessmentsWrapper: React.FunctionComponent<WrapperProps> = ({
  children,
  learnosityRootId,
}) => (
  <div>
    <div className="learnosity-wrapper">
      <div id={learnosityRootId} />
    </div>
    {children}
  </div>
);

export default LearnosityAssessmentsWrapper;
