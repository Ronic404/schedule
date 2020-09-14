import React, { Component, ReactNode } from 'react';

import ErrorIndicator from '../error-indicator';

interface IProps {
  children: ReactNode,
}

interface IState {
  hasError: boolean,
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(): void {
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorIndicator />;
    }

    return children;
  }
}

export default ErrorBoundary;
