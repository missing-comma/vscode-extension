import { HttpResponse } from '../types';

export abstract class ErrorHandlerResult {
	response: HttpResponse<any> | null = null;
	/**
	 * Indicates if the error was handled.
	 *
	 * If the error is handled, the function will not throw.
	 * Otherwise, it will throw the error.
	 */
	handled: boolean = false;
}

export class ErrorHandlerComposer extends ErrorHandlerResult {
	wasHandled = () => {
		this.handled = true;
		return this;
	};
}
