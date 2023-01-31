import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
	console.log('Возникла ошибка!', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
		return (
			<section className="text text_type_main-small">
				<h1>Что-то пошло не так :(</h1>
				<p>В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.</p>
			</section>
		);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
